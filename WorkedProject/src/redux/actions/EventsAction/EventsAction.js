import {
    GET_EVENTS_LIST,
    GET_EVENTS_LIST_SUCCESS,
    GET_EVENTS_LIST_FAILURE,

    VIEW_EVENT_DETAILS,
    VIEW_EVENT_DETAILS_SUCCESS,
    VIEW_EVENT_DETAILS_FAILURE,

    ADD_NEW_EVENT,
    ADD_NEW_EVENT_SUCCESS,
    ADD_NEW_EVENT_FAILURE,

    EDIT_EVENT_DETAILS,
    EDIT_EVENT_DETAILS_SUCCESS,
    EDIT_EVENT_DETAILS_FAILURE,

} from '../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function getEventList(data) {
    return {
        type: GET_EVENTS_LIST,
        data,
    };
}

export function getEventListSuccess(data) {
    return {
        type: GET_EVENTS_LIST_SUCCESS,
        data,
    };
}

export function getEventListFailure(data) {
    return {
        type: GET_EVENTS_LIST_FAILURE,
        data,
    };
}

export function viewEventDetails(data) {
    return {
        type: VIEW_EVENT_DETAILS,
        data,
    };
}

export function viewEventDetailsSuccess(data) {
    return {
        type: VIEW_EVENT_DETAILS_SUCCESS,
        data,
    };
}

export function viewEventDetailsFailure(data) {
    return {
        type: VIEW_EVENT_DETAILS_FAILURE,
        data,
    };
}

export function addNewEvent(data) {
    return {
        type: ADD_NEW_EVENT,
        data,
    };
}

export function addNewEventSuccess(data) {
    return {
        type: ADD_NEW_EVENT_SUCCESS,
        data,
    };
}

export function addNewEventFailure(data) {
    return {
        type: ADD_NEW_EVENT_FAILURE,
        data,
    };
}

export function editEventDetails(data) {
    return {
        type: EDIT_EVENT_DETAILS,
        data,
    };
}

export function editEventDetailsSuccess(data) {
    return {
        type: EDIT_EVENT_DETAILS_SUCCESS,
        data,
    };
}

export function editEventDetailsFailure(data) {
    return {
        type: EDIT_EVENT_DETAILS_FAILURE,
        data,
    };
}








