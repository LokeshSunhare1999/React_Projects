import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as textMessage from "../../Config/Constant";
import redCross from "../../assets/images/CommonComponent/redCross.svg";
import Geentick from '../../assets/images/CommonComponent/Geentick.svg';
import AppContainer from '../../components/AppContainer/AppContainer';
import { updateProfile } from '../../redux/actions/AuthAction/updateProfileAction';
import { viewAdminProfile } from '../../redux/actions/AuthAction/viewAdminProfileAction';
import { createNotification } from '../../Config/NotificationToast';
import './AdminProfile.scss';

const AdminProfile = (props) => {
    const userData = JSON.parse(localStorage.getItem('UserData'));
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [showMatchMsg, setShowMatchMsg] = useState(false);
    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const { history } = props;
    const dispatch = useDispatch();
    const updateProfileDataRes = useSelector(state => state.updateProfile);
    const viewProfileDataRes = useSelector(state => state.viewAdminProfile.profile_Data);

    useEffect(() => {
        dispatch(viewAdminProfile("data"));
    }, [])

    useEffect(() => {
        if (viewProfileDataRes && viewProfileDataRes.message === textMessage.PROFILE_DETAILS_FETCHED_SUCCESSFULLY) {
            localStorage.setItem("UserData", JSON.stringify({
                ...userData, first_name: viewProfileDataRes?.data.first_name, last_name: viewProfileDataRes?.data.last_name,
                email_id: viewProfileDataRes?.data.email_id
            }))
        }
    }, [viewProfileDataRes])

    useEffect(() => {
        if (updateProfileDataRes.updateProfile?.data?.updated === 0 && updateProfileDataRes.updateProfile?.data?.password_reset === 0) {
            localStorage.setItem("UserData", JSON.stringify({ ...userData, first_name: updateProfileDataRes.updateProfile?.data.first_name, last_name: updateProfileDataRes.updateProfile?.data.last_name }))
            cancelProfileData();
            createNotification('success', textMessage.YOU_FIRST_NAME_HAS_BEEN_UPDATED);
        }
        else if (updateProfileDataRes.updateProfile?.data?.updated === 1 && updateProfileDataRes.updateProfile?.data?.password_reset === 0) {
            localStorage.setItem("UserData", JSON.stringify({ ...userData, first_name: updateProfileDataRes.updateProfile?.data.first_name, last_name: updateProfileDataRes.updateProfile?.data.last_name }))

            cancelProfileData();
            createNotification('success', textMessage.YOU_LAST_NAME_HAS_BEEN_UPDATED);
        }
        else if (updateProfileDataRes.updateProfile?.data?.updated === 2 && updateProfileDataRes.updateProfile?.data?.password_reset === 0) {
            localStorage.setItem("UserData", JSON.stringify({ ...userData, first_name: updateProfileDataRes.updateProfile?.data.first_name, last_name: updateProfileDataRes.updateProfile?.data.last_name }))

            cancelProfileData();
            createNotification('success', textMessage.YOU_FIRST_AND_LAST_NAME_HAS_BEEN_UPDATED);
        } else if (updateProfileDataRes.updateProfile?.data?.updated === "" && updateProfileDataRes.updateProfile?.data?.password_reset === 1) {
            localStorage.setItem("UserData", JSON.stringify({ ...userData, first_name: updateProfileDataRes.updateProfile?.data.first_name, last_name: updateProfileDataRes.updateProfile?.data.last_name }))

            cancelProfileData();
            createNotification('success', textMessage.PASSWORD_CHANGE_SUCCESSFULLY);
        } else if (updateProfileDataRes.updateProfile?.data?.updated !== "" && updateProfileDataRes.updateProfile?.data?.password_reset === 1) {
            localStorage.setItem("UserData", JSON.stringify({ ...userData, first_name: updateProfileDataRes.updateProfile?.data.first_name, last_name: updateProfileDataRes.updateProfile?.data.last_name }))

            cancelProfileData();
            createNotification('success', updateProfileDataRes.updateProfile.message);
        }
    }, [updateProfileDataRes])

    useEffect(() => {
        if (confirmPassword !== "" && newPassword !== confirmPassword) {
            setShowMatchMsg(true);
        } else {
            setShowMatchMsg(false);
        }
        if (newPassword !== "") {
            const regex = textMessage.PASSWORD_REGEX;
            const mailFormat = regex.test(newPassword);
            if (!mailFormat) {
                setShowErrorMsg(true);
            } else {
                setShowErrorMsg(false);
            }
        }
    }, [newPassword, confirmPassword])

    const updateProfileData = () => {
        if (!showErrorMsg) {
            const sendRequest = {
                first_name: firstName,
                last_name: lastName,
                current_password: oldPassword,
                password: newPassword,
                confirm_password: confirmPassword,
                password_reset: oldPassword !== "" && newPassword !== "" && confirmPassword !== "" ? 1 : 0
            };
            dispatch(updateProfile(sendRequest));
        }
    }

    const validateChanges = (firstName,
        lastName,
        oldPassword,
        newPassword,
        confirmPassword) => {
        let hasNameChanges = false;
        const prevFirstName = userData.first_name;
        const prevLastName = userData.last_name;
        if (firstName !== prevFirstName || lastName !== prevLastName) {
            hasNameChanges = true;
        }
        const hasPasswordChanges = oldPassword !== "" && newPassword !== "" && confirmPassword !== "";
        return {
            hasNameChanges,
            hasPasswordChanges
        };
    }
    const { hasNameChanges, hasPasswordChanges } = validateChanges(
        firstName,
        lastName,
        oldPassword,
        newPassword,
        confirmPassword
    );

    const toggleOldPasswordVisibility = () => {
        setOldPasswordVisible(!oldPasswordVisible);
    }

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }

    const cancelProfileData = () => {
        const userData = JSON.parse(localStorage.getItem('UserData'));
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setOldPasswordVisible(false);
        setNewPasswordVisible(false);
        setConfirmPasswordVisible(false);
    }

    const handleFirstnameChange = (val) => {
        const regex = textMessage.NAME_REGEX;;
        const nameFormat = regex.test(val);
        if (nameFormat && val.length < 12) {
            setFirstName(val);
        }
    }

    const handleLastnameChange = (val) => {
        const regex = textMessage.NAME_REGEX;;
        const nameFormat = regex.test(val);
        if (nameFormat && val.length < 12) {
            setLastName(val);
        }
    }

    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='AdminProfile'>
                    <div className="card">
                        <div className="card-header">
                            <h4 className='mb-0'>Edit Profile</h4>
                            {(hasNameChanges || hasPasswordChanges) && (<div className=''>
                                <button type="button" className="btn btn-danger redButton mr-3" onClick={cancelProfileData}>
                                    <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                    CANCEL</button>
                                <button type="button" className="btn btn-success greenButton " onClick={updateProfileData}>
                                    <img className="mainIcon mr-2" src={Geentick} alt="" width="16px" height="16px" />
                                    UPDATE</button>
                            </div>)}
                        </div>
                        <div className="separator"></div>
                        <div className="card-body ">
                            <div className='row cardDiv'>
                                <div className='col'>
                                    <div className='d-flex'>
                                        <div className="mb-3 pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">First Name</label>
                                            <input
                                                className="form-control Title"
                                                type="text"
                                                value={firstName}
                                                placeholder="Enter first name"
                                                onChange={(event) => handleFirstnameChange(event.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3 d-flex ml-4">
                                            <div className="mb-3 pr-0">
                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Last Name</label>
                                                <input
                                                    className="form-control Title"
                                                    type="text"
                                                    placeholder="Enter last name"
                                                    value={lastName}
                                                    onChange={(event) => handleLastnameChange(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-floating col mb-4">
                                        <label htmlFor="floatingSelect" className="form-label Label">Email Address</label>
                                        <input
                                            className="form-control Title"
                                            type="email"
                                            placeholder="Example@gmail.com"
                                            value={userData.email_id}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="SecondSeparator"></div>
                            <div className="CardHeaderSec">
                                <h4>Reset Password</h4>
                            </div>
                            <div className='row cardDiv'>
                                <div className='col'>
                                    <div className="form-floating col ">
                                        <label htmlFor="floatingSelect" className="form-label Label">Old Password</label>
                                        <input
                                            className="form-control Title"
                                            type={oldPasswordVisible ? "text" : "password"}
                                            value={oldPassword}
                                            placeholder="Enter old password"
                                            onChange={(event) => setOldPassword(event.target.value)}
                                        />
                                        <i className={!oldPasswordVisible ? "fas fa-eye-slash password-toggle-icon" : "fas fa-eye password-toggle-icon"} onClick={toggleOldPasswordVisibility} />
                                    </div>
                                    <div className='d-flex'>
                                        <div className="pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">New Password</label>
                                            <input
                                                className="form-control Title"
                                                type={newPasswordVisible ? "text" : "password"}
                                                value={newPassword}
                                                placeholder="Enter new password"
                                                onChange={(event) => setNewPassword(event.target.value)}
                                            />
                                            <i className={!newPasswordVisible ? "fas fa-eye-slash password-toggle-icon" : "fas fa-eye password-toggle-icon"} onClick={toggleNewPasswordVisibility} />
                                        </div>
                                        <div className="d-flex ml-4">
                                            <div className="pr-0">
                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Confirm Password</label>
                                                <input
                                                    className="form-control Title"
                                                    type={confirmPasswordVisible ? "text" : "password"}
                                                    value={confirmPassword}
                                                    placeholder="Enter Confirm Password"
                                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                                />
                                                <i className={!confirmPasswordVisible ? "fas fa-eye-slash password-toggle-icon" : "fas fa-eye password-toggle-icon"} onClick={toggleConfirmPasswordVisibility} />
                                            </div>
                                        </div>
                                    </div>
                                    {showErrorMsg && <div className="form-floating col">
                                        <p className='Description'>*At least 8 characters long, with at least one capital letter, one lowercase letter,<br /> one special character, and one numeric character</p>
                                    </div>}
                                    {showMatchMsg && <div className="form-floating col">
                                        <p className='Description'>*New password and confirm password do not match</p>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer >
    )
}
export default AdminProfile
