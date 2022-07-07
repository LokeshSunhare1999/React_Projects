import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom";
import '../assets/css/Register.css';
import { registerInitiate } from '../redux/action';

function Register() {
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: ""
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
  const dispatch = useDispatch();

  const { email, password, displayName, passwordConfirm } = state;

  /**
   * this func. is for validating and dispatch
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
    dispatch(registerInitiate(email, password, displayName));
    setState({ email: "", displayName: "", password: "", passwordConfirm: "" });

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
    if (!values.displayName) {
      errors.displayName = "Enter Full Name!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
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
          <h1 className='h3 mb-3 font-weight-normal' style={{ textAlign: "center" }}>Sign Up</h1>
          <input type="text"
            id="displayName"
            className='form-control'
            placeholder='Full Name'
            name='displayName'
            onChange={handleChange}
            value={displayName} />
          <br />
          <small>{formErrors.displayName}</small>
          <input type="email"
            id="user-email"
            className='form-control'
            placeholder='Email Address'
            name='email'
            onChange={handleChange}
            value={email} />
          <br />
          <small>{formErrors.email}</small>
          <input type="password"
            id="inputPassword"
            className='form-control'
            placeholder='Password '
            name='password'
            onChange={handleChange}
            value={password} />
          <br />
          <small>{formErrors.password}</small>
          <input type="password"
            id="passwordConfirm"
            className='form-control'
            placeholder='Confirm Password '
            name='passwordConfirm'
            onChange={handleChange}
            value={passwordConfirm} />
          <small>{formErrors.passwordConfirm}</small>
          <br />
          <button className='btn btn-primary btn-block' type="submit"> <i className='fas fa-user-plus'></i>Sign Up
          </button>
          <Link to="/login"><i className='fas fa-angle-left'></i>Back</Link>
        </form>
      </div>
    </div>
  )
}

export default Register
