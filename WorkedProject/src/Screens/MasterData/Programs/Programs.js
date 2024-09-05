import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
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
import { createNotification } from '../../../Config/NotificationToast';
import {
    FormGroup,
    Label,
} from "reactstrap";
import {
    stableSort,
    rowOptions,
    options,
} from '../../../utils/Helper'
import * as routes from "../../../Router/RoutesURL";
import { useSelector, useDispatch } from 'react-redux';
import { viewPrograms, updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import './Programs.scss';

const MainHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}))

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    if (orderBy === "duration") orderBy = "durationOne"
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


const headCells = [
    {
        id: 'title',
        disablePadding: true,
        label: 'PROGRAM TITLE',
    },
    {
        id: 'level',
        disablePadding: false,
        label: 'LEVEL',
    },
    {
        id: 'duration',
        disablePadding: false,
        label: 'DURATION',
    },
    {
        id: 'usage',
        disablePadding: false,
        label: 'USAGE',
    },
    {
        id: 'created_on',
        disablePadding: false,
        label: 'CREATED ON',
    },
    {
        id: 'status',
        disablePadding: false,
        label: 'STATUS',
    },
    {
        id: 'action',
        disablePadding: false,
        label: 'ACTION',
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
    const { numSelected, pageNos, rowsPerPageNos } = props;
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [filtersData, setFiltersData] = useState([]);
    const [maxDuration, setMaxDuration] = useState('');
    const [minDuration, setMinDuration] = useState('');
    const [levelData, setLevelData] = useState('');

    const options = [
        { value: 'Comprehensive', label: 'Comprehensive' },
        { value: 'Foundation and Comprehensive', label: 'Foundation & Comprehensive' },
    ];

    useEffect(() => {
        const sendRequest = {
            "pageNo": pageNos,
            "pageSize": 10,
            "filter_text": "",
            "level": "",
            "duration": "",
        };
        dispatch(viewPrograms(sendRequest));
    }, []);

    useEffect(() => {
        const sendRequest = {
            "pageNo": pageNos,
            "pageSize": rowsPerPageNos,
            "filter_text": searchText,
            "level": levelData.value,
            "min_duration": minDuration,
            "max_duration": maxDuration,
        };
        dispatch(viewPrograms(sendRequest));
    }, [levelData, searchText, minDuration, maxDuration]);

    useEffect(() => {
        let filtersValues = { "filter_text": searchText, "level": levelData.value, "min_duration": minDuration, "max_duration": maxDuration, };
        localStorage.setItem("filtersData", JSON.stringify(filtersValues))
        setFiltersData((filtersValues));
    }, [searchText, minDuration, maxDuration, levelData])


    const handleChangeLevel = (e) => {
        setLevelData(e)
    }

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }
    const changeMinDuration = (e) => {
        setMinDuration(e.target.value)
    }
    const changeMaxDuration = (e) => {
        setMaxDuration(e.target.value)
    }

    return (
        <>
            <Toolbar sx={{
                pl: { sm: 2 },
                pt: { sm: 2 },
                pb: { sm: 2 },
                pr: { xs: 1, sm: 1 },

            }}
            >
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-3'>
                    <MainHeading
                        sx={{ flex: '1 1 100%', }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Program List
                    </MainHeading>
                </div>
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-9 LevelDiv'>
                    <FormGroup className="FormGroup has-float-label class-menu-dropdown ">
                        <Label>Level:</Label>
                        <Select
                            placeholder="Level"
                            className="react-select"
                            classNamePrefix="react-select"
                            value={levelData}
                            options={options}
                            onChange={handleChangeLevel}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#F5F5F5',
                                    primary: '#74613C',
                                },
                            })}
                        />
                    </FormGroup>
                    <div className='DurationDiv'>
                        <Label>Duration:</Label>
                        <input type="text" className="min" placeholder="Min" onChange={(e) => { changeMinDuration(e) }} />
                        <span className='Dash'>-</span>
                        <input type="text" className="min" placeholder="Max" onChange={(e) => { changeMaxDuration(e) }} />
                    </div>
                    <div className="separator"></div>

                    <div className="mr-sm-2 searchDiv class-search ">
                        <input
                            className="form-control mr-sm-2 class-search"
                            type="search"
                            placeholder=" Search Keyword"
                            aria-label="Search"
                            onChange={handleChangeSearch}
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

const ProgramTable = (props) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [viewProgramsMainData, setViewProgramsMainData] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);
    const navigate = useNavigate()
    const viewProgramsDat = useSelector(state => state?.viewPrograms);
    const viewProgramsDataRes = useSelector(state => state?.viewPrograms?.viewPrograms);
    const btnPrev = ["btnPrev", showPrev ? "" : "opacityBtns"];
    const btnNext = ["btnNext", showNext ? "" : "opacityBtns"];
    const { permission } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        if (viewProgramsDat.error !== "Ananda programs data does not exists") {
            viewProgramsDataRes && viewProgramsDataRes?.data?.program_data.map(val => {
                val.durationOne = parseInt(val.duration.split(",")[0]);
            })
            setViewProgramsMainData(viewProgramsDataRes && viewProgramsDataRes?.data?.program_data);
            if (viewProgramsDataRes?.data?.current_page_no === 1) {
                setShowPrev(false)
            } else {
                setShowPrev(true)
            }

            if (viewProgramsDataRes?.data?.current_page_no === viewProgramsDataRes?.data?.total_pages) {
                setShowNext(false)
            } else {
                setShowNext(true)
            }
        } else {
            setViewProgramsMainData('');
        }

    }, [viewProgramsDataRes, viewProgramsDat])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = viewProgramsDataRes && viewProgramsMainData.map((n) => n.name);
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


    const handleChangePageNext = (newPage) => {
        setPage(newPage);
        const filterdata = JSON.parse(localStorage.getItem("filtersData"));
        const sendRequest = {
            "pageNo": viewProgramsDataRes?.data?.current_page_no + 1,
            "pageSize": rowsPerPage,
            "filter_text": filterdata.filter_text,
            "level": filterdata.level,
            "min_duration": filterdata.min_duration,
            "max_duration": filterdata.max_duration,
        };
        dispatch(viewPrograms(sendRequest));
    };
    const handleChangePagePrev = (newPage) => {
        setPage(newPage);
        const filterdata = JSON.parse(localStorage.getItem("filtersData"));
        const sendRequest = {
            "pageNo": viewProgramsDataRes?.data?.current_page_no - 1,
            "pageSize": rowsPerPage,
            "filter_text": filterdata.filter_text,
            "level": filterdata.level,
            "min_duration": filterdata.min_duration,
            "max_duration": filterdata.max_duration,
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
            "filter_text": filterdata.filter_text,
            "level": filterdata.level,
            "min_duration": filterdata.min_duration,
            "max_duration": filterdata.max_duration,
        };
        dispatch(viewPrograms(sendRequest));
    };



    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - viewProgramsDataRes && viewProgramsMainData?.length) : 0;


    const handleChangeViewPro = (selectedProgramId, data) => {
        if (data.status === 1) {
            navigate(routes.VIEW_PROGRAMS, { state: { selectedProgramId, permission } })
        }
    };

    const handleChangeOption = (e, id) => {
        if (permission === "write") {
            if (e.value === "Active") {
                viewProgramsMainData.find(v => v.program_id === id).status = 1;
            } else {
                viewProgramsMainData.find(v => v.program_id === id).status = 0;
            }
            setViewProgramsMainData(viewProgramsMainData)
            const sendRequest = {
                "feature_type": "programs",
                "id": id,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }



    return (
        <div className="ProBox">
            <Box sx={{ width: '100%' }} className="ProgramBox">
                <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} pageNos={page}
                        rowsPerPageNos={rowsPerPage} />
                    {viewProgramsMainData && <TableContainer sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
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
                                rowCount={viewProgramsDataRes && viewProgramsMainData?.length}
                            />
                            <TableBody>
                                {
                                    stableSort(viewProgramsMainData, getComparator(order, orderBy))
                                        .slice((rowsPerPage * (page - 1)), (rowsPerPage * (page) + rowsPerPage))
                                        .map((row, index) => {
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow hover onClick={(event) => handleClick(event, row.title)} role="checkbox"

                                                    tabIndex={-1}
                                                    key={row.title}

                                                >
                                                    <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: row.status == 1 ? '#000000' : "#AAAAAA" }}>{row.title}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.status == 1 ? '#000000' : "#AAAAAA" }}>{row.level}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.status == 1 ? '#000000' : "#AAAAAA" }}>{row.duration} Nights</TableCell>
                                                    <TableCell align="left" sx={{ color: row.status == 1 ? '#000000' : "#AAAAAA" }}>{row.usage}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.status == 1 ? '#000000' : "#AAAAAA" }}>{row.created_on}</TableCell>
                                                    <TableCell align="left" width="10px" sx={{ color: row.status == 1 ? '#000000' : "#AAAAAA" }}

                                                    >
                                                        <Select

                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            onChange={(e) => { handleChangeOption(e, row.program_id) }}
                                                            value={row.status === 1 ? { label: "Active", value: "Active" } : { label: "Inactive", value: "Inactive" }}
                                                            options={options}
                                                            isSearchable={false}
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
                                                    <TableCell align="left"
                                                        className={row.status == 1 ? ' ViewEditClick ' : "ViewEditNotClick"}
                                                        onClick={() => { handleChangeViewPro(row.program_id, row) }}><i className="fas fa-eye mr-2"></i>View</TableCell>
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
                            isSearchable={false}
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
                    {viewProgramsDataRes?.data && <p className='endText'>   {viewProgramsDataRes?.data?.start} - {viewProgramsDataRes?.data?.end} of {viewProgramsDataRes?.data?.total}</p>}
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
export default ProgramTable;