import {
    VIEW_ADMIN_PROFILE,
    VIEW_ADMIN_PROFILE_SUCCESS,
    VIEW_ADMIN_PROFILE_FAILURE,
} from '../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function viewAdminProfile(data) {
    return {
        type: VIEW_ADMIN_PROFILE,
        data,
    };
}

export function viewAdminProfileSuccess(data) {
    return {
        type: VIEW_ADMIN_PROFILE_SUCCESS,
        data,
    };
}

export function viewAdminProfileFailure(data) {
    return {
        type: VIEW_ADMIN_PROFILE_FAILURE,
        data,
    };
}


