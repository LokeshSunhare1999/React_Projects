import {
    GET_ACTIVITY_LIST,
    GET_ACTIVITY_LIST_SUCCESS,
    GET_ACTIVITY_LIST_FAILURE,

    VIEW_ACTIVITY_DETAILS,
    VIEW_ACTIVITY_DETAILS_SUCCESS,
    VIEW_ACTIVITY_DETAILS_FAILURE,

    ADD_NEW_ACTIVITY,
    ADD_NEW_ACTIVITY_SUCCESS,
    ADD_NEW_ACTIVITY_FAILURE,

    UPDATE_ACTIVITY,
    UPDATE_ACTIVITY_SUCCESS,
    UPDATE_ACTIVITY_FAILURE,

    GET_INTERESTED_GUEST_LIST,
    GET_INTERESTED_GUEST_LIST_SUCCESS,
    GET_INTERESTED_GUEST_LIST_FAILURE,

} from '../../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function getActivityList(data) {
    return {
        type: GET_ACTIVITY_LIST,
        data,
    };
}

export function getActivityListSuccess(data) {
    return {
        type: GET_ACTIVITY_LIST_SUCCESS,
        data,
    };
}

export function getActivityListFailure(data) {
    return {
        type: GET_ACTIVITY_LIST_FAILURE,
        data,
    };
}

export function viewActivityDetails(data) {
    return {
        type: VIEW_ACTIVITY_DETAILS,
        data,
    };
}

export function viewActivityDetailsSuccess(data) {
    return {
        type: VIEW_ACTIVITY_DETAILS_SUCCESS,
        data,
    };
}

export function viewActivityDetailsFailure(data) {
    return {
        type: VIEW_ACTIVITY_DETAILS_FAILURE,
        data,
    };
}

export function addActivity(data) {
    return {
        type: ADD_NEW_ACTIVITY,
        data,
    };
}

export function addActivitySuccess(data) {
    return {
        type: ADD_NEW_ACTIVITY_SUCCESS,
        data,
    };
}

export function addActivityFailure(data) {
    return {
        type: ADD_NEW_ACTIVITY_FAILURE,
        data,
    };
}

export function updateActivity(data) {
    return {
        type: UPDATE_ACTIVITY,
        data,
    };
}

export function updateActivitySuccess(data) {
    return {
        type: UPDATE_ACTIVITY_SUCCESS,
        data,
    };
}

export function updateActivityFailure(data) {
    return {
        type: UPDATE_ACTIVITY_FAILURE,
        data,
    };
}

export function getInterestedGuestList(data) {
    return {
        type: GET_INTERESTED_GUEST_LIST,
        data,
    };
}

export function getInterestedGuestListSuccess(data) {
    return {
        type: GET_INTERESTED_GUEST_LIST_SUCCESS,
        data,
    };
}

export function getInterestedGuestListFailure(data) {
    return {
        type: GET_INTERESTED_GUEST_LIST_FAILURE,
        data,
    };
}


