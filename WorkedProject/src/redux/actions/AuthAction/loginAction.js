import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function login(data) {
    return {
        type: LOGIN,
        data,
    };
}

export function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        data,
    };
}

export function loginFailure(data) {
    return {
        type: LOGIN_FAILURE,
        data,
    };
}


