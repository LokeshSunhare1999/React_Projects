import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import Select from "react-select";
import { FormGroup } from "reactstrap";
import * as routes from "../../../Router/RoutesURL";
import { useSelector, useDispatch } from 'react-redux';
import {
    stableSort,
    getComparator,
    rowOptions,
    options,
} from '../../../utils/Helper'
import { viewPrograms, updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { getContentsCategory } from '../../../redux/actions/MasterDataAction/ContentCategoryAction/ContentCategoryAction';
import './ContentCategory.scss';

const MainHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}))


const headCells = [
    {
        id: 'content_category',
        disablePadding: true,
        label: 'TITLE',
    },
    {
        id: 'content_count',
        disablePadding: false,
        label: 'COUNT',
    },
    {
        id: 'free_content',
        disablePadding: false,
        label: 'FREE',
    },
    {
        id: 'paid_content',
        disablePadding: false,
        label: 'PAID',
    },
    {
        id: 'created_on',
        disablePadding: false,
        label: 'CREATED ON',
    },
    {
        id: 'is_active',
        disablePadding: false,
        label: 'STATUS',
    },
    {
        id: 'action',
        disablePadding: false,
        label: '',
        disableSorting: true

    },
];

const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) =>
                (<TableCell
                    key={headCell.id}
                    align='left'
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        hideSortIcon={headCell.id === 'action' ? true : false}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>)
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected, pageNos, rowsPerPageNos, activeTab } = props;
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (activeTab == "Content") {
            const sendRequest = {
                "page_no": pageNos,
                "page_size": rowsPerPageNos,
                "filter_text": ""
            };
            dispatch(getContentsCategory(sendRequest));
        }
    }, [activeTab]);

    const handleSearchText = (e) => {

        setSearchText(e.target.value)
        if (e.target.value.length > 0) {
            let value = {
                "page_no": pageNos,
                "page_size": rowsPerPageNos,
                "filter_text": e.target.value,
            };
            dispatch(getContentsCategory(value));
        }
        else if (e.target.value.length == 0) {
            let value = {
                "page_no": pageNos,
                "page_size": rowsPerPageNos,
            };
            dispatch(getContentsCategory(value));
        }
    };

    return (

        <>
            <Toolbar sx={{
                pl: { sm: 2 },
                pt: { sm: 2 },
                pb: { sm: 2 },
                pr: { xs: 1, sm: 1 }, ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
            >
                <div className='col-2 col-sm-2 col-md-2 col-lg-3 col-xl-3 col-xxl-3'>
                    <MainHeading
                        sx={{ flex: '1 1 100%', }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Content Category List
                    </MainHeading>
                </div>
                <div className='col-2 col-sm-2 col-md-2 col-lg-9 col-xl-9 col-xxl-9 LevelDiv'>
                    <div className="separator"></div>
                    <div className="mr-sm-2 searchDiv class-search ">
                        <input
                            className="form-control mr-sm-2 class-search"
                            type="search"
                            placeholder=" Search Keyword"
                            aria-label="Search"
                            onChange={(e) => { handleSearchText(e); setSearchText(e.target.value); }}
                        ></input>
                    </div>
                </div>
            </Toolbar>
            <Divider />
        </>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const ContentCategoryTable = (props) => {
    const { activeTab } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [getContentsCategoryData, setGetContentsCategoryData] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);
    const navigate = useNavigate()
    const viewContentCategoryData = useSelector(state => state?.getContentCategoryList);
    const getContentCategoryDataRes = useSelector(state => state?.getContentCategoryList?.getContentCategoryList);
    const btnPrev = ["btnPrev", showPrev ? "" : "opacityBtns"]
    const btnNext = ["btnNext", showNext ? "" : "opacityBtns"]
    const dispatch = useDispatch();
    const checkResponse = useSelector(state => state?.getContentCategoryList?.getContentCategoryList);

    useEffect(() => {
        if (viewContentCategoryData.error !== "No data Found") {
            setGetContentsCategoryData(getContentCategoryDataRes && getContentCategoryDataRes?.data?.content_list
            );
            if (getContentCategoryDataRes?.data?.current_page_no === 1) {
                setShowPrev(false)
            } else {
                setShowPrev(true)
            }

            if (getContentCategoryDataRes?.data?.current_page_no === getContentCategoryDataRes?.data?.total_pages) {
                setShowNext(false)
            } else {
                setShowNext(true)
            }
        } else {
            setGetContentsCategoryData('');
        }

    }, [getContentCategoryDataRes, viewContentCategoryData])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = getContentCategoryDataRes && getContentsCategoryData.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);

        const filterdata = JSON.parse(localStorage.getItem("filtersData"));
        const sendRequest = {
            "page_no": newPage + 1,
            "page_size": rowsPerPage,
            "filters": filterdata === "" ? [] : filterdata
        };
        dispatch(viewPrograms(sendRequest));
    };

    const handleChangePageNext = (newPage) => {
        setPage(newPage);
        const filterdata = JSON.parse(localStorage.getItem("filtersData"));
        const sendRequest = {
            "page_no": getContentCategoryDataRes?.data?.current_page_no + 1,
            "page_size": rowsPerPage,
            "filters": filterdata === "" ? [] : filterdata
        };
        dispatch(viewPrograms(sendRequest));
    };
    const handleChangePagePrev = (newPage) => {
        setPage(newPage);
        const filterdata = JSON.parse(localStorage.getItem("filtersData"));
        const sendRequest = {
            "page_no": getContentCategoryDataRes?.data?.current_page_no - 1,
            "page_size": rowsPerPage,
            "filters": filterdata === "" ? [] : filterdata
        };

        dispatch(viewPrograms(sendRequest));
    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(event.value);
        setPage(page);

        const filterdata = JSON.parse(localStorage.getItem("filtersData"));
        const sendRequest = {
            "pageNo": 1,
            "pageSize": event.value,
            "filters": filterdata === "" ? [] : filterdata
        };
        dispatch(viewPrograms(sendRequest));
    };



    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getContentCategoryDataRes && getContentsCategoryData?.length) : 0;


    const handleChangeViewPro = (selectedProgramId, data) => {
        if (data.status === 1) {
            navigate(routes.VIEW_PROGRAMS, { state: { selectedProgramId } })
        }
    };

    const handleChangeStatus = (e, id) => {
        if (e.value === "Active") {
            getContentsCategoryData.find(v => v.id === id).is_active = 1;
        } else {
            getContentsCategoryData.find(v => v.id === id).is_active = 0;
        }
        setGetContentsCategoryData(getContentsCategoryData)
        const sendRequest = {
            "feature_type": "content_category",
            "id": id,
            "status": e.value === "Active" ? 1 : 0
        };
        dispatch(updateIsActiveStatus(sendRequest));
    }


    return (
        <div className="ProBox">
            <Box sx={{ width: '100%' }} className="ContentCategoryBox">
                <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} pageNos={page}
                        rowsPerPageNos={rowsPerPage} activeTab={activeTab} />
                    {getContentsCategoryData && <TableContainer sx={{ p: 3 }}>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"

                            size='small'
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={getContentCategoryDataRes && getContentsCategoryData?.length}
                            />
                            <TableBody>
                                {
                                    stableSort(getContentsCategoryData, getComparator(order, orderBy))
                                        .slice((rowsPerPage * (page - 1)), (rowsPerPage * (page) + rowsPerPage))
                                        .map((row, index) => {

                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow hover onClick={(event) => handleClick(event, row.title)} role="checkbox"

                                                    tabIndex={-1}
                                                    key={row.title}

                                                >
                                                    <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.content_category}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.content_count}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.free_content}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.paid_content}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.created_on}</TableCell>
                                                    <TableCell align="left" width="10px" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}

                                                    >
                                                        <Select
                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            onChange={(e) => { handleChangeStatus(e, row.id) }}
                                                            value={row.is_active === 1 ? { label: "Active", value: "Active" } : { label: "Inactive", value: "Inactive" }}
                                                            options={options}
                                                            theme={(theme) => ({
                                                                ...theme,
                                                                isFocused: "#74613C",
                                                                colors: {
                                                                    ...theme.colors,
                                                                    primary25: '#F5F5F5',
                                                                    primary: '#f6f4f0',
                                                                },
                                                            })}
                                                            getOptionLabel={(row) => (
                                                                <><span className={row.label === "Active" ? "ActiveClass" : "InactiveClass"}
                                                                >
                                                                    {row.label}
                                                                </span>
                                                                    {row.status === 1 && (
                                                                        <div

                                                                        ></div>
                                                                    )}
                                                                </>
                                                            )}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="left" className='' ></TableCell>
                                                </TableRow>
                                            );
                                        })}
                                {emptyRows > 0 && (
                                    <TableRow
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                </Paper>
                <div className='paginationBlock'>
                    <div className='textData'><p>Items per page: </p></div>
                    <FormGroup className="FormGroup has-float-label rowsSelect class-menu-dropdown ">
                        <Select
                            placeholder={rowsPerPage}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={rowsPerPage}
                            options={rowOptions}
                            onChange={handleChangeRowsPerPage}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#F5F5F5',
                                    primary: '#74613C',
                                },
                            })}
                            menuPlacement="top"
                            menuPosition="fixed"
                            styles={{
                                menu: (base) => ({
                                    ...base,
                                    top: 'auto',
                                    bottom: 0,
                                }),
                            }}
                        />
                    </FormGroup>
                    {getContentCategoryDataRes?.data && <p className='endText'>   {getContentCategoryDataRes?.data?.start} - {getContentCategoryDataRes?.data?.end} of {getContentCategoryDataRes?.data?.total}</p>}
                    <p>
                        <button className={btnPrev.join(' ')} onClick={() => { handleChangePagePrev(page) }}>
                            <ArrowBackIosNewSharpIcon className='iconBtn' />
                        </button>
                        <button className={btnNext.join(' ')} onClick={() => { handleChangePageNext(page) }}>
                            <ArrowForwardIosSharpIcon className='iconBtn' />
                        </button></p>
                </div>
            </Box>
        </div>
    );
}
export default ContentCategoryTable;