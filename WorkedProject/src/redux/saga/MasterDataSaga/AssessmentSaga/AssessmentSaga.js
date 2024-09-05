import { call, put, takeEvery } from 'redux-saga/effects'
import { AllAssessment_API } from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";

export default function* viewAssessments() {
    yield takeEvery('VIEW_ASSESSMENTS', viewAllAssessments);
}

const getApi = async (URL) => {
    try {
        const response = await instance.get(URL);
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

function* viewAllAssessments(action) {

    const URL = `${AllAssessment_API}?page_no=${action.data.pageNo}&page_size=${action.data.pageSize}${(action.data.search_text) ? `&search_text=${action.data.search_text}` : ""}`
    // let params= `page_no=${action.data.pageNo}&page_size=${action.data.pageSize}${(action.data.search_text) ? `&search_text=${action.data.search_text}` : ""}`;
    // const URL = `${AllAssessment_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(getApi, URL);

        const viewAssessmentsDataRes = response;
        if (viewAssessmentsDataRes.statusCode === 200) {
            yield put({ type: 'VIEW_ASSESSMENTS_SUCCESS', viewAssessments: viewAssessmentsDataRes });
            yield put({ type: 'VIEW_ASSESSMENTS_FAILURE', message: viewAssessmentsDataRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewAssessmentsDataRes.statusCode === 401) {
                logOut('error', viewAssessmentsDataRes.message)
            } else {
                createNotification('error', viewAssessmentsDataRes.message);
                yield put({ type: 'VIEW_ASSESSMENTS_FAILURE', message: viewAssessmentsDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_ASSESSMENTS_FAILURE', message: "Ananda self assessment data does not exists" });
    }
}


