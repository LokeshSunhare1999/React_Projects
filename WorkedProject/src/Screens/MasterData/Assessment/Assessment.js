import * as React from 'react';
import { useEffect, useState } from 'react'
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
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import Select from "react-select";
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import * as routes from "../../../Router/RoutesURL";
import { useNavigate } from 'react-router-dom';
import {
    stableSort,
    getComparator,
    rowOptions,
    addSuffix
} from '../../../utils/Helper'
import { viewAssessments } from '../../../redux/actions/MasterDataAction/AssessmentAction/AssessmentAction';
import {
    FormGroup,
} from "reactstrap";
import './Assessment.scss';

const MainHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}))

const headCells = [
    {
        id: 'section_name',
        numeric: false,
        disablePadding: true,
        label: 'SECTIONS',
    },
    {
        id: 'questions_count',
        numeric: true,
        disablePadding: false,
        label: 'QUESTION COUNT',
    },
    {
        id: 'position',
        numeric: true,
        disablePadding: false,
        label: 'POSITION',
    },
    {
        id: 'created_on',
        numeric: true,
        disablePadding: false,
        label: 'CREATED ON',
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'ACTION',
    }
];

const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
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
                    </TableCell>
                ))}
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
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (activeTab == "Assessment") {
            const sendRequest = {
                "pageNo": pageNos,
                "pageSize": rowsPerPageNos,
                "search_text": ""
            };
            dispatch(viewAssessments(sendRequest));
        }
    }, [activeTab]);

    const handleSearchText = (event) => {
        localStorage.setItem("search_text", event.target.value)
        if (event.target.value.length > 0) {
            let value = {
                "pageNo": pageNos,
                "pageSize": rowsPerPageNos,
                "search_text": event.target.value,
            };
            dispatch(viewAssessments(value));
        }
        else if (event.target.value.length == 0) {
            let value = {
                "pageNo": pageNos,
                "pageSize": rowsPerPageNos,
                "search_text": event.target.value,
            };
            dispatch(viewAssessments(value));
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
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-4'>
                    <MainHeading
                        sx={{ flex: '1 1 100%', }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >Section List
                    </MainHeading>
                </div>
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-8 LevelDiv'>

                    <div className="separator"></div>

                    <div className="mr-sm-2 searchDiv class-search ">
                        <input
                            className="form-control mr-sm-2 class-search"
                            type="search"
                            placeholder=" Search Keyword"
                            aria-label="Search"
                            value={searchText}
                            onChange={(event) => { handleSearchText(event); setSearchText(event.target.value); }}
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

const AssessmentTable = (props) => {
    const { activeTab, permission } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [dense, setDense] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);
    const [viewAssessmentMainData, setViewAssessmentMainData] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const viewAssesData = useSelector(state => state?.viewAssessments);
    const viewAssessmentsDataRes = useSelector(state => state?.viewAssessments?.viewAssessments);
    const AssessmentsData = viewAssessmentsDataRes?.data?.program_data
    const btnPrev = ["btnPrev", showPrev ? "" : "opacityBtns"]
    const btnNext = ["btnNext", showNext ? "" : "opacityBtns"]

    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        if (viewAssesData.error !== "Ananda self assessment data does not exists") {
            setViewAssessmentMainData(viewAssessmentsDataRes && viewAssessmentsDataRes?.data?.program_data);
            if (viewAssessmentsDataRes?.data?.current_page_no === 1) {
                setShowPrev(false)
            } else {
                setShowPrev(true)
            }

            if (viewAssessmentsDataRes?.data?.current_page_no === viewAssessmentsDataRes?.data?.total_pages) {
                setShowNext(false)
            } else {
                setShowNext(true)
            }
        } else {
            setViewAssessmentMainData("");
        }

    }, [viewAssessmentsDataRes, AssessmentsData, viewAssesData])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = viewAssessmentsDataRes?.data?.program_data.map((n) => n.name);
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
        const filterdata = localStorage.getItem("search_text");
        const sendRequest = {
            "pageNo": viewAssessmentsDataRes?.data?.current_page_no + 1,
            "pageSize": rowsPerPage,
            "search_text": filterdata === null ? "" : filterdata
        };
        dispatch(viewAssessments(sendRequest));
    };

    const handleChangePagePrev = (newPage) => {
        setPage(newPage);
        const filterdata = localStorage.getItem("search_text");
        const sendRequest = {
            "pageNo": viewAssessmentsDataRes?.data?.current_page_no - 1,
            "pageSize": rowsPerPage,
            "search_text": filterdata === null ? "" : filterdata
        };
        dispatch(viewAssessments(sendRequest));
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.value);
        setPage(page);
        const filterdata = localStorage.getItem("search_text");
        const sendRequest = {
            "pageNo": page,
            "pageSize": event.value,
            "search_text": filterdata === null ? "" : filterdata
        };
        dispatch(viewAssessments(sendRequest));
    };

    const handleChange = (selectedAssessmentId, selectSectionName, assessmentStatus) => {
        navigate(routes.VIEW_ASSESSMENT, { state: { selectedAssessmentId, selectSectionName, assessmentStatus, permission } });
    };

    return (

        <Box sx={{ width: '100%' }} className="AssessmentBox">
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} pageNos={page}
                    rowsPerPageNos={rowsPerPage} activeTab={activeTab} />
                {AssessmentsData && viewAssessmentMainData && <TableContainer sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={viewAssessmentsDataRes?.data?.program_data.length}

                        />
                        <TableBody>
                            {stableSort(viewAssessmentsDataRes?.data?.program_data && viewAssessmentMainData && viewAssessmentMainData, getComparator(order, orderBy))
                                .slice((rowsPerPage * (page - 1)), (rowsPerPage * (page) + rowsPerPage))
                                .map((row, index) => {

                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover onClick={(event) => handleClick(event, row.name)} role="checkbox"

                                            tabIndex={-1}
                                            key={row.section_name}

                                        >
                                            <TableCell component="th" id={labelId} scope="row" padding="none">{row.section_name}</TableCell>
                                            <TableCell align="left">{row.questions_count}</TableCell>
                                            <TableCell align="left">{addSuffix(row.position)}</TableCell>
                                            <TableCell align="left">{row.created_on}</TableCell>
                                            <TableCell align="left" className='View' onClick={() => { handleChange(row.section_id, row.section_name, row.status) }}><i className="fas fa-eye mr-1"></i> View</TableCell>
                                        </TableRow>
                                    );
                                })}
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
                {viewAssessmentsDataRes?.data && <p className='endText'>   {viewAssessmentsDataRes?.data?.start} - {viewAssessmentsDataRes?.data?.end} of {viewAssessmentsDataRes?.data?.total}</p>}
                <p>
                    <button className={btnPrev.join(' ')} onClick={() => { handleChangePagePrev(page) }}>
                        <ArrowBackIosNewSharpIcon className='iconBtn' />
                    </button>
                    <button className={btnNext.join(' ')} onClick={() => { handleChangePageNext(page) }}>
                        <ArrowForwardIosSharpIcon className='iconBtn' />
                    </button></p>
            </div>
        </Box>
    );
}
export default AssessmentTable;