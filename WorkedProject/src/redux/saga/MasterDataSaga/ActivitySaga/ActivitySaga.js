import { call, put, takeEvery } from 'redux-saga/effects'
import { getActivity_API, viewActivity_API, interestedGuestList_API, addActivity_API, updateActivity_API } from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";

export default function* viewActivities() {
    yield takeEvery('GET_ACTIVITY_LIST', viewAllActivity);
    yield takeEvery('VIEW_ACTIVITY_DETAILS', viewActivityById);
    yield takeEvery('GET_INTERESTED_GUEST_LIST', viewGuestListById);
    yield takeEvery('ADD_NEW_ACTIVITY', AddNewActivity);
    yield takeEvery('UPDATE_ACTIVITY', editActivityByID);
}

const getAllActivityList = async (URL) => {
    try {
        const response = await instance.get(URL);
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

function* viewAllActivity(action) {

    const URL = `${getActivity_API}?page_no=${action.data.pageNo}&page_size=${action.data.pageSize}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}${(action.data.filter_type) ? `&filter_type=${action.data.filter_type}` : ""}`

    // let params= `page_no=${action.data.pageNo}&page_size=${action.data.pageSize}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}${(action.data.filter_type) ? `&filter_type=${action.data.filter_type}` : ""}`;
    // const URL = `${getActivity_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });

    try {
        const response = yield call(getAllActivityList, URL);

        const viewActivityDataRes = response
        if (viewActivityDataRes.statusCode === 200) {
            yield put({ type: 'GET_ACTIVITY_LIST_SUCCESS', getActivityList: viewActivityDataRes });
            yield put({ type: 'GET_ACTIVITY_LIST_FAILURE', message: viewActivityDataRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewActivityDataRes.statusCode === 401) {
                logOut('error', viewActivityDataRes.message)
            } else {
                createNotification('error', viewActivityDataRes.message);
                yield put({ type: 'GET_ACTIVITY_LIST_FAILURE', message: viewActivityDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'GET_ACTIVITY_LIST_FAILURE', message: "Ananda programs data does not exists" });
    }
}


const getActivity = async (URL) => {
    try {
        const response = await instance.get(URL);
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

function* viewActivityById(action) {

    const URL = `${viewActivity_API}?activity_id=${action.data.activity_id}`

    // let params= `activity_id=${action.data.activity_id}`;
    // const URL = `${viewActivity_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });

    try {
        const response = yield call(getActivity, URL);

        const viewActivityByIdDataRes = response
        if (viewActivityByIdDataRes.statusCode === 200) {
            yield put({ type: 'VIEW_ACTIVITY_DETAILS_SUCCESS', viewActivityDetails: viewActivityByIdDataRes });
            yield put({ type: 'VIEW_ACTIVITY_DETAILS_FAILURE', message: viewActivityByIdDataRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewActivityByIdDataRes.statusCode === 401) {
                logOut('error', viewActivityByIdDataRes.message)
            } else {
                createNotification('error', viewActivityByIdDataRes.message);
                yield put({ type: 'VIEW_ACTIVITY_DETAILS_FAILURE', message: viewActivityByIdDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_ACTIVITY_DETAILS_FAILURE', message: "Ananda programs data does not exists" });
    }
}

const getGuest = async (URL) => {
    try {
        const response = await instance.get(URL);
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

function* viewGuestListById(action) {

    const URL = `${interestedGuestList_API}?activity_id=${action.data.activity_id}${(action.data.search_text) ? `&search_text=${action.data.search_text}` : ""}`

    // let params= `activity_id=${action.data.activity_id}${(action.data.search_text) ? `&search_text=${action.data.search_text}` : ""}`;
    // const URL = `${interestedGuestList_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });

    try {
        const response = yield call(getGuest, URL);

        const viewGuestByIdDataRes = response
        if (viewGuestByIdDataRes.statusCode === 200) {
            yield put({ type: 'GET_INTERESTED_GUEST_LIST_SUCCESS', getInterestedGuestList: viewGuestByIdDataRes });
            yield put({ type: 'GET_INTERESTED_GUEST_LIST_FAILURE', message: viewGuestByIdDataRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewGuestByIdDataRes.statusCode === 401) {
                logOut('error', viewGuestByIdDataRes.message)
            } else {
                createNotification('error', viewGuestByIdDataRes.message);
                yield put({ type: 'GET_INTERESTED_GUEST_LIST_FAILURE', message: viewGuestByIdDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'GET_INTERESTED_GUEST_LIST_FAILURE', message: "Ananda programs data does not exists" });
    }
}


const addNewActivityApi = async (data) => {
    try {
        const response = await instance.post(addActivity_API, {
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

function* AddNewActivity(action) {
    const BODY = {
        "title": action.data.title,
        "notes": action.data.notes,
        "activity_datetime": action.data.activity_datetime,
        "venue": action.data.venue,
        "is_repeated": action.data.is_repeated,
        "frequency": action.data.frequency,
        "no_of_capacity": action.data.no_of_capacity,
        "duration": action.data.duration,
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(addNewActivityApi, data);
        const addNewActivityDataRes = response;
        if (addNewActivityDataRes.statusCode === 200) {
            yield put({ type: 'ADD_NEW_ACTIVITY_SUCCESS', addNewActivity: addNewActivityDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', addNewActivityDataRes.message);
        } else {
            if (addNewActivityDataRes.statusCode === 401) {
                logOut('error', addNewActivityDataRes.message)
            } else {
                createNotification('error', addNewActivityDataRes.message);
                yield put({ type: 'ADD_NEW_ACTIVITY_FAILURE', message: addNewActivityDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'ADD_NEW_ACTIVITY_FAILURE', message: e.message });
    }
}


const editActivityApi = async (data) => {
    try {
        const response = await instance.put(updateActivity_API, {
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

function* editActivityByID(action) {
    const BODY = {
        "id": action.data.id,
        "title": action.data.title,
        "notes": action.data.notes,
        "activity_datetime": action.data.activity_datetime,
        "venue": action.data.venue,
        "no_of_capacity": action.data.no_of_capacity,
        "duration": action.data.duration,
        "is_repeated": action.data.is_repeated,
        "frequency": action.data.frequency
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(editActivityApi, data);
        const editActivityDataRes = response;
        if (editActivityDataRes.statusCode === 200) {
            yield put({ type: 'UPDATE_ACTIVITY_SUCCESS', updateActivity: editActivityDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', editActivityDataRes.message);
        } else {
            if (editActivityDataRes.statusCode === 401) {
                logOut('error', editActivityDataRes.message)
            } else {
                createNotification('error', editActivityDataRes.message);
                yield put({ type: 'UPDATE_ACTIVITY_FAILURE', message: editActivityDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'UPDATE_ACTIVITY_FAILURE', message: e.message });
    }
}
