import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PhoneInput from "react-phone-input-2";
import DatePicker from 'react-datepicker'
import Select from "react-select";
import { format } from "date-fns";
import { FormGroup } from "reactstrap";
import calendarIcon from '../../../assets/images/CommonComponent/calendarIcon.png';
import redCross from "../../../assets/images/CommonComponent/redCross.svg";
import greenPlus from '../../../assets/images/CommonComponent/greenPlus.svg';
import AppContainer from '../../../components/AppContainer/AppContainer';
import * as routes from "../../../Router/RoutesURL";
import * as textMessage from "../../../Config/Constant";
import { updateGuestDetails, viewGuestUserDetails } from '../../../redux/actions/UserManagementAction/GuestUserAction/GuestUserAction';
import { useSelector, useDispatch } from 'react-redux';
import { createNotification } from '../../../Config/NotificationToast';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-input-2/lib/style.css'
import './EditGuestUser.scss';

const EditGuestUser = (props) => {
    const location = useLocation();
    const { selectedUserId } = location.state;
    const { history } = props;
    const [phoneNo, setPhoneNo] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [showBtns, setShowBtns] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate()
    const programsListDataRes = useSelector(state => state.viewGuestUserDetails?.viewGuestDetailsRes?.data.ananda_programs);
    const viewGuestListDataRes = useSelector(state => state.viewGuestUserDetails?.viewGuestDetailsRes?.data?.customer_data[0]);
    const updateGuestDetailRes = useSelector(state => state.updateGuestDetails?.updateUserDetailsRes);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedUserId) {
            const sendRequest = {
                "user_id": selectedUserId,
            };
            dispatch(viewGuestUserDetails(sendRequest));
        }
    }, [])

    useEffect(() => {
        if (updateGuestDetailRes?.message === "User details update successfully" && updateGuestDetailRes?.statusCode === 200) {
            const sendRequest = {
                "user_id": selectedUserId,
            };
            dispatch(viewGuestUserDetails(sendRequest));
        }
    }, [updateGuestDetailRes])

    useEffect(() => {
        if (programsListDataRes && viewGuestListDataRes) {
            const selectedPro = programsListDataRes.find(item => item.is_selected === 1);
            setPhoneNo(viewGuestListDataRes.phone_number);
            setFirstName(viewGuestListDataRes.first_name);
            setLastName(viewGuestListDataRes.last_name);
            setEmailId(viewGuestListDataRes.email_id);
            setSelectedProgram({ label: selectedPro?.title, value: selectedPro, key: selectedPro?.id });
            setStartDate(viewGuestListDataRes.start_date);
            setEndDate(viewGuestListDataRes.end_date);
        }
    }, [viewGuestListDataRes])

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 7);
        const todayFormatted = format(today, "MM/dd/yyyy");
        const tomorrowFormatted = format(tomorrow, "MM/dd/yyyy");
        setStartDate(todayFormatted);
        setEndDate(tomorrowFormatted);
    }, [])

    useEffect(() => {
        const selectedPro = programsListDataRes?.find(item => item.is_selected === 1);
        if (firstName !== viewGuestListDataRes?.first_name
            || lastName !== viewGuestListDataRes?.last_name
            || emailId !== viewGuestListDataRes?.email_id
            || phoneNo !== viewGuestListDataRes?.phone_number
            || selectedProgram.label !== selectedPro?.title
            || startDate !== viewGuestListDataRes?.start_date
            || endDate !== viewGuestListDataRes?.end_date
        ) {
            setShowBtns(true);
        } else {
            setShowBtns(false);
        }
    }, [firstName, lastName, emailId, phoneNo, startDate, endDate, selectedProgram])

    const handleChangeProgram = (e) => {
        setSelectedProgram({ label: e.value.title, value: e, key: e.value.id });
    }

    const handleOnChange = (value, country) => {
        if (value.startsWith(country.dialCode)) {
            value = value.substring(country.dialCode.length);
        }
        setPhoneNo("+" + country.dialCode + - + value)
    };

    const cancelSubmit = () => {
        setShowBtns(false);
        if (viewGuestListDataRes) {
            const selectedPro = programsListDataRes.find(item => item.is_selected === 1);
            setPhoneNo(viewGuestListDataRes.phone_number);
            setFirstName(viewGuestListDataRes.first_name);
            setLastName(viewGuestListDataRes.last_name);
            setEmailId(viewGuestListDataRes.email_id);
            setSelectedProgram({ label: selectedPro.title, value: selectedPro, key: selectedPro.id });
            setStartDate(viewGuestListDataRes.start_date);
            setEndDate(viewGuestListDataRes.end_date);
        }
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
                "phone_number": phoneNo,
                "user_id": selectedUserId,
                "start_date": startDate,
                "end_date": endDate,
                "program_id": JSON.stringify(selectedProgram.key)
            };
            dispatch(updateGuestDetails(sendRequest));
            setShowBtns(false);
            navigate(routes.USER_MANAGEMENT, { state: { selectedTab: "GuestUser" } })
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

    const handleChangeStartDate = (val) => {
        const startFormatted = format(val, "MM/dd/yyyy");
        setStartDate(startFormatted)
    }

    const handleChangeEndDate = (val) => {
        const endFormatted = format(val, "MM/dd/yyyy");
        setEndDate(endFormatted)
    }


    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='AddUser'>
                    <div className="card">
                        <div className="card-header">
                            <h4 className='mb-0'>Edit User</h4>
                            {firstName && showBtns && (<div className=''>
                                <button type="button" className="btn btn-danger redButton mr-3" onClick={cancelSubmit}>
                                    <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                    CANCEL</button>
                                <button type="button" className="btn btn-success greenButton " onClick={submitData}>
                                    <img className="mainIcon mr-2" src={greenPlus} alt="" width="16px" height="16px" />
                                    ADD</button>
                            </div>)}
                        </div>
                        <div className="separator"></div>
                        {viewGuestListDataRes && <div className="card-body ">
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
                                    <div className='d-flex'>
                                        <div className="mb-3 pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Program</label>
                                            <div className="mb-3 pr-0 d-flex GuestUserProgramDiv">
                                                <FormGroup className="FormGroup has-float-label class-menu-dropdown ">
                                                    <Select
                                                        placeholder={selectedProgram.key === undefined ? "Select Program" : ""}
                                                        className="react-select"
                                                        classNamePrefix="react-select"
                                                        value={selectedProgram.key === undefined ? {
                                                            label: "Select Program",
                                                            value: "Select Program",
                                                            key: "Select Program"
                                                        } : selectedProgram}
                                                        options={programsListDataRes?.map((guest, index) => {
                                                            return {
                                                                label: guest.title,
                                                                value: guest,
                                                                key: index
                                                            };
                                                        })}

                                                        onChange={handleChangeProgram}
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
                                            </div>
                                        </div>

                                    </div>
                                    <div className='d-flex'>
                                        <div className="mb-3 pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Start Date</label>
                                            <div className='dateBlock'>
                                                {startDate == "" ?
                                                    <div className="dayDateTextDiv" ><p className="dayDateTextPlaceholder">Select date</p></div>
                                                    : <div className="dayDateTextDiv" ><p className="dayDateText">{startDate}</p></div>
                                                }
                                                <div className='datePickerDiv'>
                                                    <DatePicker
                                                        minDate={new Date()}
                                                        onChange={date => { handleChangeStartDate(date) }}
                                                        customInput={
                                                            <img src={calendarIcon} className="calIcon" alt="" />
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 d-flex ml-4">
                                            <div className="mb-3 pr-0">
                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">End Date</label>
                                                <div className='dateBlock'>
                                                    {endDate == "" ?
                                                        <div className="dayDateTextDiv" ><p className="dayDateTextPlaceholder">Select date</p></div>
                                                        : <div className="dayDateTextDiv" ><p className="dayDateText">{endDate}</p></div>
                                                    }
                                                    <div className='datePickerDiv'>
                                                        <DatePicker
                                                            minDate={new Date()}
                                                            onChange={date => { handleChangeEndDate(date) }}
                                                            customInput={
                                                                <img src={calendarIcon} className="calIcon" alt="" />
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </AppContainer >
    )
}
export default EditGuestUser
