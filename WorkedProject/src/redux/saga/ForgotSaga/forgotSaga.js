import { call, put, takeEvery } from 'redux-saga/effects'
import { Forgot_API } from '../../../Config/Api';
import { createNotification } from '../../../Config/NotificationToast';
import { logOut } from "../../../utils/Helper";
import { instance } from "../../auth/axiosInstance";

export default function* forgot() {
    yield takeEvery('FORGOT', forgotAdmin);
}

const forgotAdminApi = async (data) => {
    try {
        const response = await instance.post(Forgot_API, {
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

function* forgotAdmin(action) {
    const BODY = {
        "email_id": action.data.email_id,
    }
    const data = BODY;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(forgotAdminApi, data);
        const forgotDataRes = response;
        if (forgotDataRes.statusCode === 200) {
            yield put({ type: 'FORGOT_SUCCESS', forgot: forgotDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', forgotDataRes.message);
        } else {
            if (forgotDataRes.statusCode === 401) {
                logOut('error', forgotDataRes.message)
            } else {
                createNotification('error', forgotDataRes.message);
                yield put({ type: 'FORGOT_FAILURE', message: forgotDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'FORGOT_FAILURE', message: e.message });
    }
}