import * as types from "./actionTypes";
import { auth, googleAuthProvider } from "../firebase";

//register
const registerStart = () => ({
    type: types.REGISTER_START,
});
const registerSuccess = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user,
});
const registerFail = (error) => ({
    type: types.REGISTER_FAIL,
    payload: error,
});
//logIn
const loginStart = () => ({
    type: types.LOGIN_START,
});
const loginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user,
});
const loginFail = (error) => ({
    type: types.LOGIN_FAIL,
    payload: error,
});
//logOut
const logoutStart = () => ({
    type: types.LOGOUT_START,
});
const logoutSuccess = (user) => ({
    type: types.LOGOUT_SUCCESS,
});
const logoutFail = (error) => ({
    type: types.LOGOUT_FAIL,
    payload: error,
});
//user
export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user,
});
//googleSignIn
const googleSignInStart = () => ({
    type: types.GOOGLE_SIGN_IN_START,
});
const googleSignInSuccess = (user) => ({
    type: types.GOOGLE_SIGN_IN_SUCCESS,
    payload: user,
});
const googleSignInFail = (error) => ({
    type: types.GOOGLE_SIGN_IN_FAIL,
    payload: error,
});
//Forgot Password
const forgotPasswordStart = () => ({
    type: types.FORGOTPASSWORD_START,
});
const forgotPasswordSuccess = (user) => ({
    type: types.FORGOTPASSWORD_SUCCESS,
    payload: user,
});
const forgotPasswordFail = (error) => ({
    type: types.FORGOTPASSWORD_FAIL,
    payload: error,
});
//Reset Password
const resetPasswordStart = () => ({
    type: types.RESETPASSWORD_START,
});
const resetPasswordSuccess = (user) => ({
    type: types.RESETPASSWORD_SUCCESS,
    payload: user,
});
const resetPasswordFail = (error) => ({
    type: types.RESETPASSWORD_FAIL,
    payload: error,
});

export const registerInitiate = (email, password, displayName) => {
    return function (dispatch) {
        dispatch(registerStart());
        auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
            user.updateProfile({
                displayName
            })
            dispatch(registerSuccess(user))
        }).catch((error) => dispatch(registerFail(error.message)))
    }
}

export const loginInitiate = (email, password) => {
    return function (dispatch) {
        dispatch(loginStart());
        auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(loginSuccess(user))
        }).catch((error) => dispatch(loginFail(error.message)))
    }
}
export const logoutInitiate = () => {
    return function (dispatch) {
        dispatch(logoutStart());
        auth.signOut().then((response) =>
            dispatch(logoutSuccess()))
            .catch((error) => dispatch(logoutFail(error.message)))
    }
}

export const googleSignInInitiate = () => {
    return function (dispatch) {
        dispatch(googleSignInStart());
        auth.signInWithPopup(googleAuthProvider).then(({ user }) => {
            dispatch(googleSignInSuccess(user))
        }).catch((error) => dispatch(googleSignInFail(error.message)))
    }
}

export const forgotPasswordInitiate = (email) => {
    return function (dispatch) {
        dispatch(forgotPasswordStart());
        auth.signInWithEmailAndPassword(email).then(({ user }) => {
            dispatch(forgotPasswordSuccess(user))
        }).catch((error) => dispatch(forgotPasswordFail(error.message)))
    }
}

export const resetPasswordInitiate = (email, password) => {
    return function (dispatch) {
        dispatch(resetPasswordStart());
        auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(resetPasswordSuccess(user))
        }).catch((error) => dispatch(resetPasswordFail(error.message)))
    }
}