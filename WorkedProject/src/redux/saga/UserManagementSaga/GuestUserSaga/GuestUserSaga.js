import { call, put, takeEvery } from 'redux-saga/effects'
import {
    AllGuest_API,
    ViewGuestDetails_API,
    AddNewGuest_API,
    UpdateGuestDetails_API
} from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";

export default function* guestUser() {
    yield takeEvery('VIEW_GUEST_USERS', viewGuestUsers);
    yield takeEvery('VIEW_GUEST_USER_DETAILS', viewGuestUserDetails);
    yield takeEvery('ADD_NEW_GUEST', addNewGuest);
    yield takeEvery('UPDATE_GUEST_DETAILS', updateGuestDetails);
}

const viewGuestUsersApi = async (URL) => {
    try {
        const response = await instance.get(URL);
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

function* viewGuestUsers(action) {
    const URL = `${AllGuest_API}?page_no=${action.data.page_no}&page_size=${action.data.page_size}&role_id=${1}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}${(action.data.start_date) ? `&start_date=${action.data.start_date}` : ""}${(action.data.end_date) ? `&end_date=${action.data.end_date}` : ""}${(action.data.program) ? `&program=${action.data.program}` : ""}`

    // let params= `page_no=${action.data.page_no}&page_size=${action.data.page_size}&role_id=${1}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}${(action.data.start_date) ? `&start_date=${action.data.start_date}` : ""}${(action.data.end_date) ? `&end_date=${action.data.end_date}` : ""}${(action.data.program) ? `&program=${action.data.program}` : ""}`;
    // const URL = `${AllGuest_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(viewGuestUsersApi, URL);
        const viewProgramsDataRes = response;

        if (viewProgramsDataRes.statusCode === 200) {
            yield put({ type: 'VIEW_GUEST_USERS_SUCCESS', viewPrograms: viewProgramsDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            yield put({ type: 'VIEW_GUEST_USERS_FAILURE', message: viewProgramsDataRes.message });
        } else {
            if (viewProgramsDataRes.statusCode === 401) {
                logOut('error', viewProgramsDataRes.message)
            } else {
                createNotification('error', viewProgramsDataRes.message);
                yield put({ type: 'VIEW_GUEST_USERS_FAILURE', message: viewProgramsDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_GUEST_USERS_FAILURE', message: "No data available to show for guests users" });
    }
}

const viewGuestUserDetailsApi = async (url) => {
    try {
        const response = await instance.get(url);
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
function* viewGuestUserDetails(action) {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${ViewGuestDetails_API}?user_id=${action.data.user_id}`
    // let params= `user_id=${action.data.user_id}`;
    // const URL = `${ViewGuestDetails_API}?${encryptUrlData(params)}`;
    try {
        const response = yield call(viewGuestUserDetailsApi, URL);
        const viewGuestDetailsRes = response;

        if (viewGuestDetailsRes.statusCode === 200) {
            yield put({ type: 'VIEW_GUEST_USER_DETAILS_SUCCESS', viewGuestDetailsRes: viewGuestDetailsRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewGuestDetailsRes.statusCode === 401) {
                logOut('error', viewGuestDetailsRes.message)
            } else {
                createNotification('error', viewGuestDetailsRes.message);
                yield put({ type: 'VIEW_GUEST_USER_DETAILS_FAILURE', message: viewGuestDetailsRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {

        createNotification('warning', "Something went wrong");
        yield put({ type: 'VIEW_GUEST_USER_DETAILS_FAILURE', message: e.message });
    }
}

const addNewGuestApi = async (data) => {
    try {
        const response = await instance.post(AddNewGuest_API, {
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

function* addNewGuest(action) {
    const BODY = {
        "first_name": action.data.first_name,
        "last_name": action.data.last_name,
        "email_id": action.data.email_id,
        "phone_no": action.data.phone_no,
        "user_role_id": action.data.user_role_id
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(addNewGuestApi, data);
        const addNewGuestRes = response;

        if (addNewGuestRes.statusCode === 200) {
            yield put({ type: 'ADD_NEW_GUEST_SUCCESS', addNewGuestRes: addNewGuestRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', addNewGuestRes.message);
        } else {
            if (addNewGuestRes.statusCode === 401) {
                logOut('error', addNewGuestRes.message)
            } else {
                createNotification('error', addNewGuestRes.message);
                yield put({ type: 'ADD_NEW_GUEST_FAILURE', message: addNewGuestRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'ADD_NEW_GUEST_FAILURE', message: e.message });
    }
}

const updateGuestDetailsApi = async (data) => {
    try {
        const response = await instance.put(UpdateGuestDetails_API, {
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
function* updateGuestDetails(action) {
    const BODY = {
        "first_name": action.data.first_name,
        "last_name": action.data.last_name,
        "email_id": action.data.email_id,
        "phone_number": action.data.phone_number,
        "user_id": action.data.user_id,
        "start_date": action.data.start_date,
        "end_date": action.data.end_date,
        "program_id": action.data.program_id
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(updateGuestDetailsApi, data);
        const updateUserDetailsRes = response;

        if (updateUserDetailsRes.statusCode === 200) {
            yield put({ type: 'UPDATE_GUEST_DETAILS_SUCCESS', updateUserDetailsRes: updateUserDetailsRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', updateUserDetailsRes.message);
        } else {
            if (updateUserDetailsRes.statusCode === 401) {
                logOut('error', updateUserDetailsRes.message)
            } else {
                createNotification('error', updateUserDetailsRes.message);
                yield put({ type: 'UPDATE_GUEST_DETAILS_FAILURE', message: updateUserDetailsRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'UPDATE_GUEST_DETAILS_FAILURE', message: e.message });
    }
}
