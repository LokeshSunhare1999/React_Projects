import * as type from '../../constants';

const initialState = {
    viewGuestsList: [],
    viewGuestDetails: [],
    addNewGuestUser: [],
    updateGuestUserDetails: [],
    loading: false,
    error: null,
}

export function viewGuestUsers(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_GUEST_USERS:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_GUEST_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                viewGuestsList: action.viewPrograms,
            }
        case type.VIEW_GUEST_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}


export function viewGuestUserDetails(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_GUEST_USER_DETAILS:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_GUEST_USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                viewGuestDetailsRes: action.viewGuestDetailsRes
            }
        case type.VIEW_GUEST_USER_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}


export function addNewGuest(state = initialState, action) {
    switch (action.type) {
        case type.ADD_NEW_GUEST:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_NEW_GUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                addNewGuestUser: action.addNewGuestRes
            }
        case type.ADD_NEW_GUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}


export function updateGuestDetails(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_GUEST_DETAILS:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_GUEST_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                updateUserDetailsRes: action.updateUserDetailsRes
            }
        case type.UPDATE_GUEST_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

