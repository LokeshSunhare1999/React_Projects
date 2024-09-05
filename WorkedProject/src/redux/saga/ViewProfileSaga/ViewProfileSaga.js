import { call, put, takeEvery } from 'redux-saga/effects'
import {
    ViewProfile_API
} from '../../../Config/Api';
import { createNotification } from '../../../Config/NotificationToast';
import { logOut } from "../../../utils/Helper";
import { instance } from "../../auth/axiosInstance";

export default function* viewAdminProfile() {
    yield takeEvery('VIEW_ADMIN_PROFILE', viewProfile);
}

const getApi = async (data) => {
    try {
        const response = await instance.get(ViewProfile_API);
        return response;
    } catch (errors) {
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* viewProfile() {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(getApi);
        const adminProfileDataRes = response;

        if (adminProfileDataRes.statusCode === 200) {
            yield put({ type: 'VIEW_ADMIN_PROFILE_SUCCESS', profileData: adminProfileDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (adminProfileDataRes.statusCode === 401) {
                logOut('error', adminProfileDataRes.message)
            } else {
                createNotification('error', adminProfileDataRes.message);
                yield put({ type: 'VIEW_ADMIN_PROFILE_FAILURE', message: adminProfileDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_ADMIN_PROFILE_FAILURE', message: e.message });
    }
}
