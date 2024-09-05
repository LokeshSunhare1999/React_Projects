import * as type from '../../constants';

const initialState = {
    getAccessManagementList: [],
    UpdateAccess: [],
    loading: false,
    error: null,
}

export function getAccessManagementList(state = initialState, action) {
    switch (action.type) {
        case type.GET_ACCESS_MANAGEMENT_LIST:
            return {
                ...state,
                loading: true,
            }
        case type.GET_ACCESS_MANAGEMENT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                getAccessManagementList: action.getAccessManagementList
            }
        case type.GET_ACCESS_MANAGEMENT_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function UpdateAccess(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_ACCESS:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_ACCESS_SUCCESS:
            return {
                ...state,
                loading: false,
                UpdateAccess: action.UpdateAccess
            }
        case type.UPDATE_ACCESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}




