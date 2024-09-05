import React, { useState, useEffect } from 'react';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import * as textMessage from "../../../Config/Constant";
import redCross from "../../../assets/images/CommonComponent/redCross.svg";
import greenPlus from '../../../assets/images/CommonComponent/greenPlus.svg';
import AppContainer from '../../../components/AppContainer/AppContainer';
import * as routes from "../../../Router/RoutesURL";
import { useNavigate } from 'react-router-dom';
import { addNewGuest } from '../../../redux/actions/UserManagementAction/GuestUserAction/GuestUserAction';
import { useSelector, useDispatch } from 'react-redux';
import { createNotification } from '../../../Config/NotificationToast';
import './AddUser.scss';

const AddUser=(props)=> {
    const { history } = props;
    const [phoneNo, setPhoneNo] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [showBtns, setShowBtns] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const viewGuestListDat = useSelector(state => state.addNewGuest);
    const viewGuestListDataRes = useSelector(state => state.addNewGuest.addNewGuestUser);
    useEffect(() => {
        if (firstName !== "" && lastName !== "" && emailId !== "" && phoneNo !== "") {
            setShowBtns(true);
        } else {
            setShowBtns(false);
        }
    }, [firstName, lastName, emailId, phoneNo])

    useEffect(() => {
        if (viewGuestListDat.error === null && viewGuestListDataRes.message === "New guest user added successfully") {
            navigate(routes.USER_MANAGEMENT, { state: { selectedTab: "GuestUser" } })
        }
    }, [viewGuestListDat, viewGuestListDataRes])

    const handleOnChange = (value, country) => {
        if (value.startsWith(country.dialCode)) {
            value = value.substring(country.dialCode.length);
        }
        setPhoneNo("+" + country.dialCode + - + value)
    };

    const cancelSubmit = () => {
        setShowBtns(false);
        setPhoneNo('');
        setFirstName('');
        setLastName('');
        setEmailId('');
    };

    const submitData = () => {
        if (firstName !== "" || lastName !== "" || emailId !== "" || phoneNo !== "") {
            const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            if (!validEmail.test(emailId)) {
                createNotification('warning', 'Please Enter Valid Email*');
                return false;
            }
            const sendRequest = {
                "first_name": firstName,
                "last_name": lastName,
                "email_id": emailId,
                "phone_no": phoneNo,
                "user_role_id": 1
            };
            dispatch(addNewGuest(sendRequest));
            setShowBtns(false);
            setPhoneNo('');
            setFirstName('');
            setLastName('');
            setEmailId('');
        }
    }

    const handleChangeFname = (val) => {
        const regexName = textMessage.NAME_REGEX;;
        const nameFormat = regexName.test(val);
        if (val === "") {
            setFirstName(val);
        } else if (nameFormat && val.length < 12) {
            setFirstName(val);
        }
    }

    const handleChangeLname = (val) => {
        const regexName = textMessage.NAME_REGEX;;
        const nameFormat = regexName.test(val);
        if (val === "") {
            setLastName(val);
        } else if (nameFormat && val.length < 12) {
            setLastName(val);
        }
    }
    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='AddUser'>
                    <div className="card">
                        <div className="card-header">
                            <h4 className='mb-0'>Add New User</h4>
                            {showBtns && (<div className=''>
                                <button type="button" className="btn btn-danger redButton mr-3" onClick={cancelSubmit}>
                                    <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                    CANCEL</button>
                                <button type="button" className="btn btn-success greenButton " onClick={submitData}>
                                    <img className="mainIcon mr-2" src={greenPlus} alt="" width="16px" height="16px" />
                                    ADD</button>
                            </div>)}
                        </div>
                        <div className="separator"></div>
                        <div className="card-body ">
                            <div className='row cardDiv'>
                                <div className='col'>
                                    <div className='d-flex'>
                                        <div className="mb-3 pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">First Name*</label>
                                            <input
                                                className="form-control Title"
                                                type="text"
                                                value={firstName}
                                                placeholder="Enter first name"
                                                onChange={(event) => handleChangeFname(event.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3 d-flex ml-4">
                                            <div className="mb-3 pr-0">
                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Last Name*</label>
                                                <input
                                                    className="form-control Title"
                                                    type="text"
                                                    placeholder="Enter last name"
                                                    value={lastName}
                                                    onChange={(event) => handleChangeLname(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className="mb-3 pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Mobile No.*</label>
                                            <div className="mb-3 pr-0 d-flex phoneNoInput">
                                                <PhoneInput
                                                    inputExtraProps={{
                                                        required: true,
                                                        autoFocus: false,
                                                    }}
                                                    className="registerInputType"
                                                    country={'us'}
                                                    value={phoneNo}
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3 d-flex ml-4">
                                            <div className="mb-3 pr-0">
                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Email Address*</label>
                                                <input
                                                    className="form-control Title"
                                                    type="text"
                                                    placeholder="Enter email address"
                                                    value={emailId}
                                                    onChange={(event) => setEmailId(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer >
    )
}
export default AddUser
