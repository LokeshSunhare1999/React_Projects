import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import usePasswordToggle from '../../../utils/usePasswordToggle.js';
import LoginImage from '../../../assets/images/loginModule/anandaSpaLogo.svg'
import * as routes from "../../../Router/RoutesURL";
import * as textMessage from "../../../Config/Constant";
import OutlinedInput from '@mui/material/OutlinedInput';
import { login } from '../../../redux/actions/AuthAction/loginAction';
import { getPermissionByAppName } from '../../../utils/Helper';
import { Button } from 'reactstrap';
import './LoginPage.scss';

function LoginPage() {
    const [state, setState] = useState({
        email: "",
        password: "",
    })
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState("");
    const { email, password } = state;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.login);

    useEffect(() => {
        if (loginData.login.statusCode === 200) {
            localStorage.setItem('Authenticated', 'true');
            if (getPermissionByAppName("Master Data") !== "hide") {
                navigate(routes.MASTERDATA);
            } else {
                navigate(routes.TESTIMONIALS);
            }
        }
    }, [loginData]);

    useEffect(() => {
        if (state.email !== "" ||
            state.password !== "") {
            setFormErrors(validate(state));
        }
    }, [state]);

    //----- validating and dispatch Function -----//
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setFormErrors(validate(state));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const sendRequest = {
                email_id: state.email,
                password: state.password,
            };
            dispatch(login(sendRequest));
        }
        if (!email || !password) {
            return;
        }
    }

    //----- set error msg and user entered values -----//
    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
        setIsSubmit(true);
    };

    //----- validating according to condition -----//
    const validate = (values) => {
        const errors = {};
        const regex = textMessage.EMAIL_REGEX;
        const passwordRegex = textMessage.PASSWORD_REGEX;
        if (!values.email) {
            errors.email = textMessage.EMAIL_IS_REQUIRED;
        } else if (!regex.test(values.email)) {
            errors.email = textMessage.THIS_IS_NOT_A_VALID_EMAIL_FORMAT;
        }
        if (!values.password) {
            errors.password = textMessage.PASSWORD_IS_REQUIRED;
        } else if (values.password.length < 8) {
            errors.password = textMessage.PASSWORD_MUST_BE_MORE_THAN_8_CHARACTERS;
        } else if (values.password.length > 20) {
            errors.password = textMessage.PASSWORD_CANNOT_EXCEED_MORE_THAN_20_CHARACTERS;
        } else if (!passwordRegex.test(values.password)) {
            errors.password = textMessage.THIS_IS_NOT_A_VALID_PASSWORD_FORMAT;
        }
        return errors;
    };

    return (
        <div className='row g-0 LoginPage '>
            <div className="ImageMainDiv col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
            </div>
            < div className="LoginMainDiv col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6" >
                <form className="d-flex justify-content-center align-items-center flex-column LoginDiv" onSubmit={handleSubmit} >
                    <div className='logoImageDiv'>
                        <img className='logoImage' src={LoginImage} alt='' />
                    </div>
                    <div className="card CardDiv">
                        <div className="card-body CardBodyDiv">
                            <h3 className='Heading'>Admin Login</h3>
                            <p className='Desc'>Enter your email and password to login</p>
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
                            <div className={Object.keys(formErrors).length === 0 ? 'form-floating InputSpace' : 'form-floating pb-0'}>
                                <OutlinedInput
                                    aria-describedby="outlined-weight-helper-text"
                                    type={PasswordInputType}
                                    id="inputPassword"
                                    className='form-control'
                                    placeholder='Password '
                                    name='password'
                                    onChange={handleChange}
                                    value={password} />
                                <i className="password-toggle-icon">
                                    {ToggleIcon}
                                </i>
                                {password !== "" && <div id='pswrdError' className='small'>{formErrors.password}</div>}
                            </div>
                            <Button disabled={email !== '' && password !== '' ? false : true} className="btn btn-primary w-100 mb-1 mt-3" type="submit">LOGIN</Button>
                            <div className="forgotPassword">
                                <Link to="/forgotPassword">Forgot Password?</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginPage;
