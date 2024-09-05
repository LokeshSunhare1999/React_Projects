import {
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
} from '../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function updateProfile(data) {
    return {
        type: UPDATE_PROFILE,
        data,
    };
}

export function updateProfileSuccess(data) {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        data,
    };
}

export function updateProfileFailure(data) {
    return {
        type: UPDATE_PROFILE_FAILURE,
        data,
    };
}
