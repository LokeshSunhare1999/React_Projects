import {
    VIEW_TEAM_MEMBERS,
    VIEW_TEAM_MEMBERS_SUCCESS,
    VIEW_TEAM_MEMBERS_FAILURE,

    ADD_NEW_TEAM_MEMBER,
    ADD_NEW_TEAM_MEMBER_SUCCESS,
    ADD_NEW_TEAM_MEMBER_FAILURE,

    UPDATE_TEAM_MEMBER_DETAILS,
    UPDATE_TEAM_MEMBER_DETAILS_SUCCESS,
    UPDATE_TEAM_MEMBER_DETAILS_FAILURE,

    VIEW_TEAM_MEMBER_DETAILS,
    VIEW_TEAM_MEMBER_DETAILS_SUCCESS,
    VIEW_TEAM_MEMBER_DETAILS_FAILURE,

    DELETE_TEAM_MEMBER,
    DELETE_TEAM_MEMBER_SUCCESS,
    DELETE_TEAM_MEMBER_FAILURE,

    GET_USER_ROLE_LIST,
    GET_USER_ROLE_LIST_SUCCESS,
    GET_USER_ROLE_LIST_FAILURE,

    UPDATE_MULTIPLE_USER_ROLE,
    UPDATE_MULTIPLE_USER_ROLE_SUCCESS,
    UPDATE_MULTIPLE_USER_ROLE_FAILURE,

} from '../../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function viewTeamMembers(data) {
    return {
        type: VIEW_TEAM_MEMBERS,
        data,
    };
}

export function viewTeamMembersSuccess(data) {
    return {
        type: VIEW_TEAM_MEMBERS_SUCCESS,
        data,
    };
}

export function viewTeamMembersFailure(data) {
    return {
        type: VIEW_TEAM_MEMBERS_FAILURE,
        data,
    };
}

export function viewTeamMemberDetails(data) {
    return {
        type: VIEW_TEAM_MEMBER_DETAILS,
        data,
    };
}

export function viewTeamMemberDetailsSuccess(data) {
    return {
        type: VIEW_TEAM_MEMBER_DETAILS_SUCCESS,
        data,
    };
}

export function viewTeamMemberDetailsFailure(data) {
    return {
        type: VIEW_TEAM_MEMBER_DETAILS_FAILURE,
        data,
    };
}

export function addNewTeamMember(data) {
    return {
        type: ADD_NEW_TEAM_MEMBER,
        data,
    };
}

export function addNewTeamMemberSuccess(data) {
    return {
        type: ADD_NEW_TEAM_MEMBER_SUCCESS,
        data,
    };
}

export function addNewTeamMemberFailure(data) {
    return {
        type: ADD_NEW_TEAM_MEMBER_FAILURE,
        data,
    };
}

export function updateTeamMemberDetails(data, navigate) {
    return {
        type: UPDATE_TEAM_MEMBER_DETAILS,
        data, navigate
    };
}

export function updateTeamMemberDetailsSuccess(data, navigate) {
    return {
        type: UPDATE_TEAM_MEMBER_DETAILS_SUCCESS,
        data, navigate
    };
}

export function updateTeamMemberDetailsFailure(data, navigate) {
    return {
        type: UPDATE_TEAM_MEMBER_DETAILS_FAILURE,
        data, navigate
    };
}

export function deleteTeamMember(data) {
    return {
        type: DELETE_TEAM_MEMBER,
        data,
    };
}

export function deleteTeamMemberSuccess(data) {
    return {
        type: DELETE_TEAM_MEMBER_SUCCESS,
        data,
    };
}

export function deleteTeamMemberFailure(data) {
    return {
        type: DELETE_TEAM_MEMBER_FAILURE,
        data,
    };
}

export function getUserRoleList(data) {
    return {
        type: GET_USER_ROLE_LIST,
        data,
    };
}

export function getUserRoleListSuccess(data) {
    return {
        type: GET_USER_ROLE_LIST_SUCCESS,
        data,
    };
}

export function getUserRoleListFailure(data) {
    return {
        type: GET_USER_ROLE_LIST_FAILURE,
        data,
    };
}


export function updateMultipleUserRole(data) {
    return {
        type: UPDATE_MULTIPLE_USER_ROLE,
        data,
    };
}

export function updateMultipleUserRoleSuccess(data) {
    return {
        type: UPDATE_MULTIPLE_USER_ROLE_SUCCESS,
        data,
    };
}

export function updateMultipleUserRoleFailure(data) {
    return {
        type: UPDATE_MULTIPLE_USER_ROLE_FAILURE,
        data,
    };
}