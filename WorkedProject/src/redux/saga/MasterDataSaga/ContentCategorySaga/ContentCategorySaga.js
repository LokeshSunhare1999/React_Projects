import { call, put, takeEvery } from 'redux-saga/effects'
import { getContentCategoryList_API, } from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";

export default function* contentCategory() {
    yield takeEvery('GET_CONTENTS_CATEGORY_LIST', getContentCategoryListAPI);
}

const getContentsCatListApi = async (url) => {
    try {
        const response = await instance.get(url);
        console.log("response", response);
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

function* getContentCategoryListAPI(action) {
    const URL = `${getContentCategoryList_API}?page_no=${action.data.page_no}&page_size=${action.data.page_size}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}`

    // let params= `page_no=${action.data.page_no}&page_size=${action.data.page_size}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}`;
    // const URL = `${getContentCategoryList_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(getContentsCatListApi, URL);
        const getContentCategoryRes = response;

        if (getContentCategoryRes.statusCode === 200) {
            yield put({ type: 'GET_CONTENTS_CATEGORY_LIST_SUCCESS', getContentCategoryRes: getContentCategoryRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            yield put({ type: 'GET_CONTENTS_CATEGORY_LIST_FAILURE', message: getContentCategoryRes.message });
        } else {
            if (getContentCategoryRes.statusCode === 401) {
                logOut('error', getContentCategoryRes.message)
            } else {
                createNotification('error', getContentCategoryRes.message);
                yield put({ type: 'GET_CONTENTS_CATEGORY_LIST_FAILURE', message: getContentCategoryRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'GET_CONTENTS_LIST_FAILURE', message: "No data found" });
    }
}
