import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom";
import '../assets/css/Register.css';
import { registerInitiate } from '../redux/action';

function ResetPassword() {
    const [state, setState] = useState({
        password: "",
        passwordConfirm: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const { currentUser } = useSelector(state => state.user);

    const history = useHistory();

    useEffect(() => {
        if (currentUser) {
            history.push("/login")
        }
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        }
    }, [currentUser, history])
    // const dispatch = useDispatch();

    const { password, passwordConfirm } = state;

    /**
     * this func. is for validating
     * 
     * @param {*} e 
     * @returns nothing when user enter nothing
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(state));
        setIsSubmit(true);
        if (password !== passwordConfirm) {
            return;
        }
        // dispatch(resetPasswordInitiate(password, passwordConfirm));
        // setState({ password: "", passwordConfirm: "" });

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
        if (!values.password && !values.passwordConfirm) {
            errors.password = "Password is required!";
            errors.passwordConfirm = "Confirm Password is required!";
        } else if (values.password.length < 8) {
            errors.password = "Password must be more than 8 characters";
        } else if (values.password.length > 20) {
            errors.password = "Password cannot exceed more than 20 characters";
        }
        if (values.password !== values.passwordConfirm) {
            errors.passwordConfirm = "Password does not match with confirm Password!";
        }
        return errors;
    };


    return (
        <div>
            <div id="register-form">
                <form className="formo-signin" onSubmit={handleSubmit}>
                    <h1 className='h3 mb-3 font-weight-normal' style={{ textAlign: "center" }}>Reset Password</h1>
                    <input type="password"
                        id="inputPassword"
                        className='form-control'
                        placeholder='Password '
                        name='password'
                        onChange={handleChange}
                        value={password} />
                    <small>{formErrors.password}</small>
                    <br />
                    <input type="password"
                        id="passwordConfirm"
                        className='form-control'
                        placeholder='Confirm Password '
                        name='passwordConfirm'
                        onChange={handleChange}
                        value={passwordConfirm} />
                    <small>{formErrors.passwordConfirm}</small>
                    <br />
                    <button className='btn btn-primary btn-block' type="submit">Reset</button>
                    <Link to="/login"><i className='fas fa-angle-left'></i>Back</Link>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
