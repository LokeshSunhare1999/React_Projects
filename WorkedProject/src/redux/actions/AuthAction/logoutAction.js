import {
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
} from '../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function logout(data) {
    return {
        type: LOGOUT,
        data,
    };
}

export function logoutSuccess(data) {
    return {
        type: LOGOUT_SUCCESS,
        data,
    };
}

export function logoutFailure(data) {
    return {
        type: LOGOUT_FAILURE,
        data,
    };
}
