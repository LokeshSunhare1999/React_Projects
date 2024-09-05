import React, { useState, useEffect } from 'react';
import * as routes from "../../../Router/RoutesURL";
import * as textMessage from "../../../Config/Constant";
import redCross from "../../../assets/images/CommonComponent/redCross.svg";
import greenPlus from '../../../assets/images/CommonComponent/greenPlus.svg';
import Geentick from '../../../assets/images/CommonComponent/Geentick.svg';
import AppContainer from '../../../components/AppContainer/AppContainer';
import './AddMember.scss';
import Select from "react-select";
import { addNewTeamMember, getUserRoleList, viewTeamMemberDetails, updateTeamMemberDetails } from '../../../redux/actions/UserManagementAction/TeamMembersAction/TeamMembersAction';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

const AddMember=(props)=> {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
    })
    const { history } = props;
    const location = useLocation();
    const selectionType = location?.state?.selection
    const dispatch = useDispatch();
    const { firstName, lastName, email } = state;
    const [userListRole, setUserListRole] = useState(null);
    const [userRoleID, setUserRoleID] = useState();
    const [userRoleTitle, setUserRoleTitle] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [fnames, setFnames] = useState("");
    const [lnames, setLnames] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newRoleID, setNewRoleID] = useState("");
    const [newRoleTitle, setNewRoleTitle] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [formErrorsForEdit, setFormErrorsForEdit] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [somChange, setSomChange] = useState();
    const getUserList = useSelector(state => state?.getUserRoleList?.getUserRoleList);
    const TeamMemberListData = getUserList?.data?.user_role_list;

    const navigate = useNavigate()

    useEffect(() => {
        if (selectionType === "edit") {
            const sendRequest = {
                "user_id": location?.state?.selectedMemberId,
                "user_type": location?.state?.selectedRoleTitle
            };
            dispatch(viewTeamMemberDetails(sendRequest));
        }
    }, []);

    const viewTeamMember = useSelector(state => state?.viewTeamMemberDetails?.viewTeamMemberDetails);
    const viewTeamMemberDetailsData = viewTeamMember?.data;

    useEffect(() => {
        const sendRequest = {
            "pageNo": 1,
            "pageSize": "",
        }
        dispatch(getUserRoleList(sendRequest));
    }, []);

    useEffect(() => {
        if (TeamMemberListData) {
            const data = TeamMemberListData?.map((item) => ({
                ...item,
                value: item.role_title,
            }));
            setUserListRole(data);
        } else {
            setUserListRole([]);
        }
    }, [TeamMemberListData, userRoleID]);

    const handleChanges = (value, country) => {
        if (value.startsWith(country.dialCode)) {
            value = value.substring(country.dialCode.length);
        }
        setPhoneNumber("+" + country.dialCode + - + value)
        setFormErrorsForEdit(validateEdit(state));
    }

    useEffect(() => {
        if (viewTeamMemberDetailsData && selectionType === "edit") {
            setFnames(viewTeamMember?.data?.first_name)
            setLnames(viewTeamMember?.data?.last_name)
            setNewEmail(viewTeamMember?.data?.email_id)
            setPhoneNumber(viewTeamMember?.data?.phone_number)
            setNewRoleID(viewTeamMember?.data?.role_id)
            setNewRoleTitle({ label: viewTeamMember?.data?.role_title, value: viewTeamMember?.data?.role_title, key: viewTeamMember?.data?.role_id })
        }
    }, [viewTeamMemberDetailsData]);

    const handleChange = (e) => {
        if (e?.target?.name != undefined) {
            let { name, value } = e.target;
            setState({ ...state, [name]: value });
            setIsSubmit(true);
        }
    };

    const handleSubmit = (e) => {
        if (phoneNumber == "" || newEmail !== "" || fnames !== "" || lnames !== "" || newRoleTitle !== "") {
            setFormErrorsForEdit(validateEdit(state));
        }
        setIsSubmit(true);
        if (selectionType === "edit") {
            e.preventDefault();
            setFormErrorsForEdit(validateEdit(state));
            setIsSubmit(true);
            if (Object.keys(formErrorsForEdit).length === 0 && isSubmit) {
                const sendRequest = {
                    "first_name": fnames,
                    "last_name": lnames,
                    "email_id": newEmail,
                    "phone_number": phoneNumber,
                    "user_id": location?.state?.selectedMemberId,
                    "role_id": newRoleID,

                    "role_title": newRoleTitle?.value,
                };
                dispatch(updateTeamMemberDetails(sendRequest, navigate));
            }
        }

        if (selectionType === "add") {
            if (state.email !== "" || phoneNumber == "" || userRoleTitle !== "") {
                setFormErrors(validate(state));
            }
            e.preventDefault();
            setFormErrors(validate(state));
            setIsSubmit(true);

            if (Object.keys(formErrors).length === 0 && isSubmit) {
                const sendRequest = {
                    "first_name": state.firstName,
                    "last_name": state.lastName,
                    "email_id": state.email,
                    "phone_no": phoneNumber,
                    "user_role_id": userRoleID
                };
                dispatch(addNewTeamMember(sendRequest));
                setState(state.firstName = "");
                setState(state.lastName = "");
                setState({ ...state, "email": "" });
                setPhoneNumber("")
                setUserRoleTitle("")
            }
            if (!firstName || !lastName || !email || !phoneNumber) {
                return;
            }
        }
    }

    const handleChangeFname = (val) => {
        const regexName = textMessage.NAME_REGEX;;
        const nameFormat = regexName.test(val);
        if (val === "") {
            setState({ ...state, "firstName": val });
        } else if (nameFormat && val.length < 12) {
            setState({ ...state, "firstName": val });
        }
    }

    const handleChangeLname = (val) => {
        const regexName = textMessage.NAME_REGEX;;
        const nameFormat = regexName.test(val);
        if (val === "") {
            setState({ ...state, "lastName": val });
        } else if (nameFormat && val.length < 12) {
            setState({ ...state, "lastName": val });
        }
    }

    const handleChangeLevel = (e) => {
        setUserRoleID(e.id)
        setNewRoleID(e.key)
        setUserRoleTitle(e)
        setNewRoleTitle(e)
        setSomChange(true)
    }

    const validate = (values) => {
        const errors = {};
        const regex = textMessage.EMAIL_REGEX;
        const PhoneRegex = textMessage.PHONE_REGEX;
        if (!values.email) {
            errors.email = textMessage.EMAIL_IS_REQUIRED;
        } else if (!regex.test(values.email)) {
            errors.email = textMessage.THIS_IS_NOT_A_VALID_EMAIL_FORMAT;
        }
        if (phoneNumber == "") {
            errors.phoneNumber = textMessage.PHONE_NUMBER_IS_REQUIRED;
        } else if (!PhoneRegex.test(phoneNumber)) {
            errors.phoneNumber = textMessage.THIS_IS_NOT_A_VALID_PHONE_NUMBER_FORMAT;
        } if (userRoleTitle == "") {
            errors.userRoleTitle = textMessage.USER_ROLE_IS_REQUIRED;
        }
        return errors;
    };

    const validateEdit = () => {
        const errorsForEdit = {};
        const regex = textMessage.EMAIL_REGEX;
        if (newEmail == "") {
            errorsForEdit.newEmail = textMessage.EMAIL_IS_REQUIRED;
        } else if (!regex.test(newEmail)) {
            errorsForEdit.newEmail = textMessage.THIS_IS_NOT_A_VALID_EMAIL_FORMAT;
        }
        if (fnames == "") {
            errorsForEdit.fnames = textMessage.FIRST_NAME_IS_REQUIRED;
        }
        if (lnames == "") {
            errorsForEdit.lnames = textMessage.LAST_NAME_IS_REQUIRED;
        } if (newRoleTitle == "") {
            errorsForEdit.newRoleTitle = textMessage.USER_ROLE_IS_REQUIRED;
        }
        return errorsForEdit;
    };

    const goBack = (e) => {
        if (selectionType === "add") {
            setState(state.firstName = "");
            setState(state.lastName = "");
            setState({ ...state, "email": "" });
            setPhoneNumber("")
            setUserRoleTitle("")
            navigate(routes.USER_MANAGEMENT, { state: { selectedTab: "TeamMembers", path: "add" } })
        }

        if (selectionType === "edit") {
            navigate(routes.USER_MANAGEMENT, { state: { selectedTab: "TeamMembers", path: "add" } })
        }
    };

    return (
        <AppContainer history={history}>
            <div className="event-content">
                {selectionType === "add" ?
                    <>
                        <div className='AddMember'>
                            <form className="" onSubmit={handleSubmit} >
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className='mb-0'>Add New Member</h4>
                                        {firstName !== '' && lastName !== '' && email !== '' && phoneNumber !== "" && userRoleTitle !== "" ? <div className=''>
                                            <button type="button" className="btn btn-danger redButton mr-3" onClick={goBack}>
                                                <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                                CANCEL</button>
                                            <button type="submit" className="btn btn-success greenButton">
                                                <img className="mainIcon mr-2" src={greenPlus} alt="" width="16px" height="16px" />
                                                ADD</button>
                                        </div> : " "}
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
                                                            name='firstName'
                                                            value={firstName}

                                                            onChange={(event) => handleChangeFname(event.target.value)}
                                                            placeholder="Enter first name"

                                                        />
                                                        <div id='emailError' className='small'>{formErrors.firstName}</div>
                                                    </div>
                                                    <div className="mb-3 d-flex ml-4">
                                                        <div className="mb-3 pr-0">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Last Name</label>
                                                            <input
                                                                className="form-control Title"
                                                                type="text"
                                                                placeholder="Enter last name"
                                                                name='lastName'
                                                                value={lastName}
                                                                onChange={(event) => handleChangeLname(event.target.value)}

                                                            />
                                                            <div id='emailError' className='small'>{formErrors.lastName}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className="mb-3 pr-0">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label Label">Mobile No.</label>
                                                        <div className="mb-3 pr-0  MobileDiv">
                                                            <PhoneInput
                                                                inputExtraProps={{
                                                                    required: true,
                                                                    autoFocus: false,
                                                                }}
                                                                className="registerInputType"
                                                                country={'in'}
                                                                placeholder="Mobile number"
                                                                value={phoneNumber}
                                                                onChange={handleChanges}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.phoneNumber}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 d-flex ml-4">
                                                        <div className="mb-3 pr-0">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Email Address</label>
                                                            <input
                                                                className="form-control Title"
                                                                type="email"
                                                                placeholder="Enter email address"
                                                                value={email}
                                                                name='email'

                                                                onChange={handleChange}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.email}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className="mb-3 pr-0">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label Label">Select User Role</label>
                                                        <Select

                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            value={userRoleTitle}
                                                            required={true}
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
                                                        <div id='emailError' className='small'>{formErrors.userRoleTitle}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                    :
                    //------------For Edit------------
                    <>
                        <div className='AddMember'>
                            <form className="" onSubmit={handleSubmit} >
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className='mb-0'>Edit Member</h4>
                                        {somChange == true ? <div className=''>
                                            <button type="button" className="btn btn-danger redButton mr-3" onClick={goBack}>
                                                <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                                CANCEL</button>
                                            <button type="submit" className="btn btn-success greenButton">
                                                <img className="mainIcon mr-2" src={Geentick} alt="" width="16px" height="16px" />
                                                UPDATE</button>
                                        </div> : " "}
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
                                                            name='firstName'
                                                            value={fnames}
                                                            onChange={(e) => { setFnames(e.target.value); setSomChange(true); setIsSubmit(true) }}
                                                            placeholder="Enter first name"
                                                        />
                                                        <div id='emailError' className='small'>{formErrorsForEdit.fnames}</div>
                                                    </div>
                                                    <div className="mb-3 d-flex ml-4">
                                                        <div className="mb-3 pr-0">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Last Name</label>
                                                            <input
                                                                className="form-control Title"
                                                                type="text"
                                                                placeholder="Enter last name"
                                                                name='lastName'
                                                                value={lnames}
                                                                onChange={(e) => { setLnames(e.target.value); setSomChange(true); setIsSubmit(true) }}
                                                            />
                                                            <div id='emailError' className='small'>{formErrorsForEdit.lnames}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className="mb-3 pr-0">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label Label">Mobile No.</label>
                                                        <div className="mb-3 pr-0 d-flex MobileDiv">
                                                            <PhoneInput
                                                                className="registerInputType"
                                                                country={'in'}
                                                                value={phoneNumber}
                                                                onChange={handleChanges}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 d-flex ml-4">
                                                        <div className="mb-3 pr-0">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Email Address</label>
                                                            <input
                                                                className="form-control Title"
                                                                type="email"
                                                                placeholder="Enter email address"
                                                                value={newEmail}
                                                                name='email'
                                                                onChange={(e) => { setNewEmail(e.target.value); setSomChange(true); setIsSubmit(true) }}
                                                            />
                                                            <div id='emailError' className='small'>{formErrorsForEdit.newEmail}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className="mb-3 pr-0">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label Label">Select User Role</label>

                                                        <Select
                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            value={newRoleTitle}
                                                            options={TeamMemberListData?.map((guest) => {
                                                                return {

                                                                    label: guest.role_title,
                                                                    value: guest.role_title,
                                                                    key: guest.id
                                                                };
                                                            })}
                                                            onChange={handleChangeLevel}
                                                            theme={(theme) => ({
                                                                ...theme,
                                                                colors: {
                                                                    ...theme.colors,
                                                                    primary25: '#F5F5F5',
                                                                    primary: '#74613C',
                                                                },
                                                            })}
                                                        />
                                                        <div id='emailError' className='small'>{formErrorsForEdit.newRoleTitle}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>}
            </div>
        </AppContainer >
    )
}
export default AddMember
