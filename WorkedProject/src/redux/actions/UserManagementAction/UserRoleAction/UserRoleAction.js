import {
    VIEW_USER_ROLE,
    VIEW_USER_ROLE_SUCCESS,
    VIEW_USER_ROLE_FAILURE,

    ADD_NEW_USER_ROLE,
    ADD_NEW_USER_ROLE_SUCCESS,
    ADD_NEW_USER_ROLE_FAILURE,

    UPDATE_USER_ROLE_TITLE,
    UPDATE_USER_ROLE_TITLE_SUCCESS,
    UPDATE_USER_ROLE_TITLE_FAILURE,

    DELETE_USER_ROLE_TITLE,
    DELETE_USER_ROLE_TITLE_SUCCESS,
    DELETE_USER_ROLE_TITLE_FAILURE,
} from '../../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function viewUserRole(data) {
    return {
        type: VIEW_USER_ROLE,
        data,
    };
}

export function viewUserRoleSuccess(data) {
    return {
        type: VIEW_USER_ROLE_SUCCESS,
        data,
    };
}

export function viewUserRoleFailure(data) {
    return {
        type: VIEW_USER_ROLE_FAILURE,
        data,
    };
}


export function addNewUserRole(data) {
    return {
        type: ADD_NEW_USER_ROLE,
        data,
    };
}

export function addNewUserRoleSuccess(data) {
    return {
        type: ADD_NEW_USER_ROLE_SUCCESS,
        data,
    };
}

export function addNewUserRoleFailure(data) {
    return {
        type: ADD_NEW_USER_ROLE_FAILURE,
        data,
    };
}

export function UpdateUserRoleTitle(data) {
    return {
        type: UPDATE_USER_ROLE_TITLE,
        data,
    };
}

export function UpdateUserRoleTitleSuccess(data) {
    return {
        type: UPDATE_USER_ROLE_TITLE_SUCCESS,
        data,
    };
}

export function UpdateUserRoleTitleFailure(data) {
    return {
        type: UPDATE_USER_ROLE_TITLE_FAILURE,
        data,
    };
}

export function deleteUserRoleTitle(data) {
    return {
        type: DELETE_USER_ROLE_TITLE,
        data,
    };
}

export function deleteUserRoleTitleSuccess(data) {
    return {
        type: DELETE_USER_ROLE_TITLE_SUCCESS,
        data,
    };
}

export function deleteUserRoleTitleFailure(data) {
    return {
        type: DELETE_USER_ROLE_TITLE_FAILURE,
        data,
    };
}





