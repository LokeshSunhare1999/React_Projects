import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom";
import '../assets/css/Register.css';
import { registerInitiate } from '../redux/action';

function ForgotPassword() {
    const [state, setState] = useState({
        email: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const { currentUser } = useSelector(state => state.user);

    const history = useHistory();

    useEffect(() => {
        if (currentUser) {
            history.push("/")
        }
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        }
    }, [currentUser, history])
    // const dispatch = useDispatch();

    const { email } = state;

    /**
     * this func. is for validating and dispatch
     * @param {*} e 
     * @returns nothing when user enter nothing
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(state));
        setIsSubmit(true);

        // dispatch(forgotPasswordInitiate(email));
        // setState({ email: "" });
    }
    /**
     * this func. is validate and set user values
     * @param {*} e 
     */
    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
        setFormErrors(validate(state));
        setIsSubmit(true);
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        return errors;
    };

    return (
        <div>
            <div id="register-form">
                <form className="formo-signin" onSubmit={handleSubmit}>
                    <h1 className='h3 mb-3 font-weight-normal' style={{ textAlign: "center" }}>Forgot Password</h1>
                    <input type="email"
                        id="user-email"
                        className='form-control'
                        placeholder='Email Address'
                        name='email'
                        onChange={handleChange}
                        value={email} />
                    <small>{formErrors.email}</small>
                    <br />
                    <button className='btn btn-primary btn-block' type="submit"><i className="fa-solid fa-arrow-up-right-from-square"></i> Send
                    </button>
                    <Link to="/login"><i className='fas fa-angle-left'></i>Back</Link>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
