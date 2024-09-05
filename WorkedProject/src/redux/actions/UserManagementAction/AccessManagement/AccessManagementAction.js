import {
    GET_ACCESS_MANAGEMENT_LIST,
    GET_ACCESS_MANAGEMENT_LIST_SUCCESS,
    GET_ACCESS_MANAGEMENT_LIST_FAILURE,

    UPDATE_ACCESS,
    UPDATE_ACCESS_SUCCESS,
    UPDATE_ACCESS_FAILURE,

} from '../../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function getAccessManagementList(data) {
    return {
        type: GET_ACCESS_MANAGEMENT_LIST,
        data,
    };
}

export function getAccessManagementListSuccess(data) {
    return {
        type: GET_ACCESS_MANAGEMENT_LIST_SUCCESS,
        data,
    };
}

export function getAccessManagementListFailure(data) {
    return {
        type: GET_ACCESS_MANAGEMENT_LIST_FAILURE,
        data,
    };
}

export function UpdateAccess(data) {
    return {
        type: UPDATE_ACCESS,
        data,
    };
}

export function UpdateAccessSuccess(data) {
    return {
        type: UPDATE_ACCESS_SUCCESS,
        data,
    };
}

export function UpdateAccessFailure(data) {
    return {
        type: UPDATE_ACCESS_FAILURE,
        data,
    };
}





