import { call, put, takeEvery } from 'redux-saga/effects'
import { accessManagementList_API, updateAccess_API, } from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";

export default function* accessManagement() {
    yield takeEvery('GET_ACCESS_MANAGEMENT_LIST', getAccessManagement);
    yield takeEvery('UPDATE_ACCESS', udateAccess);
}

const getAccessManagementApi = async (url) => {
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

function* getAccessManagement(action) {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${accessManagementList_API}?role_id=${action.data.role_id}`
    // let params= `role_id=${action.data.role_id}`;
    // const URL = `${accessManagementList_API}?${encryptUrlData(params)}`;
    try {
        const response = yield call(getAccessManagementApi, URL);
        const accessManagementListDataRes = response;

        if (accessManagementListDataRes.statusCode === 200) {
            yield put({ type: 'GET_ACCESS_MANAGEMENT_LIST_SUCCESS', getAccessManagementList: accessManagementListDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (accessManagementListDataRes.statusCode === 401) {
                logOut('error', accessManagementListDataRes.message)
            } else {
                createNotification('error', accessManagementListDataRes.message);
                yield put({ type: 'GET_ACCESS_MANAGEMENT_LIST_FAILURE', message: accessManagementListDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'GET_ACCESS_MANAGEMENT_LIST_FAILURE', message: e.message });
    }
}

const udateAccessApi = async (data) => {
    try {
        const response = await instance.put(updateAccess_API, {
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
function* udateAccess(action) {
    const BODY = JSON.stringify({
        "id": action.data.id,
        "permission": action.data.permission,
    })
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(udateAccessApi, data);
        const UpdateAccessDataRes = response;

        if (UpdateAccessDataRes.statusCode === 200) {
            yield put({ type: 'UPDATE_ACCESS_SUCCESS', UpdateAccess: UpdateAccessDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', "Access updated successfully");
        } else {
            if (UpdateAccessDataRes.statusCode === 401) {
                logOut('error', UpdateAccessDataRes.message)
            } else {
                createNotification('error', UpdateAccessDataRes.message);
                yield put({ type: 'UPDATE_ACCESS_FAILURE', message: UpdateAccessDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'UPDATE_ACCESS_FAILURE', message: e.message });
    }
}
