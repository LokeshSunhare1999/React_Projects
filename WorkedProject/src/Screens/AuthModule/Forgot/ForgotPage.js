import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import * as routes from "../../../Router/RoutesURL";
import * as textMessage from "../../../Config/Constant";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createNotification } from '../../../Config/NotificationToast';
import OutlinedInput from '@mui/material/OutlinedInput';
import LoginImage from '../../../assets/images/loginModule/anandaSpaLogo.svg'
import { forgot } from '../../../redux/actions/AuthAction/forgotAction';
import './ForgotPage.scss';
import { Button } from 'reactstrap';

function ForgotPassword() {
    const [state, setState] = useState({
        email: "",
    })
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const { email, password } = state;
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const forgotData = useSelector(state => state.forgot);

    useEffect(() => {
        if (forgotData?.forgot_Data.statusCode === 200) {
            console.log("forgotData", forgotData)
            console.log("forgotData?.forgot_Data", forgotData?.forgot_Data.data)

            createNotification('success', forgotData?.forgot_Data.message);
            navigate(routes.LOG_IN);
            console.log("redirect to login");
        }
    }, [forgotData]);

    //----- validating and dispatch Function -----//
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setFormErrors(validate(state));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const sendRequest = {
                email_id: state.email,
            };
            dispatch(forgot(sendRequest));
        }
        if (!email || !password) {
            return;
        }
        setState({ email: "" })
    }

    //----- set error msg and user entered values -----//
    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
        setFormErrors(validate(state));
        setIsSubmit(true);
        setDisabled(false);
    };

    //----- validating according to condition -----//
    const validate = (values) => {
        const errors = {};
        const regex = textMessage.EMAIL_REGEX;
        if (!values.email) {
            errors.email = textMessage.EMAIL_IS_REQUIRED;
        } else if (!regex.test(values.email)) {
            errors.email = textMessage.THIS_IS_NOT_A_VALID_EMAIL_FORMAT;
        }
        return errors;
    };

    return (
        <div className='row g-0 ForgotPage '>
            <div className="col ImageMainDiv">
            </div>
            <div className=" col ForgotMainDiv">
                <form className="d-flex justify-content-center align-items-center flex-column ForgotDiv" onSubmit={handleSubmit}>
                    <div className='logoImageDiv'>
                        <img className='logoImage' src={LoginImage} alt='' />
                    </div>
                    <div className="card CardDiv">
                        <div className="card-body CardBodyDiv">
                            <h3 className='Heading'><b>Forgot Password</b></h3>
                            <p className='Desc'>Please enter your email address. We will send you new password on your mail.</p>
                            <div className={Object.keys(formErrors).length === 0 ? 'form-floating InputSpace' : 'form-floating pb-0'}>
                                <OutlinedInput
                                    aria-describedby="outlined-weight-helper-text"
                                    id="inputEmail"
                                    className='form-control'
                                    placeholder='Email Address'
                                    name='email'
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={email} />
                                {email !== "" && <div id='emailError' className='small'>{formErrors.email}</div>}
                            </div>
                            <Button disabled={email !== '' ? false : true} className="btn btn-primary w-100 mb-3 mt-3" type="submit">Submit</Button>
                            <div className="BackToLogin">
                                <i className="material-icons leftArrow">keyboard_backspace</i>
                                <Link to="/login">Back to Login</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForgotPassword
