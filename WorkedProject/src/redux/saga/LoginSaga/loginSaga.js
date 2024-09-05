import { call, put, takeEvery } from 'redux-saga/effects'
import { Login_API } from '../../../Config/Api';
import { createNotification } from '../../../Config/NotificationToast';
import { logOut } from "../../../utils/Helper";
import { instance } from "../../auth/axiosInstance";

export default function* login() {
    yield takeEvery('LOGIN', loginAdmin);
}

function getApi(action) {
    const BODY = {
        "email_id": action.data.email_id,
        "password": action.data.password,
        "device_token": "string",
        "device_type": "desktop",
        "device_model": "macOs",
        "os_version": "13.1",
        "device_ip": "ffskngj3456nsjdvs"
    }
    const data = BODY;
    return instance.post(Login_API, { data }

    )
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (
                errors.response?.data.statusCode === 400) {
                createNotification('error', errors.response.data.message);
                return
            } if (errors.response.data.statusCode === 401) {
                logOut('error', errors.response.data.message);
                createNotification('error', errors.response.data.message);
            } else {
                createNotification('warning', "Something went wrong");
            }
            return errors

        })
}

function* loginAdmin(action) {

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const loginDataRes = yield call(getApi, action);
        if (loginDataRes.statusCode === 200) {
            localStorage.setItem("UDID", loginDataRes.data.access_token)
            localStorage.setItem("UserData", JSON.stringify(loginDataRes.data))
            localStorage.setItem("IsLogin", true)
            yield put({ type: 'LOGIN_SUCCESS', login: loginDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', loginDataRes.message);
        } else {
            createNotification('error', loginDataRes.message);
            if (loginDataRes.statusCode === 401) {
                logOut('error', loginDataRes.message)
            } else if (loginDataRes.statusCode === 400 && loginDataRes.message === "Invalid email address") {
                yield put({ type: 'LOGIN_FAILURE', message: loginDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'LOADING_FAILURE', loading: false });
    }
}
