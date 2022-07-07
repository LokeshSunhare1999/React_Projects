import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom";
import '../assets/css/Login.css';
import { googleSignInInitiate, loginInitiate } from '../redux/action';
import jwtDecode from 'jwt-decode';

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  })
  const [user, setUser] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");

  const { email, password } = state;
  const { currentUser } = useSelector(state => state.user);

  const history = useHistory();

  useEffect(() => {
    setError("");
    if (currentUser) {
      history.push("/")
    }
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [currentUser, history])

  const dispatch = useDispatch();

  /**
   * this func. for google login
   */
  const handleGoogleSignIn = () => {
    dispatch(googleSignInInitiate());
    // google.accounts.id.prompt();
  }
/**
 * this func. is for validating and dispatch
 * @param {*} e 
 * @returns nothing when user enter nothing
 */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setFormErrors(validate(state));
    setIsSubmit(true);

    if (!email || !password) {
      return;
    }
    dispatch(loginInitiate(email, password));
    setState({ email: "", password: "" })
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

  /**
   * this func. is validating according to condition
   * @param {*} values 
   * @returns 
   */
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // const PwdRegex = "^(?=.*[0-9])"
    //   + "(?=.*[a-z])(?=.*[A-Z])"
    //   + "(?=.*[@#$%^&+=])"
    //   + "(?=\\S+$).{8,20}$";
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
    return errors;
  };


  /**
   * Google IDp code
   */
  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   var userObject = jwtDecode(response.credential);
  //   console.log(userObject);
  //   setUser(userObject);
  //   document.getElementById('signInDiv').hidden = true;
  // }
  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: "964065372421-01o3o5knudb3j34k6n41pnsc1ddkdcs2.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     { theme: "outline", size: "large" }
  //   );
  //   google.accounts.id.prompt();
  // }, []);

  return (
    <div>
      <div id="logreg-forms">
        <form className="formo-signin" onSubmit={handleSubmit}>
          <h1 className='h3 mb-3 font-weight-normal' style={{ textAlign: "center" }}>Sign In</h1>
          <div className='social-login'>
            <button className='btn google-btn social-btn' type="button" onClick={handleGoogleSignIn} >
              <span>
                <i className="fab fa-google-plus-g"></i> Sign in with Google
              </span>
            </button>
          </div>
          <p style={{ textAlign: "center" }}>OR</p>
          <input type="email"
            id="inputEmail"
            className='form-control'
            placeholder='Email Address'
            name='email'
            onChange={handleChange}
            value={email} />
          <small>{formErrors.email}</small>
          <br />
          <input type="password"
            id="inputPassword"
            className='form-control'
            placeholder='Password '
            name='password'
            onChange={handleChange}
            value={password} />
          <Link to="/forgotPassword">Forgot Password?</Link>
          <Link to="/resetPassword">Reset Password?</Link>
          <small>{formErrors.password}</small>
          <br />
          <button className='btn btn-success btn-block' type="submit">Sign In
          </button>
          <hr />
          <p>Don't have account</p>
          <Link to="/register">
            <button className='btn btn-primary btn-block' type="button" id="btn-signup">
              <i className='fas fa-user-plus'></i> SignUp New Account
            </button>
          </Link>
          {/* <div id="signInDiv"> </div> */}
        </form>
      </div>
    </div>
  )
}

export default Login
