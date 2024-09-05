import { call, put, takeEvery } from 'redux-saga/effects'
import { AllPrograms_API } from '../../../Config/Api';
import { createNotification } from '../../../Config/NotificationToast';
import { logOut } from "../../../utils/Helper";
import { instance } from "../../auth/axiosInstance";

export default function* Events() {
    yield takeEvery('GET_EVENTS_LIST', getAllEventsList);
}

const getEventApi = async (data) => {
    try {
        const response = await instance.post(AllPrograms_API, {
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

function* getAllEventsList(action) {
    const BODY = {
        "page_no": action.data.page_no,
        "page_size": action.data.page_size,
        "filter_type": action.data.filter_type,
        "filter_text": action.data.filter_text
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(getEventApi, data);
        const getEventsDataRes = response;
        if (getEventsDataRes.statusCode === 200) {
            yield put({ type: 'GET_EVENTS_LIST_SUCCESS', getEventsList: getEventsDataRes });
            yield put({ type: 'GET_EVENTS_LIST_FAILURE', message: getEventsDataRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            createNotification('error', getEventsDataRes.message);
            yield put({ type: 'GET_EVENTS_LIST_FAILURE', message: getEventsDataRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        }
    } catch (e) {
        yield put({ type: 'GET_EVENTS_LIST_FAILURE', message: "No data found" });
    }
}
