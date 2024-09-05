import * as type from '../../constants';

const initialState = {
    getActivityList: [],
    viewActivityDetails: [],
    addNewActivity: [],
    updateActivity: [],
    getInterestedGuestList: [],
    loading: false,
    error: null,
}

export function getActivityList(state = initialState, action) {
    switch (action.type) {
        case type.GET_ACTIVITY_LIST:
            return {
                ...state,
                loading: true,
            }
        case type.GET_ACTIVITY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                getActivityList: action.getActivityList,
            }
        case type.GET_ACTIVITY_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function viewActivityDetails(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_ACTIVITY_DETAILS:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_ACTIVITY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                viewActivityDetails: action.viewActivityDetails
            }
        case type.VIEW_ACTIVITY_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function addNewActivity(state = initialState, action) {
    switch (action.type) {
        case type.ADD_NEW_ACTIVITY:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_NEW_ACTIVITY_SUCCESS:
            return {
                ...state,
                loading: false,
                addNewActivity: action.addNewActivity
            }
        case type.ADD_NEW_ACTIVITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function updateActivity(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_ACTIVITY:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_ACTIVITY_SUCCESS:
            return {
                ...state,
                loading: false,
                updateActivity: action.updateActivity
            }
        case type.UPDATE_ACTIVITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function getInterestedGuestList(state = initialState, action) {
    switch (action.type) {
        case type.GET_INTERESTED_GUEST_LIST:
            return {
                ...state,
                loading: true,
            }
        case type.GET_INTERESTED_GUEST_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                getInterestedGuestList: action.getInterestedGuestList
            }
        case type.GET_INTERESTED_GUEST_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}


