import React, { useEffect, useState } from 'react'
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
import { FormGroup } from "reactstrap";
import { updateIsActiveStatus } from '../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { useSelector, useDispatch } from 'react-redux';
import AppContainer from '../../components/AppContainer/AppContainer';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import * as routes from "../../Router/RoutesURL";
import { getTestimonialsList, approveRejectTestimonials } from '../../redux/actions/TestimonialsAction/TestimonialsAction';
import './Testimonials.scss';

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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'first_name',
        disablePadding: true,
        label: 'FIRST NAME',

    },
    {
        id: 'last_name',
        disablePadding: true,
        label: 'LAST NAME',
    },
    {
        id: 'phone_number',
        disablePadding: false,
        label: 'MOBILE NO.',
    },
    {
        id: 'email_id',
        disablePadding: false,
        label: 'EMAIL ADDRESS',
    },
    {
        id: 'submitted',
        disablePadding: false,
        label: 'SUBMITTED',
    },
    {
        id: 'is_active',
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
                            hideSortIcon={headCell.id === 'action' || headCell.id === 'thumbnail' ? true : false}
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
    const { rowsPerPageNos } = props;
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState(!localStorage.getItem("filter_type") ? "all" : JSON.parse(localStorage.getItem("filter_type")));
    const [filtersData, setFiltersData] = useState([]);
    const dispatch = useDispatch();
    const filterAllBtn = ["btn btn-secondary", filterType === "all" ? "allSelButton" : "allUnselButton"]
    const filterRecentBtn = ["btn btn-secondary", filterType === "recent" ? "selButton" : "UnselButton"]
    const filterLastWeekBtn = ["btn btn-secondary", filterType === "last_week" ? "selButton" : "UnselButton"]
    const filterThisMonthBtn = ["btn btn-secondary", filterType === "this_month" ? "selButton" : "UnselButton"]
    const filterThisYearBtn = ["btn btn-secondary", filterType === "this_year" ? "selButton" : "UnselButton"]

    useEffect(() => {
        const sendRequest = {
            "page_no": 1,
            "page_size": rowsPerPageNos,
            "filter_type": filterType,
            "filter_text": searchText,
        };
        dispatch(getTestimonialsList(sendRequest));
    }, []);

    useEffect(() => {
        let filtersValues = [];
        if (searchText !== "") {
            filtersValues.push({ key: "search", "value": searchText })
        }
        if (filterType !== "") {
            filtersValues.push({ key: "filterType", "value": filterType })
        }
        localStorage.setItem("contentVidPodFilters", JSON.stringify(filtersValues))
        setFiltersData((filtersValues));

        const sendRequest = {
            "page_no": 1,
            "page_size": rowsPerPageNos,
            "filter_type": filterType,
            "filter_text": searchText,
        };
        dispatch(getTestimonialsList(sendRequest));
    }, [searchText, filterType])

    const selectTestimonialsType = (val) => {
        setFilterType(val)
        localStorage.setItem("filter_type", JSON.stringify(val))
    }
    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
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
                        Guest List
                    </MainHeading>
                </div>
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-9 TestimonialsLevelDiv'>
                    <button type="button" className={filterAllBtn.join(' ')} onClick={() => { selectTestimonialsType("all") }}>All</button>
                    <button type="button" className={filterRecentBtn.join(' ')} onClick={() => { selectTestimonialsType("recent") }}>Recent</button>
                    <button type="button" className={filterLastWeekBtn.join(' ')} onClick={() => { selectTestimonialsType("last_week") }}>Last Week</button>
                    <button type="button" className={filterThisMonthBtn.join(' ')} onClick={() => { selectTestimonialsType("this_month") }}>This Month</button>
                    <button type="button" className={filterThisYearBtn.join(' ')} onClick={() => { selectTestimonialsType("this_year") }}>This Year</button>
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

const TestimonialsTable = (props) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate()
    const [testimonialsMainData, setTestimonialsMainData] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [id, setId] = useState();
    const viewTestimonialDat = useSelector(state => state?.getTestimonialsList);
    const viewTestimonialDataRes = useSelector(state => state.getTestimonialsList.getTestimonialsList.data);
    const btnPrev = ["btnPrev", showPrev ? "" : "opacityBtns"]
    const btnNext = ["btnNext", showNext ? "" : "opacityBtns"]
    const dispatch = useDispatch();

    useEffect(() => {
        if (viewTestimonialDat.error !== "No data found" && viewTestimonialDat.error !== "Ananda programs data does not exists") {
            setTestimonialsMainData(viewTestimonialDataRes && viewTestimonialDataRes?.data);
            if (viewTestimonialDataRes?.current_page_no === 1) {
                setShowPrev(false)
            } else {
                setShowPrev(true)
            }

            if (viewTestimonialDataRes?.current_page_no === viewTestimonialDataRes?.total_pages) {
                setShowNext(false)
            } else {
                setShowNext(true)
            }
        } else {
            setTestimonialsMainData('');
        }

    }, [viewTestimonialDataRes, viewTestimonialDat])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = testimonialsMainData.map((n) => n.name);
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
        const filterData = JSON.parse(localStorage.getItem("contentVidPodFilters"));
        const sendRequest = {
            "page_no": viewTestimonialDataRes?.current_page_no + 1,
            "page_size": rowsPerPage,
            "filter_type": filterData.filterType == undefined ? "" : filterData.filterType,
            "filter_text": filterData.search == undefined ? "" : filterData.search,
        };
        dispatch(getTestimonialsList(sendRequest));
    };

    const handleChangePagePrev = (newPage) => {
        setPage(newPage);
        const filterData = JSON.parse(localStorage.getItem("contentVidPodFilters"));
        const sendRequest = {
            "page_no": viewTestimonialDataRes?.current_page_no - 1,
            "page_size": rowsPerPage,
            "filter_type": filterData.filterType == undefined ? "" : filterData.filterType,
            "filter_text": filterData.search == undefined ? "" : filterData.search,
        };
        dispatch(getTestimonialsList(sendRequest));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.value);
        setPage(page);

        const filterData = JSON.parse(localStorage.getItem("contentVidPodFilters"));
        const sendRequest = {
            "page_no": 1,
            "page_size": event.value,
            "filter_type": filterData.filterType == undefined ? "" : filterData.filterType,
            "filter_text": filterData.search == undefined ? "" : filterData.search,
        };
        dispatch(getTestimonialsList(sendRequest));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - testimonialsMainData.length) : 0;

    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];
    const rowOptions = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 15, label: '15' },
    ];

    const { history } = props
    const filterType = (JSON.parse(localStorage.getItem("filter_type")));
    const handleViewTestimonial = (testimonialID, testimonialsStatus) => {
        if (testimonialsStatus === 1) {
            navigate(routes.VIEW_TESTIMONIALS, { state: { testimonialID, testimonialsStatus, filterType } })
        }
    };

    const handleChangeOption = (e, id) => {
        if (e.value === "Active") {
            testimonialsMainData.find(v => v.id === id).is_active = 1;
        } else {
            testimonialsMainData.find(v => v.id === id).is_active = 0;
        }
        setTestimonialsMainData(testimonialsMainData)
        const sendRequest = {
            "feature_type": "testimonial",
            "id": id,
            "status": e.value === "Active" ? 1 : 0
        };
        dispatch(updateIsActiveStatus(sendRequest));
    }

    const handleApprovedStatus = (e, id) => {
        if (e === "approved") {
            testimonialsMainData.find(v => v.id === id).status = "approve";
        }
        else {
            testimonialsMainData.find(v => v.id === id).status = "rejected";
        }
        setTestimonialsMainData(testimonialsMainData)
        const sendRequest = {
            "id": id,
            "status": e === "approved" ? 1 : 0
        };
        dispatch(approveRejectTestimonials(sendRequest));
    }

    const handleOpenModal = (e, id) => {
        setId(id)
        setShowDeleteModal(true);
    }

    const handleRejectModal = (e) => {
        if (e === "approved") {
            testimonialsMainData.find(v => v.id === id).status = "approve";
        }
        else {
            testimonialsMainData.find(v => v.id === id).status = "rejected";
        }
        setTestimonialsMainData(testimonialsMainData)
        const sendRequest = {
            "id": id,
            "status": e === "approved" ? 1 : 0
        };
        dispatch(approveRejectTestimonials(sendRequest));
        setShowDeleteModal(false);
    }

    const cancelWarnModal = () => {
        setShowDeleteModal(false);
    }

    return (
        <>

            <AppContainer history={history}>
                <div className="event-content">
                    <Box sx={{ width: '100%' }} className="TestimonialBox">
                        <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                            <EnhancedTableToolbar numSelected={selected.length} pageNos={page}
                                rowsPerPageNos={rowsPerPage} />
                            {viewTestimonialDataRes && testimonialsMainData && <TableContainer sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
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
                                        rowCount={viewTestimonialDataRes && viewTestimonialDataRes?.data.length}
                                    />
                                    <TableBody>
                                        {
                                            stableSort(viewTestimonialDataRes && testimonialsMainData, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {

                                                    const labelId = `enhanced-table-checkbox-${index}`;

                                                    return (
                                                        <TableRow hover onClick={(event) => handleClick(event, row.name)} role="checkbox"

                                                            tabIndex={-1}
                                                            key={row.id}

                                                        >
                                                            <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: (row.is_active == 0 || row.status === "rejected") ? "#AAAAAA" : '#000000' }}>
                                                                {row.first_name}
                                                            </TableCell>
                                                            <TableCell align="left" sx={{ color: (row.is_active == 0 || row.status === "rejected") ? "#AAAAAA" : '#000000' }}>{row.last_name}</TableCell>
                                                            <TableCell align="left" sx={{ color: (row.is_active == 0 || row.status === "rejected") ? "#AAAAAA" : '#000000' }}>
                                                                <p className='titleText'>{row.phone_number}
                                                                </p></TableCell>
                                                            <TableCell align="left" sx={{ color: (row.is_active == 0 || row.status === "rejected") ? "#AAAAAA" : '#000000' }}>{row.email_id}</TableCell>
                                                            <TableCell align="left"
                                                                sx={{ color: (row.is_active == 0 || row.status === "rejected") ? "#AAAAAA" : '#000000' }}

                                                            >
                                                                {row.submitted}
                                                            </TableCell>

                                                            <TableCell align="left" width="10px">
                                                                {row.status === "rejected" ?
                                                                    <Select
                                                                        isDisabled={row.status === "rejected" ? true : false}
                                                                        className="react-select"
                                                                        classNamePrefix="react-select"
                                                                        onChange={(e) => { handleChangeOption(e, row.id) }}
                                                                        value={row.is_active === 1 ? { label: "Active", value: "Active" } : { label: "Inactive", value: "Inactive" }}
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
                                                                            <>
                                                                                <span>
                                                                                    {row.label}
                                                                                </span>
                                                                                {row.is_active === 1 && (
                                                                                    <div

                                                                                    ></div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    />
                                                                    : <Select
                                                                        isDisabled={row.status === "rejected" ? true : false}
                                                                        className="react-select"
                                                                        classNamePrefix="react-select"
                                                                        onChange={(e) => { handleChangeOption(e, row.id) }}
                                                                        value={row.is_active === 1 ? { label: "Active", value: "Active" } : { label: "Inactive", value: "Inactive" }}
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
                                                                            <>
                                                                                <span className={row.label === "Active" ? "ActiveClass" : "InactiveClass"}
                                                                                >
                                                                                    {row.label}
                                                                                </span>
                                                                                {row.is_active === 1 && (
                                                                                    <div

                                                                                    ></div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    />}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <ul className="list-group d-flex flex-row ">
                                                                    <li
                                                                        className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0  mr-3' : "list-group-item ViewEditNotClick p-0 mr-3"}
                                                                        onClick={() => { handleViewTestimonial(row.id, row.is_active) }}><i className="fas fa-eye mr-1"></i> View</li>
                                                                    {row.status === "pending" ?
                                                                        <>                                                                <li className="list-group-item Edit p-0 mr-1" onClick={() => { handleApprovedStatus("approved", row.id) }} ><i className="fa fa-check mr-2 fw-bolder"></i>Approve</li>
                                                                            <li className="list-group-item Delete p-0 d-flex" onClick={() => { handleOpenModal("rejected", row.id) }}><i class="material-icons mr-1 closeText"
                                                                            >close</i> Reject</li>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <li className="list-group-item Status p-0 mr-1 text-capitalize" >{row.status}</li>
                                                                        </>
                                                                    }
                                                                </ul>
                                                            </TableCell>
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
                                    menuPlacement="top"
                                    menuPosition="fixed"
                                    onChange={handleChangeRowsPerPage}
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
                            {viewTestimonialDataRes?.data && <p className='endText'>   {viewTestimonialDataRes?.start} - {viewTestimonialDataRes?.end} of {viewTestimonialDataRes?.total}</p>}
                            <p>
                                <button className={btnPrev.join(' ')} onClick={() => { handleChangePagePrev(page) }}>
                                    <ArrowBackIosNewSharpIcon className='iconBtn' />
                                </button>
                                <button className={btnNext.join(' ')} onClick={() => { handleChangePageNext(page) }}>
                                    <ArrowForwardIosSharpIcon className='iconBtn' />
                                </button></p>
                        </div>
                    </Box>
                </div >
            </AppContainer >
            <div className='deletePopUp'>
                <Modal centered className="TeamMember-modal-warning br-8" show={showDeleteModal} onHide={() => { setShowDeleteModal(false) }}>
                    <Modal.Header>
                        <div className="modalText pb-4">Are you sure?</div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="">
                            <label htmlFor="exampleFormControlInput1" className="form-label DeleteDesc">You want to Reject this record?</label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-success greenButton mr-3" onClick={cancelWarnModal}>
                            Cancel</button>
                        <button type="button" className="btn btn-danger redButton " onClick={() => { handleRejectModal("rejected") }}>
                            Reject</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
export default TestimonialsTable;