import React, { useEffect, useState } from 'react'
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
import { createNotification } from '../../../Config/NotificationToast';
import Select from "react-select";
import Delete from "../../../assets/images/CommonComponent/trash.svg";
import { FormGroup, } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { getUserRoleList } from '../../../redux/actions/UserManagementAction/TeamMembersAction/TeamMembersAction';
import { addNewUserRole, deleteUserRoleTitle, UpdateUserRoleTitle } from '../../../redux/actions/UserManagementAction/UserRoleAction/UserRoleAction';
import Modal from 'react-bootstrap/Modal';
import {
    stableSort,
    getComparator,
    rowOptions,
    options,
} from '../../../utils/Helper'
import redCross from "../../../assets/images/CommonComponent/redCross.svg";
import GeenPlus from '../../../assets/images/CommonComponent/greenPlus.svg';
import './UserRole.scss';

const MainHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}))


const headCells = [
    {
        id: 'role_title',
        disablePadding: true,
        label: 'ROLE TITLE',
    },
    {
        id: 'data',
        disablePadding: false,
        label: '',
    },
    {
        id: 'is_active',
        disablePadding: false,
        label: 'STATUS',
    },
    {
        id: 'val',
        disablePadding: false,
        label: '',
    },
    {
        id: 'value',
        disablePadding: false,
        label: '',
    },

    {
        id: 'action',
        disablePadding: true,
        label: 'ACTION',

    },
];

const EnhancedTableHead=(props)=> {
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

const EnhancedTableToolbar=(props)=> {
    const { numSelected, pageNos, rowsPerPageNos, activeTab } = props;
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (activeTab == "UserRole") {
            const sendRequest = {
                "pageNo": pageNos,
                "pageSize": 10,
            }
            dispatch(getUserRoleList(sendRequest));
        }
    }, [activeTab]);

    const handleSearchText = (event) => {
        if (event.target.value.length > 0) {
            let value = {
                "pageNo": pageNos,
                "pageSize": rowsPerPageNos,
                "filter_text": event.target.value,
            };
            dispatch(getUserRoleList(value));
        }
        else if (event.target.value.length == 0) {
            let value = {
                "pageNo": pageNos,
                "pageSize": rowsPerPageNos,
                "filter_text": "",
            };
            dispatch(getUserRoleList(value));
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
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-3'>
                    <MainHeading
                        sx={{ flex: '1 1 100%', }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        User Role
                    </MainHeading>
                </div>
                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-10 col-xxl-9 LevelDiv'>
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

const UserRoleTable = (props) => {
    const { showConfirm, setShowConfirm, activeTab, permission } = props;
    const [state, setState] = useState({
        roleTitle: "",
    })
    const { roleTitle } = state;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selection, setSelection] = useState(props.selection);
    const [roleId, setRoleId] = useState();
    const [roleTitleName, setRoleTitleName] = useState();
    const [selected, setSelected] = useState([]);
    const [selectedTab, setSelectedTab] = useState(props.activeTab);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [userRoleListMainData, setUserRoleListMainData] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formErrorForEdit, setFormErrorForEdit] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(false);
    const dispatch = useDispatch();
    const getUserList = useSelector(state => state?.getUserRoleList?.getUserRoleList);
    const getUserListDataRes = getUserList?.data?.user_role_list;
    const btnPrev = ["btnPrev", showPrev ? "" : "opacityBtns"]
    const btnNext = ["btnNext", showNext ? "" : "opacityBtns"]
    const greenButton = ["btn btn-success greenButton", state.roleTitle === "" ? "opacityBtn" : ""]
    const editGreenButton = ["btn btn-success greenButton", roleTitleName === "" ? "opacityBtn" : ""]

    useEffect(() => {
        setSelectedTab(props.activeTab)
        setUserRoleListMainData(getUserList && getUserList?.data?.user_role_list);

        if (getUserList?.data?.current_page_no === 1) {
            setShowPrev(false)
        } else {
            setShowPrev(true)
        }

        if (getUserList?.data?.current_page_no === getUserList?.data?.total_pages) {
            setShowNext(false)
        } else {
            setShowNext(true)
        }

    }, [getUserListDataRes, props.activeTab])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = getUserListDataRes.map((n) => n.role_title);
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
            "pageNo": getUserList?.data?.current_page_no + 1,
            "pageSize": rowsPerPage,
            "filter_text": ""
        };
        dispatch(getUserRoleList(sendRequest));
    };
    const handleChangePagePrev = (newPage) => {
        setPage(newPage);
        const sendRequest = {
            "pageNo": getUserList?.data?.current_page_no - 1,
            "pageSize": rowsPerPage,
            "filter_text": ""
        };
        dispatch(getUserRoleList(sendRequest));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.value);

        setPage(page);
        const sendRequest = {
            "pageNo": 1,
            "pageSize": event.value,
            "filter_text": ""
        };

        dispatch(getUserRoleList(sendRequest));
    };

    const handleChangeOption = (e, id) => {
        if (permission === "write") {
            if (e.value === "Active") {
                getUserListDataRes.find(v => v.id === id).is_active = 1;
            } else {
                getUserListDataRes.find(v => v.id === id).is_active = 0;
            }
            setUserRoleListMainData(getUserListDataRes)
            const sendRequest = {
                "feature_type": "user_role",
                "id": id,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }



    const handleChange = (e) => {

        if (e?.target?.name != undefined) {
            let { name, value } = e.target;
            setState({ ...state, [name]: value });
            setIsSubmit(true);
        }
    };

    useEffect(() => {
        if (state.roleTitle !== "") {
            setFormErrors(validate(state));
        }
    }, [state]);

    useEffect(() => {
        if (roleTitleName !== "") {
            setFormErrorForEdit(validateForEdit(state));
        }
    }, [roleTitleName]);

    const handleSubmit = (e) => {
        if (selection === "edit") {
            e.preventDefault();
            setFormErrorForEdit(validateForEdit(state));
            setIsSubmit(true);

            if (Object.keys(formErrorForEdit).length === 0 && isSubmit && roleTitleName !== "") {
                setShowConfirm(false)
                const sendRequest = {
                    "role_id": roleId,
                    "update_role_title": roleTitleName,
                };
                dispatch(UpdateUserRoleTitle(sendRequest));
                setTimeout(() => {
                    const value = {
                        "pageNo": 1,
                        "pageSize": 10,
                        "filter_text": ""
                    };
                    dispatch(getUserRoleList(value));
                }, 1000);
            }

        }

        if (selection === "add") {
            e.preventDefault();
            setFormErrors(validate(state));
            setIsSubmit(true);

            if (Object.keys(formErrors).length === 0 && isSubmit && state.roleTitle !== "") {
                setShowConfirm(false)
                const sendRequest = {
                    "role_title": state.roleTitle,
                };
                dispatch(addNewUserRole(sendRequest));
                setState({ roleTitle: "" })
                setSelection("add")
            }

            if (!roleTitle) {
                return;
            }
            setTimeout(() => {
                const value = {
                    "pageNo": 1,
                    "pageSize": 10,
                    "filter_text": ""
                };
                dispatch(getUserRoleList(value));
            }, 1000);
        }


    }

    const validate = (values) => {
        const errors = {};

        if (!values.roleTitle) {
            errors.roleTitle = "User Role is required!";
        }

        return errors;
    };

    const validateForEdit = () => {
        const errorsForEdit = {};

        if (roleTitleName == "") {
            errorsForEdit.roleTitleName = "User Role is required!";
        }

        return errorsForEdit;
    };

    const cancelWarnModal = () => {
        setShowConfirm(false);
        setShowDeleteModal(false);
        setSelection("add");
        setFormErrorForEdit("");
    }

    const handleEditUserrole = (id, role_title) => {
        if (permission === "write") {
            setSelection("edit")
            setShowConfirm(true);
            setRoleId(id)
            setRoleTitleName(role_title)
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    const handleDelete = (id) => {
        if (permission === "write") {
            setRoleId(id)
            setShowDeleteModal(true);
        } else {
            createNotification('warning', "Access Restricted");
        }
    };

    const closeDeleteModal = () => {
        const sendRequest = {
            "role_id": roleId
        };
        dispatch(deleteUserRoleTitle(sendRequest));
        setShowDeleteModal(false);

        setTimeout(() => {
            const value = {
                "pageNo": 1,
                "pageSize": 10,
                "filter_text": ""
            };
            dispatch(getUserRoleList(value));
        }, 1000);
    }



    return (
        <>        <div className="ProBox">
            <Box sx={{ width: '100%' }} className="UserBox">
                <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} pageNos={page}
                        rowsPerPageNos={rowsPerPage} selectedTab={selectedTab} activeTab={activeTab} />
                    {userRoleListMainData && <TableContainer sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
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
                                rowCount={userRoleListMainData && userRoleListMainData?.length}
                            />
                            <TableBody>
                                {
                                    stableSort(userRoleListMainData, getComparator(order, orderBy))
                                        .slice((rowsPerPage * (page - 1)), (rowsPerPage * (page) + rowsPerPage))
                                        .map((row, index) => {
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow hover onClick={(event) => handleClick(event, row.role_title)} role="checkbox"
                                                    tabIndex={-1}
                                                    key={row.role_title}
                                                >
                                                    <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: row.is_active === 1 ? '#000000' : "#AAAAAA" }}>{row.role_title}</TableCell>
                                                    <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: row.is_active === 1 ? '#000000' : "#AAAAAA" }}></TableCell>
                                                    <TableCell padding="none" align="left" width="10px" sx={{ color: row.is_active === 1 ? '#000000' : "#AAAAAA" }}

                                                    >
                                                        <div className='SelectDropDown'>
                                                            <Select

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
                                                                    <><span
                                                                        className={row.label === "Active" ? "ActiveClass" : "InactiveClass"} >
                                                                        {row.label}
                                                                    </span>
                                                                        {row.status === 1 && (
                                                                            <div

                                                                            ></div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: row.is_active === 1 ? '#000000' : "#AAAAAA" }}></TableCell>
                                                    <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: row.is_active === 1 ? '#000000' : "#AAAAAA" }}></TableCell>
                                                    <TableCell padding="none" align="left" className='View' sx={{ color: row.is_active === 1 ? '#000000' : "#AAAAAA" }}>
                                                        <ul

                                                            className={row.is_active == 1 ? 'list-group d-flex flex-row View ' : " list-group d-flex flex-row NotView"}
                                                        >
                                                            <li
                                                                className={row.is_active == 1 ? 'list-group-item ViewEditClick p-0 ' : "list-group-item ViewEditNotClick p-0"}

                                                                onClick={() => { handleEditUserrole(row.id, row.role_title) }}
                                                            ><i className="fa fa-pen mr-2"></i> Edit</li>
                                                            <li
                                                                className={row.is_active == 1 ? 'list-group-item DeleteClick p-0 ' : "list-group-item DeleteNotClick p-0"}

                                                                onClick={() => { handleDelete(row.id) }}
                                                            > <img src={Delete} className="mr-2 mb-1" alt="Avatar" width="14px" height="16px" /> Delete</li>
                                                        </ul>
                                                    </TableCell>
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
                    {getUserList?.data && <p className='endText'>   {getUserList?.data?.start} - {getUserList?.data?.end} of {getUserList?.data?.total}</p>}
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
            {selection == "add" ?
                <>
                    <Modal centered className="userRole-modal-warning br-8" show={showConfirm} onHide={() => { setShowConfirm(false) }}>
                        <form className="" onSubmit={handleSubmit} >
                            <Modal.Header>
                                <div className="modalText pb-4">Add New User Role</div>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="">
                                    <label htmlFor="exampleFormControlInput1" className="form-label Label">User Role Title</label>
                                    <input
                                        placeholder="Enter role title"
                                        className="form-control Title"
                                        type="text"
                                        name='roleTitle'
                                        value={roleTitle}

                                        onChange={handleChange}
                                    />
                                    <div id='emailError' className='small'>{formErrors.roleTitle}</div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" className="btn btn-danger redButton mr-3" onClick={cancelWarnModal}>
                                    <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                    CANCEL</button>
                                <button type="submit" className={greenButton.join(' ')}>
                                    <img className="mr-2 mb-1" src={GeenPlus} alt="" width="16px" height="16px" />
                                    ADD</button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                </>
                :
                <>
                    <Modal centered className="userRole-modal-warning br-8" show={showConfirm} onHide={() => { setShowConfirm(false) }}>
                        <form className="" onSubmit={handleSubmit} >
                            <Modal.Header>
                                <div className="modalText pb-4">Edit Role Title</div>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="">
                                    <label htmlFor="exampleFormControlInput1" className="form-label Label">Role Title</label>
                                    <input
                                        placeholder="Enter role title"
                                        className="form-control Title"
                                        type="text"
                                        name='roleTitle'
                                        value={roleTitleName}
                                        onChange={(event) => setRoleTitleName(event.target.value)}

                                    />
                                    <div id='emailError' className='small'>{formErrorForEdit.roleTitleName}</div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" className="btn btn-danger redButton mr-3" onClick={cancelWarnModal}>
                                    <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                    CANCEL</button>
                                <button type="submit" className={editGreenButton.join(' ')}>
                                    <img className="mr-2 mb-1" src={GeenPlus} alt="" width="16px" height="16px" />
                                    ADD</button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                </>
            }
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
export default UserRoleTable;