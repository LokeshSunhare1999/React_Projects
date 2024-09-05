import { call, put, takeEvery } from 'redux-saga/effects'
import { addNewUserRole_API, deleteUserRole_API, updateUserRole_API, } from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";

export default function* userRole() {
    yield takeEvery('DELETE_USER_ROLE_TITLE', deleteUserRole);
    yield takeEvery('ADD_NEW_USER_ROLE', addNewUserRole);
    yield takeEvery('UPDATE_USER_ROLE_TITLE', updateUserRoleTitle);
}

const addNewUserRoleApi = async (data) => {
    try {
        const response = await instance.post(addNewUserRole_API, {
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

function* addNewUserRole(action) {
    const BODY = {
        "role_title": action.data.role_title,
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(addNewUserRoleApi, data);
        const addNewUserRoleDataRes = response;

        if (addNewUserRoleDataRes.statusCode === 200) {
            yield put({ type: 'ADD_NEW_USER_ROLE_SUCCESS', addNewUserRole: addNewUserRoleDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', addNewUserRoleDataRes.message);
        } else {
            if (addNewUserRoleDataRes.statusCode === 401) {
                logOut('error', addNewUserRoleDataRes.message)
            } else {
                createNotification('error', addNewUserRoleDataRes.message);
                yield put({ type: 'ADD_NEW_USER_ROLE_FAILURE', message: addNewUserRoleDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'ADD_NEW_USER_ROLE_FAILURE', message: e.message });
    }
}

const updateUserRoleTitleApi = async (data) => {
    try {
        const response = await instance.put(updateUserRole_API, {
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

function* updateUserRoleTitle(action) {
    const BODY = {
        "role_id": action.data.role_id,
        "update_role_title": action.data.update_role_title,
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(updateUserRoleTitleApi, data);
        const updateUserRoleDataRes = response;

        if (updateUserRoleDataRes.statusCode === 200) {
            yield put({ type: 'UPDATE_USER_ROLE_TITLE_SUCCESS', UpdateUserRoleTitle: updateUserRoleDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', updateUserRoleDataRes.message);
        } else {
            if (updateUserRoleDataRes.statusCode === 401) {
                logOut('error', updateUserRoleDataRes.message)
            } else {
                createNotification('error', updateUserRoleDataRes.message);
                yield put({ type: 'UPDATE_USER_ROLE_TITLE_FAILURE', message: updateUserRoleDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'UPDATE_USER_ROLE_TITLE_FAILURE', message: e.message });
    }
}

const deleteUserRoleApi = async (url) => {
    try {
        const response = await instance.put(url);
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

function* deleteUserRole(action) {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${deleteUserRole_API}/${action.data.role_id}`
    // let params= `${action.data.role_id}`;
    // const URL = `${deleteUserRole_API}?${encryptUrlData(params)}`;
    try {
        const response = yield call(deleteUserRoleApi, URL);
        const deleteUserRoleDataRes = response;

        if (deleteUserRoleDataRes.statusCode === 200) {
            yield put({ type: 'DELETE_USER_ROLE_TITLE_SUCCESS', deleteUserRoleTitle: deleteUserRoleDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', deleteUserRoleDataRes.message);
        } else {
            if (deleteUserRoleDataRes.statusCode === 401) {
                logOut('error', deleteUserRoleDataRes.message)
            } else {
                createNotification('error', deleteUserRoleDataRes.message);
                yield put({ type: 'DELETE_USER_ROLE_TITLE_FAILURE', message: deleteUserRoleDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'DELETE_USER_ROLE_TITLE_FAILURE', message: e.message });
    }
}

