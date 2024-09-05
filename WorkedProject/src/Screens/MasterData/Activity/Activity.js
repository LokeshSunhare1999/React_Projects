import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
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
import * as moment from 'moment';
import { FormGroup, } from "reactstrap";
import * as routes from "../../../Router/RoutesURL";
import { createNotification } from '../../../Config/NotificationToast';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { deleteMasterDataModule } from '../../../redux/actions/MasterDataAction/RecipeCollection/RecipeCollectionAction';
import Delete from "../../../assets/images/CommonComponent/trash.svg";
import Modal from 'react-bootstrap/Modal';
import { stableSort, getComparator, rowOptions, options, } from '../../../utils/Helper'
import { getActivityList } from '../../../redux/actions/MasterDataAction/ActivityAction/ActivityAction';
import './Activity.scss';

const MainHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}))

const headCells = [
    {
        id: 'title',
        disablePadding: true,
        label: 'ACTIVITY TITLE',
    },
    {
        id: 'no_of_capacity',
        disablePadding: false,
        label: 'CAPACITY',
    },
    {
        id: 'booked_user',
        disablePadding: false,
        label: 'BOOKED USER COUNT',
    },
    {
        id: 'venue',
        disablePadding: false,
        label: 'VENUE',
    },
    {
        id: 'activity_date',
        disablePadding: false,
        label: 'ACTIVITY DATE',
    },
    {
        id: 'activity_time',
        disablePadding: false,
        label: 'ACTIVITY TIME',
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
    const { pageNos, rowsPerPageNos, activeTab } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        if (activeTab == "Activity") {
            const sendRequest = {
                "pageNo": pageNos,
                "pageSize": 10,
                "filter_text": ""
            };
            dispatch(getActivityList(sendRequest));
        }
    }, [activeTab]);


    const handleSearchActivity = (event) => {
        localStorage.setItem("searchText", event.target.value)
        if (event.target.value.length > 0) {
            let value = {
                "pageNo": pageNos,
                "pageSize": rowsPerPageNos,
                "filter_text": event.target.value,
            };
            dispatch(getActivityList(value));
        }
        else if (event.target.value.length == 0) {
            let value = {
                "pageNo": pageNos,
                "pageSize": rowsPerPageNos,
                "filter_text": "",
            };
            dispatch(getActivityList(value));
        }
    };


    return (

        <>
            <Toolbar sx={{
                pl: { sm: 2 },
                pt: { sm: 2 },
                pb: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
            >
                <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-3 col-xxl-3'>
                    <MainHeading
                        sx={{ flex: '1 1 100%', }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Daily Activities
                    </MainHeading>
                </div>
                <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-9 col-xxl-9 ActivitySearchDiv'>

                    <div className="separator"></div>
                    <div className="mr-sm-2 searchDiv class-search ">
                        <input
                            className="form-control mr-sm-2 class-search"
                            type="search"
                            placeholder=" Search Keyword"
                            aria-label="Search"
                            onChange={(event) => { handleSearchActivity(event) }}
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

const ActivityTable = (props) => {
    const { activeTab, permission } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [id, setId] = useState();
    const [activityMainData, setActivityMainData] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);
    const navigate = useNavigate()
    const activityData = useSelector(state => state?.getActivityList);
    const getActivityListData = useSelector(state => state?.getActivityList?.getActivityList);

    const btnPrev = ["btnPrev", showPrev ? "" : "opacityBtns"]
    const btnNext = ["btnNext", showNext ? "" : "opacityBtns"]
    const dispatch = useDispatch();

    useEffect(() => {
        if (activityData.error !== "Ananda programs data does not exists") {
            setActivityMainData(getActivityListData && getActivityListData?.data?.recipe_list_data?.activity_list);

            if (getActivityListData?.data?.recipe_list_data?.current_page_no === 1) {
                setShowPrev(false)
            } else {
                setShowPrev(true)
            }
            if (getActivityListData?.data?.recipe_list_data?.current_page_no === getActivityListData?.data?.recipe_list_data?.total_pages) {
                setShowNext(false)
            } else {
                setShowNext(true)
            }
        }
        else {
            setActivityMainData('');
        }

    }, [getActivityListData, activityData])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = getActivityListData && activityMainData.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (name) => {
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
        const sendRequest = {
            "pageNo": getActivityListData?.data?.recipe_list_data?.current_page_no + 1,
            "pageSize": rowsPerPage,
            "filter_text": ""
        };
        dispatch(getActivityList(sendRequest));
    };

    const handleChangePagePrev = (newPage) => {
        setPage(newPage);

        const sendRequest = {
            "pageNo": getActivityListData?.data?.recipe_list_data?.current_page_no - 1,
            "pageSize": rowsPerPage,
            "filter_text": ""
        };

        dispatch(getActivityList(sendRequest));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.value);
        setPage(page);
        const sendRequest = {
            "pageNo": 1,
            "pageSize": event.value,
            "filter_text": ""
        };
        dispatch(getActivityList(sendRequest));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getActivityListData && activityMainData?.length) : 0;

    const handleChangeOption = (e, id) => {
        if (permission === "write") {
            if (e.value === "Active") {
                activityMainData.find(v => v.id === id).is_active = 1;
            } else {
                activityMainData.find(v => v.id === id).is_active = 0;
            }
            setActivityMainData(activityMainData)
            const sendRequest = {
                "feature_type": "daily_activity",
                "id": id,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
            setTimeout(() => {
                const sendValue = {
                    "pageNo": getActivityListData?.data?.recipe_list_data?.current_page_no,
                    "pageSize": 10,
                    "filter_text": ""
                };
                dispatch(getActivityList(sendValue));
            }, 100);
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    const handleNavigateViewActivity = (activityId, activityTitle, status) => {
        navigate(routes.VIEW_ACTIVITY, { state: { activityId, activityTitle, status, permission } })
    };

    const handleNavigate = (activityId,) => {
        if (permission === "write") {
            navigate(routes.EDIT_ACTIVITY, { state: { activityId } })
        } else {
            createNotification('warning', "Access Restricted");
        }
    };

    const handleDelete = (id) => {
        if (permission === "write") {
            setId(id)
            setShowDeleteModal(true);
        } else {
            createNotification('warning', "Access Restricted");
        }
    };

    const closeDeleteModal = () => {
        const sendRequest = {
            "feature_type": "daily_activity",
            "ids": id
        };
        dispatch(deleteMasterDataModule(sendRequest));
        setShowDeleteModal(false);
        setTimeout(() => {
            const sendRequest = {
                "pageNo": getActivityListData?.data?.recipe_list_data?.current_page_no,
                "pageSize": 10,
                "filter_text": ""
            };
            dispatch(getActivityList(sendRequest));
        }, 1000);
    }

    const cancelWarnModal = () => {
        setShowDeleteModal(false);
    }

    return (
        <>
            <div className="ProBox">
                <Box sx={{ width: '100%' }} className="ActivityBox">
                    <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} pageNos={page}
                            rowsPerPageNos={rowsPerPage} activeTab={activeTab} />
                        {activityMainData && <TableContainer sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
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
                                    rowCount={getActivityListData && activityMainData?.length}
                                />
                                <TableBody>
                                    {
                                        stableSort(activityMainData, getComparator(order, orderBy))
                                            .slice((rowsPerPage * (page - 1)), (rowsPerPage * (page) + rowsPerPage))
                                            .map((row, index) => {
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                const dateObj =  moment(row?.activity_datetime).format('MM/DD/YYYY');
                                                const timeObj =  moment(row?.activity_datetime).format('HH:mm:ss');
                                                return (
                                                    <TableRow hover onClick={(event) => handleClick(event, row.title)} role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.title}
                                                    >
                                                        <TableCell component="th" id={labelId} scope="row" padding="none"
                                                            sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.title}</TableCell>
                                                        <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.no_of_capacity
                                                        }  </TableCell>
                                                        <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.booked_user}</TableCell>
                                                        <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.venue}</TableCell>
                                                        <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{dateObj}</TableCell>
                                                        <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{timeObj}</TableCell>
                                                        <TableCell align="left"
                                                            className='ActiveInactiveCell'
                                                            sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>
                                                            <Select
                                                                className="react-select"
                                                                classNamePrefix="react-select"
                                                                onChange={(e) => { handleChangeOption(e, row.id, row.is_active) }}
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
                                                                    <><span className={row.label === "Active" ? "ActiveClass" : "InactiveClass"} >
                                                                        {row.label}
                                                                    </span>
                                                                        {row.is_active === 1 && (
                                                                            <div

                                                                            ></div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="left" className='View' >
                                                            <ul className="list-group d-flex flex-row ">
                                                                <li
                                                                    className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0 ' : "list-group-item ViewEditNotClick p-0"}
                                                                    onClick={row.is_active == 1 ? () => { handleNavigateViewActivity(row.id, row.title, row.is_active) } : ""}><i className="fas fa-eye mr-1"></i> View</li>
                                                                <li
                                                                    className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0 ' : "list-group-item ViewEditNotClick p-0"}
                                                                    onClick={row.is_active == 1 ? () => { handleNavigate(row.id) } : ""}><i className="fa fa-pen mr-1"></i> Edit</li>
                                                                <li className="list-group-item Delete p-0" onClick={() => { handleDelete(row.id) }}><img src={Delete} className="mr-1 mb-1" alt="Avatar" width="14px" height="16px" /> Delete</li>
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
                                menuPlacement="top"
                                menuPosition="fixed"
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
                            />
                        </FormGroup>
                        {getActivityListData?.data && <p className='endText'>   {getActivityListData?.data?.recipe_list_data?.start} - {getActivityListData?.data?.recipe_list_data?.end} of {getActivityListData?.data?.recipe_list_data?.total}</p>}

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
            <Modal centered className="TeamMember-modal-warning br-8" show={showDeleteModal} onHide={() => { setShowDeleteModal(false) }}>
                <Modal.Header>
                    <div className="modalText pb-4">Are you sure?</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <label htmlFor="exampleFormControlInput1" className="form-label DeleteDesc">You want to delete this record?</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-success greenButton mr-3" onClick={cancelWarnModal}>
                        Cancel</button>
                    <button type="button" className="btn btn-danger redButton " onClick={closeDeleteModal}>
                        Delete</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ActivityTable;
