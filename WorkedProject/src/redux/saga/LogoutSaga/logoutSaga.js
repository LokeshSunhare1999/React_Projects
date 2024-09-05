import { call, put, takeEvery } from 'redux-saga/effects';
import { Logout_API } from '../../../Config/Api';
import { instance } from "../../auth/axiosInstance";
import { createNotification } from '../../../Config/NotificationToast';

export default function* logout() {
    yield takeEvery('LOGOUT', logoutAdmin);
}

const getApi = async (data) => {
    try {
        const response = await instance.get(Logout_API);
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

function* logoutAdmin() {
    try {
        const response = yield call(getApi);
        const logoutDataRes = response;
        yield put({ type: 'LOGOUT_SUCCESS', logout: logoutDataRes });
    } catch (e) {
        yield put({ type: 'LOGOUT_FAILURE', message: e.message });
    }
}
