import { call, put, takeEvery } from 'redux-saga/effects'
import { getTestimonialsList_API, viewTestimonials_API, approveRejectTestimonials_API } from '../../../Config/Api';
import { createNotification } from '../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../utils/Helper";
import { instance } from "../../auth/axiosInstance";

export default function* Testimonials() {
    yield takeEvery('GET_TESTIMONIALS_LIST', getAllTestimonialsList);
    yield takeEvery('VIEW_TESTIMONIALS_DETAILS', viewTestimonialsByID);
    yield takeEvery('APPROVE_REJECT_TESTIMONIALS', approveRejectTestimonialsByID);
}

const getApi = async (URL) => {
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

function* getAllTestimonialsList(action) {
    const URL = `${getTestimonialsList_API}?page_no=${action.data.page_no}&page_size=${action.data.page_size}&filter_type=${action.data.filter_type}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}`

    // let params= `page_no=${action.data.page_no}&page_size=${action.data.page_size}&filter_type=${action.data.filter_type}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}`;
    // const URL = `${getTestimonialsList_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(getApi, URL);
        const testimonialsListDataRes = response;

        if (testimonialsListDataRes.statusCode === 200) {
            yield put({ type: 'GET_TESTIMONIALS_LIST_SUCCESS', getTestimonialsList: testimonialsListDataRes });
            yield put({ type: 'GET_TESTIMONIALS_LIST_FAILURE', message: testimonialsListDataRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            createNotification('error', testimonialsListDataRes.message);
            yield put({ type: 'GET_TESTIMONIALS_LIST_FAILURE', message: testimonialsListDataRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        }
    } catch (e) {
        yield put({ type: 'GET_TESTIMONIALS_LIST_FAILURE', message: "No data found" });
    }
}

const viewTestimonialsByIDApi = async (url) => {
    try {
        const response = await instance.get(url);
        console.log("response", response);
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
function* viewTestimonialsByID(action) {
    // const URL = `${viewTestimonials_API}?id=${action.data.id}`

    let params= `id=${action.data.id}`;
    const URL = `${viewTestimonials_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(viewTestimonialsByIDApi, URL);
        const viewTestimonialsDataRes = response;

        if (viewTestimonialsDataRes.statusCode === 200) {
            yield put({ type: 'VIEW_TESTIMONIALS_DETAILS_SUCCESS', viewTestimonialsDetails: viewTestimonialsDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            yield put({ type: 'GET_TESTIMONIALS_LIST_FAILURE', message: viewTestimonialsDataRes.message });
        } else {
            createNotification('error', viewTestimonialsDataRes.message);
            yield put({ type: 'VIEW_TESTIMONIALS_DETAILS_FAILURE', message: viewTestimonialsDataRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        }
    } catch (e) {
        yield put({ type: 'VIEW_TESTIMONIALS_DETAILS_FAILURE', message: e.message });
    }
}




const changeStatusApproveTestByIDApi = async (data) => {
    try {
        const response = await instance.post(approveRejectTestimonials_API, {
            data,
        });
        console.log("response", response);
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
function* approveRejectTestimonialsByID(action) {
    const BODY = JSON.stringify({
        "id": action.data.id,
        "status": action.data.status,
    })
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(changeStatusApproveTestByIDApi, data);
        const approveRejectTestimonialsRes = response;

        if (approveRejectTestimonialsRes.statusCode === 200) {
            yield put({ type: 'APPROVE_REJECT_TESTIMONIALS_SUCCESS', approveRejectTestimonials: approveRejectTestimonialsRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', approveRejectTestimonialsRes.message);
        } else {
            createNotification('error', approveRejectTestimonialsRes.message);
            yield put({ type: 'APPROVE_REJECT_TESTIMONIALS_FAILURE', message: approveRejectTestimonialsRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        }
    } catch (e) {
        yield put({ type: 'APPROVE_REJECT_TESTIMONIALS_FAILURE', message: e.message });
    }
}

