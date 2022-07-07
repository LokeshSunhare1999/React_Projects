import * as types from "./actionTypes";
const initialState = {
    loading: false,
    currentUser: null,
    error: null,
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_START:
        case types.LOGIN_START:
        case types.LOGOUT_START:
        case types.GOOGLE_SIGN_IN_START:
        case types.FORGOTPASSWORD_START:
            return {
                ...state,
                loading: true
            }
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
        case types.GOOGLE_SIGN_IN_SUCCESS:
        case types.FORGOTPASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            }
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
            }
        case types.SET_USER:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            };
        case types.REGISTER_FAIL:
        case types.LOGIN_FAIL:
        case types.LOGOUT_FAIL:
        case types.GOOGLE_SIGN_IN_FAIL:
        case types.FORGOTPASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default userReducer;