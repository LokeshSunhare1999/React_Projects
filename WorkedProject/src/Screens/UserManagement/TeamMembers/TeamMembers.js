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
import Checkbox from '@mui/material/Checkbox';
import { createNotification } from '../../../Config/NotificationToast';
import { FormGroup, Label, } from "reactstrap";
import * as routes from "../../../Router/RoutesURL";
import { useSelector, useDispatch } from 'react-redux';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { viewTeamMembers, deleteTeamMember, getUserRoleList, updateMultipleUserRole } from '../../../redux/actions/UserManagementAction/TeamMembersAction/TeamMembersAction';
import './TeamMembers.scss';
import {
    stableSort,
    getComparator,
    rowOptions,
    options,
} from '../../../utils/Helper'
import Modal from 'react-bootstrap/Modal';
import Delete from "../../../assets/images/CommonComponent/trash.svg";
import './TeamMembers.scss';

const MainHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}))


const headCells = [
    {
        id: 'first_name',
        disablePadding: true,
        label: 'FIRST NAME',
    },
    {
        id: 'last_name',
        disablePadding: false,
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
        id: 'role_title',
        disablePadding: false,
        label: 'USER ROLE',
    },
    {
        id: 'added_on',
        disablePadding: false,
        label: 'ADDED ON',
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

const EnhancedTableHead=(props)=> {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
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

const EnhancedTableToolbar=(props)=> {
    const { numSelected, pageNos, rowsPerPageNos, selected, activeTab, permission } = props;
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [userRoleID, setUserRoleID] = useState();
    const [checkedSelected, setCheckedSelected] = useState(numSelected);
    const [userRoleTitle, setUserRoleTitle] = useState('');
    const [userListRole, setUserListRole] = useState();
    const TeamMembersListDataRes = useSelector(state => state?.viewTeamMembers?.viewTeamMembers);
    const getUserList = useSelector(state => state?.getUserRoleList?.getUserRoleList);
    const getUserListData = getUserList?.data;
    const updateMultipleTeamMemberRoleData = useSelector(state => state?.updateMultipleUserRole?.updateMultipleUserRole);

    useEffect(() => {
        setCheckedSelected(numSelected)
    }, [numSelected]);

    useEffect(() => {
        if (getUserListData && getUserList) {
            setTimeout(() => {
                const data = getUserListData?.map((item) => ({
                    ...item,
                    value: item.role_title,
                }));
                setUserListRole(data);
            }, 1000);
        } else {
            setUserListRole([]);
        }
    }, [getUserListData, userRoleID]);

    useEffect(() => {
        if (activeTab == "TeamMembers") {
            const sendRequest = {
                "pageNo": "",
                "pageSize": "",
                "filter_text": "",
                "is_team_list_req": 1
            }
            dispatch(getUserRoleList(sendRequest));
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab == "TeamMembers") {
            if (!userRoleID && userRoleID == "" && userRoleID !== 0) {
                const sendRequest = {
                    "pageNo": pageNos,
                    "pageSize": rowsPerPageNos,
                    "filter_text": "",
                };
                dispatch(viewTeamMembers(sendRequest));
            }
            else {
                if (updateMultipleTeamMemberRoleData?.statusCode == 200) {
                    const sendRequest = {
                        "pageNo": pageNos,
                        "pageSize": rowsPerPageNos,
                        "filter_type": userRoleID,
                        "filter_text": "",
                    };
                    dispatch(viewTeamMembers(sendRequest));
                } else {
                    const sendRequest = {
                        "pageNo": pageNos,
                        "pageSize": 10,
                        "filter_type": userRoleID,
                        "filter_text": "",
                    };
                    dispatch(viewTeamMembers(sendRequest));
                }
            }
        }
    }, [userRoleID, activeTab, updateMultipleTeamMemberRoleData]);

    useEffect(() => {
        if (activeTab == "TeamMembers") {
            if (updateMultipleTeamMemberRoleData?.statusCode == 200) {
                const sendRequest = {
                    "pageNo": pageNos,
                    "pageSize": rowsPerPageNos,
                    "filter_type": userRoleID,
                    "filter_text": "",
                };
                dispatch(viewTeamMembers(sendRequest));
            }
        }
    }, [activeTab]);

    useEffect(() => {
        if (checkedSelected > 0) {
            const sendRequest = {
                "ids": selected,
                "role_id": userRoleID,
                "role_title": userRoleTitle?.role_title
            };
            dispatch(updateMultipleUserRole(sendRequest));
            setCheckedSelected(0)
        }
    }, [userRoleID]);

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }

    useEffect(() => {
        if (activeTab == "TeamMembers") {
            if (searchText.length > 0) {
                const sendRequest = {
                    "pageNo": pageNos,
                    "pageSize": rowsPerPageNos,
                    "filter_type": userRoleID,
                    "filter_text": searchText,
                };
                dispatch(viewTeamMembers(sendRequest));
            }
            else if (searchText.length == 0) {
                const sendRequest = {
                    "pageNo": pageNos,
                    "pageSize": rowsPerPageNos,
                    "filter_type": userRoleID,
                    "filter_text": "",
                };
                dispatch(viewTeamMembers(sendRequest));
            }
        }
    }, [searchText, activeTab]);


    const handleChangeLevel = (e) => {
        if (checkedSelected > 0) {
            if (permission === "write") {
                setUserRoleID(e.id)
                setUserRoleTitle(e)
            } else {
                createNotification('warning', "Access Restricted");
            }
        } else {
            setUserRoleID(e.id)
            setUserRoleTitle(e)
        }
    }

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
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-3'>
                    <MainHeading
                        sx={{ flex: '1 1 100%', }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Team Members
                    </MainHeading>
                </div>
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-9 LevelDiv'>
                    <FormGroup className="FormGroup has-float-label class-menu-dropdown ">
                        {checkedSelected > 0 ? <Label>Update Role:</Label> : <Label>User Role:</Label>}
                        <Select

                            className="react-select"
                            classNamePrefix="react-select"
                            value={userRoleTitle}
                            options={userListRole}
                            onChange={handleChangeLevel}
                            getOptionLabel={(e) => (
                                <span>{e.role_title}</span>
                            )}
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

const TeamMembersTable = (props) => {
    const { activeTab, permission } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedTab, setSelectedTab] = useState(props.activeTab);
    const [showConfirm, setShowConfirm] = useState(false);
    const [id, setId] = useState([]);
    const [roleTitle, setRoleTitle] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [viewTeamMembersData, setTeamMembersData] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);
    const navigate = useNavigate()
    const TeamMembersListDataRes = useSelector(state => state?.viewTeamMembers?.viewTeamMembers);
    const deleteDataRes = useSelector(state => state?.deleteTeamMember?.deleteTeamMember);
    const TeamMemberListData = TeamMembersListDataRes?.data?.team_list;
    const btnPrev = ["btnPrev", showPrev ? "" : "opacityBtns"]
    const btnNext = ["btnNext", showNext ? "" : "opacityBtns"]

    const dispatch = useDispatch();
    useEffect(() => {
        setSelectedTab(props.activeTab)
        setTeamMembersData(TeamMembersListDataRes && TeamMembersListDataRes?.data?.team_list);
        setSelected([]);
        if (TeamMembersListDataRes?.data?.current_page_no === 1) {
            setShowPrev(false)
        } else {
            setShowPrev(true)
        }

        if (TeamMembersListDataRes?.data?.current_page_no === TeamMembersListDataRes?.data?.total_pages) {
            setShowNext(false)
        } else {
            setShowNext(true)
        }

    }, [TeamMembersListDataRes, props.activeTab])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = TeamMembersListDataRes && TeamMembersListDataRes?.data?.team_list.map((n) => n.id);
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
        const sendRequest = {
            "pageNo": TeamMembersListDataRes?.data?.current_page_no + 1,
            "pageSize": rowsPerPage,
            "filter_text": "",
        };
        dispatch(viewTeamMembers(sendRequest));
    };

    const handleChangePagePrev = (newPage) => {
        setPage(newPage);
        const sendRequest = {
            "pageNo": TeamMembersListDataRes?.data?.current_page_no - 1,
            "pageSize": rowsPerPage,
            "filter_text": "",
        };

        dispatch(viewTeamMembers(sendRequest));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.value);
        setPage(page);
        const sendRequest = {
            "pageNo": 1,
            "pageSize": event.value,
            "filter_text": "",
        };
        dispatch(viewTeamMembers(sendRequest));
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TeamMembersListDataRes && viewTeamMembersData?.length) : 0;


    const ViewTeamMember = (selectedMemberId, userStatus, selectedRoleTitle) => {
        navigate(routes.VIEW_MEMBER, { state: { selectedMemberId, userStatus, selectedRoleTitle, permission } })
    };

    const [status, setStatus] = useState(null)

    const handleChangeOption = (e, id, role_title) => {
        if (permission === "write") {
            if (e.value === "Active") {
                viewTeamMembersData.find(v => v.id === id).is_active = 1;
            } else {
                viewTeamMembersData.find(v => v.id === id).is_active = 0;
            }
            setTeamMembersData(viewTeamMembersData)
            const sendRequest = {

                "feature_type": role_title == "admin" ? "admin" : "user",
                "id": id,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
            setStatus(e.value)
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    const handleDelete = (id, role_title) => {
        if (permission === "write") {
            setId(id)
            setRoleTitle(role_title)
            setShowConfirm(true);
        } else {
            createNotification('warning', "Access Restricted");
        }
    };

    const cancelWarnModal = () => {
        setShowConfirm(false);
    }

    const closeWarnModal = () => {
        const sendRequest = {
            "feature_type": roleTitle == "admin" ? "admin" : "user",

            "ids": [id]
        };
        dispatch(deleteTeamMember(sendRequest));
        setShowConfirm(false);
        setTimeout(() => {
            const sendRequest = {
                "pageNo": TeamMembersListDataRes?.data?.current_page_no,
                "pageSize": 10,
            };
            dispatch(viewTeamMembers(sendRequest));
        }, 1000);
    }

    const handleNavigate = (selectedMemberId, selectedRoleTitle) => {
        if (permission === "write") {
            localStorage.setItem('add', false)
            navigate(routes.ADD_MEMBER, { state: { selectedMemberId, selectedRoleTitle, selection: "edit" } })
        } else {
            createNotification('warning', "Access Restricted");
        }

    };

    return (
        <>
            <div className="ProBox">
                <Box sx={{ width: '100%' }} className="TeamMemberBox">
                    <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} pageNos={page}
                            rowsPerPageNos={rowsPerPage} selected={selected} selectedTab={selectedTab} activeTab={activeTab} permission={permission} />
                        {TeamMemberListData && <TableContainer sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
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
                                    rowCount={TeamMembersListDataRes && TeamMembersListDataRes?.data?.team_list.length}
                                />
                                <TableBody>
                                    {stableSort(TeamMembersListDataRes?.data?.team_list, getComparator(order, orderBy))

                                        .slice((rowsPerPage * (page - 1)), (rowsPerPage * (page) + rowsPerPage))


                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow hover role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            className={row.is_active == 1 ? 'CheckClick' : "CheckNotClick"}
                                                            sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}
                                                            onClick={row.is_active == 1 ? (event) => handleClick(event, row.id) : ""}

                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA", textTransform: "capitalize" }}>{row.first_name}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA", textTransform: "capitalize" }}>{row.last_name}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.phone_number}</TableCell>
                                                    <TableCell align="left" sx={{color: row.is_active === 1 ? '#000000' : "#AAAAAA" , textTransform: "lowercase"}}>{row.email_id}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.role_title}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}>{row.added_on}</TableCell>
                                                    <TableCell align="left" sx={{ color: row.is_active == 1 ? '#000000' : "#AAAAAA" }}

                                                    >
                                                        <Select

                                                            className="react-select"

                                                            classNamePrefix="react-select"
                                                            onChange={(e) => { handleChangeOption(e, row.id, row.role_title, row.is_active) }}
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
                                                                <><span
                                                                    className={row.label === "Active" ? "ActiveClass" : "InactiveClass"} >
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
                                                                onClick={row.is_active == 1 ? () => { ViewTeamMember(row.id, row.is_active, row.role_title) } : ""}><i className="fas fa-eye mr-1"></i> View</li>
                                                            <li className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0 ' : "list-group-item ViewEditNotClick p-0"}
                                                                onClick={row.is_active == 1 ? () => { handleNavigate(row.id, row.role_title) } : ""}><i className="fa fa-pen mr-1"></i> Edit</li>
                                                            <li className="list-group-item Delete p-0" onClick={() => { handleDelete(row.id, row.role_title) }}><img src={Delete} className="mr-1 mb-1" alt="Avatar" width="14px" height="16px" /> Delete</li>
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
                        {TeamMembersListDataRes?.data && <p className='endText'>   {TeamMembersListDataRes?.data?.start} - {TeamMembersListDataRes?.data?.end} of {TeamMembersListDataRes?.data?.total}</p>}
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

            <Modal centered className="TeamMember-modal-warning br-8" show={showConfirm} onHide={() => { setShowConfirm(false) }}>
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
                    <button type="button" className="btn btn-danger redButton " onClick={closeWarnModal}>
                        Delete</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default TeamMembersTable;