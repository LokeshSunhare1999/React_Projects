import {
    FORGOT,
    FORGOT_SUCCESS,
    FORGOT_FAILURE,
} from '../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function forgot(data) {
    return {
        type: FORGOT,
        data,
    };
}

export function forgotSuccess(data) {
    return {
        type: FORGOT_SUCCESS,
        data,
    };
}

export function forgotFailure(data) {
    return {
        type: FORGOT_FAILURE,
        data,
    };
}


