import { call, put, takeEvery } from 'redux-saga/effects'
import { TeamMembersList_API, deleteTeamMember_API, addTeamMember_API, getUSerRoleList_API, getTeamMemberDetails_API, updateTeamMemberDetails_API, updateMultipleUserRole_API } from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";

export default function* viewTeamMembers() {
    yield takeEvery('VIEW_TEAM_MEMBERS', viewAllTeamMembers);
    yield takeEvery('DELETE_TEAM_MEMBER', deleteMember);
    yield takeEvery('ADD_NEW_TEAM_MEMBER', addNewTeamMember);
    yield takeEvery('GET_USER_ROLE_LIST', getUserRoleList);
    yield takeEvery('VIEW_TEAM_MEMBER_DETAILS', viewTeamMemberDetailsByID);
    yield takeEvery('UPDATE_TEAM_MEMBER_DETAILS', updateNewTeamMemberByID);
    yield takeEvery('UPDATE_MULTIPLE_USER_ROLE', UpdateUserRoleMultipleMemberByID);
}
const viewAllTeamMembersApi = async (url) => {
    try {
        const response = await instance.get(url);
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}
function* viewAllTeamMembers(action) {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${TeamMembersList_API}?page_no=${action.data.pageNo}&page_size=${action.data.pageSize}${(action.data.filter_type) ? `&filter_type=${action.data.filter_type}` : ""}${(action.data.filter_type) == 0 ? `&filter_type=${action.data.filter_type}` : ""}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}`
    // let params= `page_no=${action.data.pageNo}&page_size=${action.data.pageSize}${(action.data.filter_type) ? `&filter_type=${action.data.filter_type}` : ""}${(action.data.filter_type) == 0 ? `&filter_type=${action.data.filter_type}` : ""}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}`;
    // const URL = `${TeamMembersList_API}?${encryptUrlData(params)}`;
    try {
        const response = yield call(viewAllTeamMembersApi, URL);
        const viewTeamMembersDataRes = response;

        if (viewTeamMembersDataRes.statusCode === 200) {
            yield put({ type: 'VIEW_TEAM_MEMBERS_SUCCESS', viewTeamMembers: viewTeamMembersDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewTeamMembersDataRes.statusCode === 401) {
                logOut('error', viewTeamMembersDataRes.message)
            } else {
                createNotification('error', viewTeamMembersDataRes.message);
                yield put({ type: 'VIEW_TEAM_MEMBERS_FAILURE', message: viewTeamMembersDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_TEAM_MEMBERS_FAILURE', message: e.message });
    }
}


const addNewTeamMemberApi = async (data) => {
    try {
        const response = await instance.post(addTeamMember_API, {
            data,
        });
        return response;
    } catch (errors) {
        console.log("errors", errors);
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* addNewTeamMember(action) {
    const BODY = {
        "first_name": action.data.first_name,
        "last_name": action.data.last_name,
        "email_id": action.data.email_id,
        "phone_no": action.data.phone_no,
        "user_role_id": action.data.user_role_id,
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(addNewTeamMemberApi, data);
        const addNewTeamMemberDataRes = response;

        if (addNewTeamMemberDataRes.statusCode === 200) {
            yield put({ type: 'ADD_NEW_TEAM_MEMBER_SUCCESS', addNewTeamMember: addNewTeamMemberDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', addNewTeamMemberDataRes.message);
        } else {
            if (addNewTeamMemberDataRes.statusCode === 401) {
                logOut('error', addNewTeamMemberDataRes.message)
            } else {
                createNotification('error', addNewTeamMemberDataRes.message);
                yield put({ type: 'ADD_NEW_TEAM_MEMBER_FAILURE', message: addNewTeamMemberDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'ADD_NEW_TEAM_MEMBER_FAILURE', message: e.message });
    }
}


const updateNewTeamMemberByIDApi = async (data) => {
    try {
        const response = await instance.put(updateTeamMemberDetails_API, {
            data,
        });
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}
function* updateNewTeamMemberByID(action, navigate) {
    const BODY = {
        "first_name": action.data.first_name,
        "last_name": action.data.last_name,
        "email_id": action.data.email_id,
        "phone_number": action.data.phone_number,
        "user_id": action.data.user_id,
        "role_id": action.data.role_id,
        "role_title": action.data.role_title,
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(updateNewTeamMemberByIDApi, data);
        const updateNewTeamMemberDataRes = response;

        if (updateNewTeamMemberDataRes.statusCode === 200) {
            yield put({ type: 'UPDATE_TEAM_MEMBER_DETAILS_SUCCESS', updateTeamMemberDetails: updateNewTeamMemberDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', updateNewTeamMemberDataRes.message);
            action.navigate(-1)
        } else {
            if (updateNewTeamMemberDataRes.statusCode === 401) {
                logOut('error', updateNewTeamMemberDataRes.message)
            } else {
                createNotification('error', updateNewTeamMemberDataRes.message);
                yield put({ type: 'UPDATE_TEAM_MEMBER_DETAILS_FAILURE', message: updateNewTeamMemberDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'UPDATE_TEAM_MEMBER_DETAILS_FAILURE', message: e.message });
    }
}

const deleteMemberApi = async (data) => {
    try {
        const response = await instance.delete(deleteTeamMember_API, {
            data,
        });
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* deleteMember(action) {
    const BODY = JSON.stringify({
        "feature_type": action.data.feature_type,
        "ids": action.data.ids
    })

    const data = { data: BODY };

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(deleteMemberApi, data);
        const deleteTeamMemberDataRes = response;

        if (deleteTeamMemberDataRes.statusCode === 200) {
            yield put({ type: 'DELETE_TEAM_MEMBER_SUCCESS', deleteTeamMember: deleteTeamMemberDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', deleteTeamMemberDataRes.message);
        } else {
            if (deleteTeamMemberDataRes.statusCode === 401) {
                logOut('error', deleteTeamMemberDataRes.message)
            } else {
                createNotification('error', deleteTeamMemberDataRes.message);
                yield put({ type: 'DELETE_TEAM_MEMBER_FAILURE', message: deleteTeamMemberDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'DELETE_TEAM_MEMBER_FAILURE', message: e.message });
    }
}

const getUserRoleListApi = async (url) => {
    try {
        const response = await instance.get(url);
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* getUserRoleList(action) {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${getUSerRoleList_API}?${(action.data.pageNo) ? `page_no=${action.data.pageNo}` : ""}${(action.data.pageSize) ? `&page_size=${action.data.pageSize}` : ""}${(action.data.is_team_list_req) ? `is_team_list_req=${action.data.is_team_list_req}` : ""}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}`
    // let params= `${(action.data.pageNo) ? `page_no=${action.data.pageNo}` : ""}${(action.data.pageSize) ? `&page_size=${action.data.pageSize}` : ""}${(action.data.is_team_list_req) ? `is_team_list_req=${action.data.is_team_list_req}` : ""}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}`;
    // const URL = `${getUSerRoleList_API}?${encryptUrlData(params)}`;
    try {
        const response = yield call(getUserRoleListApi, URL);
        const getUserRoleDataRes = response;

        if (getUserRoleDataRes.statusCode === 200) {
            yield put({ type: 'GET_USER_ROLE_LIST_SUCCESS', getUserRoleList: getUserRoleDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (getUserRoleDataRes.statusCode === 401) {
                logOut('error', getUserRoleDataRes.message)
            } else {
                createNotification('error', getUserRoleDataRes.message);
                yield put({ type: 'GET_USER_ROLE_LIST_FAILURE', message: getUserRoleDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'GET_USER_ROLE_LIST_FAILURE', message: e.message });
    }
}

const viewTeamMemberDetailsByIDApi = async (url) => {
    try {
        const response = await instance.get(url);
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* viewTeamMemberDetailsByID(action) {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${getTeamMemberDetails_API}?user_id=${action.data.user_id}&user_type=${action.data.user_type}`
    // let params= `user_id=${action.data.user_id}&user_type=${action.data.user_type}`;
    // const URL = `${getTeamMemberDetails_API}?${encryptUrlData(params)}`;
    try {
        const response = yield call(viewTeamMemberDetailsByIDApi, URL);
        const viewTeamMemberDetailsData = response;

        if (viewTeamMemberDetailsData.statusCode === 200) {
            yield put({ type: 'VIEW_TEAM_MEMBER_DETAILS_SUCCESS', viewTeamMemberDetails: viewTeamMemberDetailsData });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', viewTeamMemberDetailsData.message);
        } else {
            if (viewTeamMemberDetailsData.statusCode === 401) {
                logOut('error', viewTeamMemberDetailsData.message)
            } else {
                createNotification('error', viewTeamMemberDetailsData.message);
                yield put({ type: 'VIEW_TEAM_MEMBER_DETAILS_FAILURE', message: viewTeamMemberDetailsData.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_TEAM_MEMBER_DETAILS_FAILURE', message: e.message });
    }
}

const UpdateUserRoleMultiMemberByIDApi = async (data) => {
    try {
        const response = await instance.put(updateMultipleUserRole_API, {
            data,
        });
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* UpdateUserRoleMultipleMemberByID(action) {
    const BODY = {
        "ids": action.data.ids,
        "role_id": action.data.role_id,
        "role_title": action.data.role_title
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(UpdateUserRoleMultiMemberByIDApi, data);
        const updateRoleMultipleMemberDataRes = response;

        if (updateRoleMultipleMemberDataRes.statusCode === 200) {
            yield put({ type: 'UPDATE_MULTIPLE_USER_ROLE_SUCCESS', updateMultipleUserRole: updateRoleMultipleMemberDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', updateRoleMultipleMemberDataRes.message);
        } else {
            if (updateRoleMultipleMemberDataRes.statusCode === 401) {
                logOut('error', updateRoleMultipleMemberDataRes.message)
            } else {
                createNotification('error', updateRoleMultipleMemberDataRes.message);
                yield put({ type: 'UPDATE_MULTIPLE_USER_ROLE_FAILURE', message: updateRoleMultipleMemberDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'UPDATE_MULTIPLE_USER_ROLE_FAILURE', message: e.message });
    }
}

