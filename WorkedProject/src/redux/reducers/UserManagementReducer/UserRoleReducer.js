import * as type from '../../constants';

const initialState = {
    addNewUserRole: [],
    UpdateUserRoleTitle: [],
    deleteUserRoleTitle: [],
    loading: false,
    error: null,
}

export function addNewUserRole(state = initialState, action) {
    switch (action.type) {
        case type.ADD_NEW_USER_ROLE:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_NEW_USER_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                addNewUserRole: action.addNewUserRole
            }
        case type.ADD_NEW_USER_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}


export function UpdateUserRoleTitle(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_USER_ROLE_TITLE:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_USER_ROLE_TITLE_SUCCESS:
            return {
                ...state,
                loading: false,
                UpdateUserRoleTitle: action.UpdateUserRoleTitle
            }
        case type.UPDATE_USER_ROLE_TITLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function deleteUserRoleTitle(state = initialState, action) {
    switch (action.type) {
        case type.DELETE_USER_ROLE_TITLE:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_USER_ROLE_TITLE_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteUserRoleTitle: action.deleteUserRoleTitle
            }
        case type.DELETE_USER_ROLE_TITLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}



