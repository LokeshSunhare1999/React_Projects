import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dummyGuestProfile from '../../../assets/images/CommonComponent/dummyGuestProfile.png';
import Select from "react-select";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { createNotification } from '../../../Config/NotificationToast';
import * as routes from "../../../Router/RoutesURL";
import AppContainer from '../../../components/AppContainer/AppContainer';
import { viewGuestUserDetails } from '../../../redux/actions/UserManagementAction/GuestUserAction/GuestUserAction';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import './ViewGuestUser.scss';

const headCells = [
    {
        id: 'section_name',
        numeric: false,
        disablePadding: true,
        label: 'ACTIVITY',
        disableSorting: true
    },
    {
        id: 'questions_count',
        numeric: true,
        disablePadding: false,
        label: 'CATEGORY',
        disableSorting: true
    },
    {
        id: 'position',
        numeric: true,
        disablePadding: false,
        label: 'TIME',
        disableSorting: true
    },
    {
        id: 'created_on',
        numeric: true,
        disablePadding: false,
        label: 'SCHEDULE',
        disableSorting: true
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'REMINDERS',
        disableSorting: true
    }
];

const EnhancedTableHead=()=> {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        <TableSortLabel
                            hideSortIcon={headCell.disableSorting}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const ViewGuestUser = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState("");
    const [guestDetails, setGuestDetails] = useState([]);
    const [dincharyaSchedule, setDincharyaSchedule] = useState([]);
    const { history } = props;
    const navigate = useNavigate()
    const viewGuestDetailsRes = useSelector(state => state.viewGuestUserDetails.viewGuestDetailsRes);
    const { selectedUserId, userStatus, permission } = location.state;
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];
    useEffect(() => {
        if (selectedUserId) {
            setSelectedStatus(userStatus);
            const sendRequest = {
                "user_id": selectedUserId
            };
            dispatch(viewGuestUserDetails(sendRequest));
        }
    }, [])

    useEffect(() => {
        if (viewGuestDetailsRes && viewGuestDetailsRes) {
            setGuestDetails(viewGuestDetailsRes?.data?.customer_data[0]);
            setDincharyaSchedule(viewGuestDetailsRes?.data?.dincharya_schedule);
        }
    }, [viewGuestDetailsRes])

    const handleChangeOption = (e) => {
        if (permission === "write") {
            setSelectedStatus(e.value === "Active" ? 1 : 0);
            const sendRequest = {
                "feature_type": "guest",
                "id": selectedUserId,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }
    const showEditUser = (e) => {
        if (permission === "write") {
            navigate(routes.EDIT_USER, { state: { selectedUserId } });
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='ViewGuest'>
                    {guestDetails && <div className="card">
                        <div className="card-header">
                            <h4 className='programTitle'>{guestDetails.first_name} {guestDetails.last_name}</h4>
                            <div className='ButtonsDiv'>
                                <button className='editButtonGuest' onClick={showEditUser}>
                                    <i className="fa fa-pen mr-2"></i>
                                    Edit
                                </button>
                                <Select
                                    className={selectedStatus === 1 ? "react-select" : "react-selectChange"}
                                    classNamePrefix="react-select"
                                    onChange={(e) => { handleChangeOption(e) }}
                                    value={selectedStatus === 1 ? { label: "Active", value: "Active" } : { label: "Inactive", value: "Inactive" }}
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
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div className="card-body detailsDataPro">
                            <div className='DecDiv'>
                                <ul className="list-group FirstGroup">
                                    <li className="list-group-item boldText">MOBILE NO.:</li>
                                    <li className="list-group-item boldText">EMAIL ADDRESS:</li>
                                    <li className="list-group-item boldText">PROGRAM:</li>
                                    <li className="list-group-item boldText">START DATE:</li>
                                    <li className="list-group-item boldText">END DATE:</li>
                                    <li className="list-group-item boldText">DATE OF BIRTH:</li>
                                    <li className="list-group-item boldText">GENDER:</li>
                                    <li className="list-group-item boldText">ADDRESS:</li>
                                </ul>
                                <ul className="list-group SecondGroup">
                                    <li className="list-group-item levelText">{guestDetails.phone_number ? guestDetails.phone_number : ""}</li>
                                    <li className="list-group-item">{guestDetails.email_id ? guestDetails.email_id : ""}</li>
                                    <li className="list-group-item">{guestDetails.selected_program ? guestDetails.selected_program : ""}</li>
                                    <li className="list-group-item">{guestDetails.start_date ? guestDetails.start_date : ""}</li>
                                    <li className="list-group-item">{guestDetails.end_date ? guestDetails.end_date : ""}</li>
                                    <li className="list-group-item">{guestDetails.date_of_birth ? guestDetails.date_of_birth : ""}{guestDetails.age ? <p className='ageText'>(  {guestDetails.age} years )</p> : ""}</li>
                                    <li className="list-group-item">{guestDetails.gender ? guestDetails.gender : ""}</li>
                                    <li className="list-group-item">{guestDetails.address ? guestDetails.address : ""}</li>
                                </ul>
                            </div>
                            <div className='DecDiv'>
                                <div className="list-group">
                                    <div className='imgDivText'>
                                        <p className='titleText'>
                                            PROFILE PICTURE
                                        </p>
                                        {guestDetails && guestDetails.gender && <img className="mainImgPro" src={dummyGuestProfile} alt="" width="60px" height="60px" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='advanceTitle'>ADVANCE DINACHARYA</p>
                        <div className='advanceTableMainDiv'>
                            <Box sx={{ width: '100%' }} className="AdvanceBox">
                                <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                                    {dincharyaSchedule &&
                                        <TableContainer sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
                                            <Table
                                                sx={{ minWidth: 750 }}
                                                aria-labelledby="tableTitle"
                                                size={'medium'}
                                            >
                                                <EnhancedTableHead
                                                />
                                                <TableBody>
                                                    {dincharyaSchedule.map((row, index) => {
                                                        return (
                                                            <TableRow hover role="checkbox" key={index}>
                                                                <TableCell align="left">{row.category_name}</TableCell>
                                                                <TableCell align="left">{row.activity}</TableCell>
                                                                <TableCell align="left">{row.selected_time}</TableCell>
                                                                <TableCell align="left"><div className='sheduleList'>{row.selected_days.map((val, i) => {
                                                                    return (
                                                                        <div key={i} className={`${val.value === 1 ? "sheduleOptions" : "sheduleOptionsBlur"}`}><p className='sheduleValues'>{val.day[0]}</p></div>
                                                                    )
                                                                })}</div>
                                                                </TableCell>
                                                                <TableCell align="left">{`${row.is_reminder === 1 ? "Yes" : "No"}`}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>}
                                </Paper>
                            </Box>
                        </div >
                    </div >}
                </div>
            </div>
        </AppContainer >
    )
}

export default ViewGuestUser
