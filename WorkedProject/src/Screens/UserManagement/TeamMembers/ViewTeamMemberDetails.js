import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import * as routes from "../../../Router/RoutesURL";
import { useSelector, useDispatch } from 'react-redux';
import { createNotification } from '../../../Config/NotificationToast';
import dummyGuestProfile from '../../../assets/images/CommonComponent/dummyGuestProfile.png';
import AppContainer from '../../../components/AppContainer/AppContainer';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { viewTeamMemberDetails } from '../../../redux/actions/UserManagementAction/TeamMembersAction/TeamMembersAction';
import './ViewTeamMemberDetails.scss';

const ViewTeamMemberDetails = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState("");
    const [memberDetails, setMemberDetails] = useState([]);
    const { history } = props;
    const navigate = useNavigate();
    const viewMemberDetailsRes = useSelector(state => state.viewTeamMemberDetails.viewTeamMemberDetails);
    const { selectedMemberId, userStatus, selectedRoleTitle, permission } = location.state;
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];
    useEffect(() => {
        if (selectedMemberId) {
            setSelectedStatus(userStatus);
            const sendRequest = {
                "user_id": selectedMemberId,
                "user_type": selectedRoleTitle
            };
            dispatch(viewTeamMemberDetails(sendRequest));
        }
    }, [])

    useEffect(() => {
        if (viewMemberDetailsRes && viewMemberDetailsRes) {
            setMemberDetails(viewMemberDetailsRes?.data);
        }
    }, [viewMemberDetailsRes])

    const handleChangeOption = (e) => {
        if (permission === "write") {
            setSelectedStatus(e.value === "Active" ? 1 : 0);
            const sendRequest = {
                "feature_type": selectedRoleTitle == "admin" ? "admin" : "user",
                "id": selectedMemberId,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }
    const showEditMember = (e) => {
        if (permission === "write") {
            localStorage.setItem('add', false)
            navigate(routes.ADD_MEMBER, { state: { selectedMemberId, selectedRoleTitle, selection: "edit" } })
        } else {
            createNotification('warning', "Access Restricted");
        }
    }
    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='ViewTeamMember'>
                    {memberDetails && <div className="card">
                        <div className="card-header">
                            <h4 className='programTitle'>{memberDetails.first_name} {memberDetails.last_name}</h4>
                            <div className='ButtonsDiv'>
                                <button className='editButtonGuest' onClick={showEditMember}>
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
                        </div>
                        <div className="separator"></div>
                        <div className="card-body detailsDataPro">
                            <div className='DecDiv'>
                                <ul className="list-group FirstGroup">
                                    <li className="list-group-item">MOBILE NO.:</li>
                                    <li className="list-group-item">EMAIL ADDRESS:</li>
                                    <li className="list-group-item">USER ROLE:</li>
                                    <li className="list-group-item">ADDED ON:</li>
                                    <li className="list-group-item">DATE OF BIRTH:</li>
                                    <li className="list-group-item">GENDER:</li>
                                </ul>
                                <ul className="list-group SecondGroup">
                                    <li className="list-group-item levelText">{memberDetails?.phone_number ? memberDetails?.phone_number : ""}</li>
                                    <li className="list-group-item">{memberDetails?.email_id ? memberDetails?.email_id : ""}</li>
                                    <li className="list-group-item">{memberDetails?.role_title ? memberDetails?.role_title : ""}</li>
                                    <li className="list-group-item">{memberDetails?.registration_datetime ? memberDetails?.registration_datetime : ""}</li>
                                    <li className="list-group-item">{memberDetails.date_of_birth ? memberDetails.date_of_birth : ""}{memberDetails.age ? <p className='ageText'>(  {memberDetails.age} years )</p> : ""}</li>
                                    <li className="list-group-item">{memberDetails.gender ? memberDetails.gender : ""}</li>
                                </ul>
                            </div>
                            <div className='DecDiv'>
                                <div className="list-group">
                                    <div className='imgDivText'>
                                        <p className='titleText'>
                                            PROFILE PICTURE
                                        </p>
                                        {memberDetails && memberDetails.first_name && <img className="mainImgPro" src={dummyGuestProfile} alt="" width="60px" height="60px" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >}
                </div>
            </div>
        </AppContainer >
    )
}

export default ViewTeamMemberDetails
