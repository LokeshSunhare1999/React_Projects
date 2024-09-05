import {
    VIEW_GUEST_USERS,
    VIEW_GUEST_USERS_SUCCESS,
    VIEW_GUEST_USERS_FAILURE,

    ADD_NEW_GUEST,
    ADD_NEW_GUEST_SUCCESS,
    ADD_NEW_GUEST_FAILURE,

    VIEW_GUEST_USER_DETAILS,
    VIEW_GUEST_USER_DETAILS_SUCCESS,
    VIEW_GUEST_USER_DETAILS_FAILURE,

    UPDATE_GUEST_DETAILS,
    UPDATE_GUEST_DETAILS_SUCCESS,
    UPDATE_GUEST_DETAILS_FAILURE,

} from '../../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function viewGuestUsers(data) {
    return {
        type: VIEW_GUEST_USERS,
        data,
    };
}

export function viewGuestUsersSuccess(data) {
    return {
        type: VIEW_GUEST_USERS_SUCCESS,
        data,
    };
}

export function viewGuestUsersFailure(data) {
    return {
        type: VIEW_GUEST_USERS_FAILURE,
        data,
    };
}



export function viewGuestUserDetails(data) {
    return {
        type: VIEW_GUEST_USER_DETAILS,
        data,
    };
}

export function viewGuestUserDetailsSuccess(data) {
    return {
        type: VIEW_GUEST_USER_DETAILS_SUCCESS,
        data,
    };
}

export function viewGuestUserDetailsFailure(data) {
    return {
        type: VIEW_GUEST_USER_DETAILS_FAILURE,
        data,
    };
}

export function addNewGuest(data) {
    return {
        type: ADD_NEW_GUEST,
        data,
    };
}

export function addNewGuestSuccess(data) {
    return {
        type: ADD_NEW_GUEST_SUCCESS,
        data,
    };
}

export function addNewGuestFailure(data) {
    return {
        type: ADD_NEW_GUEST_FAILURE,
        data,
    };
}


export function updateGuestDetails(data) {
    return {
        type: UPDATE_GUEST_DETAILS,
        data,
    };
}

export function updateGuestDetailsSuccess(data) {
    return {
        type: UPDATE_GUEST_DETAILS_SUCCESS,
        data,
    };
}

export function updateGuestDetailsFailure(data) {
    return {
        type: UPDATE_GUEST_DETAILS_FAILURE,
        data,
    };
}
