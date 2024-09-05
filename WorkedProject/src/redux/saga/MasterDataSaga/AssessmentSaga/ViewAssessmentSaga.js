import { call, put, takeEvery } from 'redux-saga/effects'
import { ViewAssessment_API } from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";

export default function* viewAssessmentQuestion() {
    yield takeEvery('VIEW_ASSESSMENT', viewAssessmentQue);
}

const getApi = async (url) => {
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

function* viewAssessmentQue(action) {
    const URL = `${ViewAssessment_API}?section_id=${action.data.assessmentId}`
    // let params= `section_id=${action.data.assessmentId}`;
    // const URL = `${ViewAssessment_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(getApi, URL);
        const viewAssessmentDataRes = response;
        if (viewAssessmentDataRes.statusCode === 200) {
            yield put({ type: 'VIEW_ASSESSMENT_SUCCESS', viewAssessment: viewAssessmentDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', viewAssessmentDataRes.message);
        } else {
            if (viewAssessmentDataRes.statusCode === 401) {
                logOut('error', viewAssessmentDataRes.message)
            } else {
                createNotification('error', viewAssessmentDataRes.message);
                yield put({ type: 'VIEW_ASSESSMENT_FAILURE', message: viewAssessmentDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_ASSESSMENT_FAILURE', message: e.message });
    }
}
