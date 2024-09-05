import * as type from '../../constants';

const initialState = {
    getEventsList: [],
    viewEventDetails: [],
    addNewEvent: [],
    editEventDetails: [],
    loading: false,
    error: null,
}

export function getEventsList(state = initialState, action) {
    switch (action.type) {
        case type.GET_EVENTS_LIST:
            return {
                ...state,
                loading: true,
            }
        case type.GET_EVENTS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                getEventsList: action.getEventsList,
            }
        case type.GET_EVENTS_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function viewEventDetails(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_EVENT_DETAILS:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_EVENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                viewEventDetails: action.viewEventDetails
            }
        case type.VIEW_EVENT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function addNewEvent(state = initialState, action) {
    switch (action.type) {
        case type.ADD_NEW_EVENT:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_NEW_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                addNewEvent: action.addNewEvent
            }
        case type.ADD_NEW_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function editEventDetails(state = initialState, action) {
    switch (action.type) {
        case type.EDIT_EVENT_DETAILS:
            return {
                ...state,
                loading: true,
            }
        case type.EDIT_EVENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                editEventDetails: action.editEventDetails
            }
        case type.EDIT_EVENT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}





