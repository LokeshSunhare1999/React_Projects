import * as type from '../../constants';

const initialState = {
    viewTeamMembers: [],
    viewTeamMemberDetails: [],
    addNewTeamMember: [],
    updateTeamMemberDetails: [],
    deleteTeamMember: [],
    getUserRoleList: [],
    updateMultipleUserRole: [],
    loading: false,
    error: null,
}

export function viewTeamMembers(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_TEAM_MEMBERS:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_TEAM_MEMBERS_SUCCESS:
            return {
                ...state,
                loading: false,
                viewTeamMembers: action.viewTeamMembers,
            }
        case type.VIEW_TEAM_MEMBERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function addNewTeamMember(state = initialState, action) {
    switch (action.type) {
        case type.ADD_NEW_TEAM_MEMBER:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_NEW_TEAM_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                addNewTeamMember: action.addNewTeamMember
            }
        case type.ADD_NEW_TEAM_MEMBER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function viewTeamMemberDetails(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_TEAM_MEMBER_DETAILS:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_TEAM_MEMBER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                viewTeamMemberDetails: action.viewTeamMemberDetails
            }
        case type.VIEW_TEAM_MEMBER_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function updateTeamMemberDetails(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_TEAM_MEMBER_DETAILS:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_TEAM_MEMBER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                updateTeamMemberDetails: action.updateTeamMemberDetails
            }
        case type.UPDATE_TEAM_MEMBER_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function deleteTeamMember(state = initialState, action) {
    switch (action.type) {
        case type.DELETE_TEAM_MEMBER:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_TEAM_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteTeamMember: action.deleteTeamMember
            }
        case type.DELETE_TEAM_MEMBER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}
export function getUserRoleList(state = initialState, action) {
    switch (action.type) {
        case type.GET_USER_ROLE_LIST:
            return {
                ...state,
                loading: true,
            }
        case type.GET_USER_ROLE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                getUserRoleList: action.getUserRoleList
            }
        case type.GET_USER_ROLE_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function updateMultipleUserRole(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_MULTIPLE_USER_ROLE:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_MULTIPLE_USER_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                updateMultipleUserRole: action.updateMultipleUserRole
            }
        case type.UPDATE_MULTIPLE_USER_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}
