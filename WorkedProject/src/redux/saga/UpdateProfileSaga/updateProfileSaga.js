import { call, put, takeEvery } from 'redux-saga/effects'
import { UpdateProfile_API } from '../../../Config/Api';
import { createNotification } from '../../../Config/NotificationToast';
import { logOut } from "../../../utils/Helper";
import { instance } from "../../auth/axiosInstance";

export default function* updateProfile() {
    yield takeEvery('UPDATE_PROFILE', updateProfileAdmin);
}

const getApi = async (data) => {
    try {
        const response = await instance.put(UpdateProfile_API, {
            data,
        });
        return response;
    } catch (errors) {
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

function* updateProfileAdmin(action) {
    const BODY = {
        "first_name": action.data.first_name,
        "last_name": action.data.last_name,
        "current_password": action.data.current_password,
        "password": action.data.password,
        "confirm_password": action.data.confirm_password,
        "password_reset": action.data.password_reset,
    }
    const data = BODY;


    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(getApi, data);
        const updateProfileDataRes = response;

        if (updateProfileDataRes.statusCode === 200) {
            yield put({ type: 'UPDATE_PROFILE_SUCCESS', updateProfile: updateProfileDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (updateProfileDataRes.statusCode === 401) {
                logOut('error', updateProfileDataRes.message)
            } else {
                createNotification('error', updateProfileDataRes.message);
                yield put({ type: 'UPDATE_PROFILE_FAILURE', message: updateProfileDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'UPDATE_PROFILE_FAILURE', message: e.message });
    }
}
