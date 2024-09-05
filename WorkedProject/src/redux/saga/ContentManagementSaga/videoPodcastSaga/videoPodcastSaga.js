import { call, put, takeEvery } from 'redux-saga/effects'
import {
    ContentsList_API,
    ViewContentDetails_API,
    AddVideoPodcast_API,
    UpdateVideoPodcast_API,
    ViewProgramsList_API,
    ViewCategoryList_API
} from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";
import { getDataFromFirebase } from '../../../../Config/commonFirebaseImage';

export default function* videoPodcast() {
    yield takeEvery('GET_CONTENTS_LIST', getContentsList);
    yield takeEvery('VIEW_CONTENT_DETAILS', viewContentDetails);
    yield takeEvery('ADD_VIDEO_PODCAST', addVideoPodcast);
    yield takeEvery('UPDATE_VIDEO_PODCAST', updateVideoPodcast);
    yield takeEvery('GET_PROGRAMS_LIST', getProgramsList);
    yield takeEvery('GET_CATEGORY_LIST', getCategoryList);
}

const getContentsListApi = async (url) => {
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

function* getContentsList(action) {
    const URL = `${ContentsList_API}?page_no=${action.data.pageNo}&page_size=${action.data.pageSize}&filter_type=${action.data.filter_type}&category=${action.data.category}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}`
    // let params= `page_no=${action.data.pageNo}&page_size=${action.data.pageSize}&filter_type=${action.data.filter_type}&category=${action.data.category}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}`;
    // const URL = `${ContentsList_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(getContentsListApi, URL);
        const contentsListDataRes = response;
        if (contentsListDataRes.statusCode === 200) {
            if (response && response?.data && response?.data?.content_data && response?.data?.content_data?.length > 0) {
                let ContentData = response?.data?.content_data
                for (let contentItem of ContentData) {
                    if (contentItem?.media) {
                        if ((contentItem.media!== "")) {
                            contentItem.media = yield getDataFromFirebase(contentItem.media);
                        }
                    }
                    if (contentItem?.media_thumbnail) {
                        if ((contentItem.media_thumbnail !== "")) {
                            contentItem.media_thumbnail = yield getDataFromFirebase(contentItem.media_thumbnail);
                        }
                    }
                    response.data.content_data = ContentData;
                }
                yield put({ type: 'GET_CONTENTS_LIST_SUCCESS', contentList: response });
            }
            yield put({ type: 'LOADING_FAILURE', loading: false });
            yield put({ type: 'GET_CONTENTS_LIST_FAILURE', message: contentsListDataRes.message });
        } else {
            if (contentsListDataRes.statusCode === 401) {
                logOut('error', contentsListDataRes.message)
            } else {
                createNotification('error', contentsListDataRes.message);
                yield put({ type: 'GET_CONTENTS_LIST_FAILURE', message: contentsListDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'GET_CONTENTS_LIST_FAILURE', message: "No data found" });
    }
}

const getProgramsListApi = async (url) => {
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

function* getProgramsList(action) {

    const URL = `${ViewProgramsList_API}${(action.data.filter_text !== "") ? `?filter_text=${action.data.filter_text}` : ""}`
    // let params= `${(action.data.filter_text !== "") ? `?filter_text=${action.data.filter_text}` : ""}`;
    // const URL = `${ViewProgramsList_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(getProgramsListApi, URL);
        const contentsListDataRes = response;
        if (contentsListDataRes.statusCode === 200) {
            yield put({ type: 'GET_PROGRAMS_LIST_SUCCESS', programsList: contentsListDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (contentsListDataRes.statusCode === 401) {
                logOut('error', contentsListDataRes.message)
            } else {
                createNotification('error', contentsListDataRes.message);
                yield put({ type: 'GET_PROGRAMS_LIST_FAILURE', message: contentsListDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'GET_PROGRAMS_LIST_FAILURE', message: e.message });
    }
}


const getCategoryListApi = async (url) => {
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

function* getCategoryList() {
    const URL = `${ViewCategoryList_API}`
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(getCategoryListApi, URL);
        const contentsCategoryRes = response;
        if (contentsCategoryRes.statusCode === 200) {
            yield put({ type: 'GET_CATEGORY_LIST_SUCCESS', categoryList: contentsCategoryRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (contentsCategoryRes.statusCode === 401) {
                logOut('error', contentsCategoryRes.message)
            } else {
                createNotification('error', contentsCategoryRes.message);
                yield put({ type: 'GET_CATEGORY_LIST_FAILURE', message: contentsCategoryRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'GET_CATEGORY_LIST_FAILURE', message: e.message });
    }
}

const viewContentDetailsApi = async (url) => {
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


function* viewContentDetails(action) {

    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${ViewContentDetails_API}?content_id=${action.data.content_id}`
    // let params= `content_id=${action.data.content_id}`;
    // const URL = `${ViewContentDetails_API}?${encryptUrlData(params)}`;
    try {
        const response = yield call(viewContentDetailsApi, URL);
        const viewGuestDetailsRes = response;

        if (viewGuestDetailsRes.statusCode === 200) {
            if (response && response?.data && response?.data && response?.data.length > 0) {
                let ContentData = response?.data
                for (let contentItem of ContentData) {
                    if (contentItem?.media) {
                        if ((contentItem.media!== "")) {
                            contentItem.media = yield getDataFromFirebase(contentItem.media);
                        }
                    }
                    if (contentItem?.media_thumbnail) {
                        if ((contentItem.media_thumbnail !== "")) {
                            contentItem.media_thumbnail = yield getDataFromFirebase(contentItem.media_thumbnail);
                        }
                    }
                    response.data.content_data = ContentData;
                }
                yield put({ type: 'VIEW_CONTENT_DETAILS_SUCCESS', viewContent: viewGuestDetailsRes });
            }
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewGuestDetailsRes.statusCode === 401) {
                logOut('error', viewGuestDetailsRes.message)
            } else {
                createNotification('error', viewGuestDetailsRes.message);
                yield put({ type: 'VIEW_CONTENT_DETAILS_FAILURE', message: viewGuestDetailsRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_CONTENT_DETAILS_FAILURE', message: e.message });
    }
}

const addVideoPodcastApi = async (data) => {
    try {
        const response = await instance.post(AddVideoPodcast_API, {
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
function* addVideoPodcast(action) {
    const BODY = {
        "content_category": action.data.content_category,
        "program_id": action.data.program_id,
        "category_id": action.data.category_id,
        "title": action.data.title,
        "description": action.data.description,
        "media": action.data.media,
        "media_thumbnail": action.data.media_thumbnail,
        "media_type": action.data.media_type,
        "duration": action.data.duration,
        "content_type": action.data.content_type,
        "amount": action.data.amount,
        "publish_by": action.data.publish_by,
        "content_version": action.data.content_version
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const addVideoPodcastRes = yield call(addVideoPodcastApi, data);
        if (addVideoPodcastRes.statusCode === 200) {
            yield put({ type: 'ADD_VIDEO_PODCAST_SUCCESS', addVideoPodcast: addVideoPodcastRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', addVideoPodcastRes.message);
        } else {
            if (addVideoPodcastRes.statusCode === 401) {
                logOut('error', addVideoPodcastRes.message)
            } else {
                createNotification('error', addVideoPodcastRes.message);
                yield put({ type: 'ADD_VIDEO_PODCAST_FAILURE', message: addVideoPodcastRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'ADD_VIDEO_PODCAST_FAILURE', message: e.message });
    }
}

const updateVideoPodcastApi = async (data) => {
    try {
        const response = await instance.put(UpdateVideoPodcast_API, {
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
function* updateVideoPodcast(action) {
    const BODY = {
        "content_id": action.data.content_id,
        "program_id": action.data.program_id,
        "category_id": action.data.category_id,
        "title": action.data.title,
        "description": action.data.description,
        "media": action.data.media,
        "duration": action.data.duration,
        "media_thumbnail": action.data.media_thumbnail,
        "media_type": action.data.media_type,
        "content_type": action.data.content_type,
        "amount": action.data.amount,
        "publish_by": action.data.publish_by,
        "content_version": action.data.content_version
    }
    const data = BODY;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const updateVideoPodcastRes = yield call(updateVideoPodcastApi, data);
        if (updateVideoPodcastRes.statusCode === 200) {
            yield put({ type: 'UPDATE_VIDEO_PODCAST_SUCCESS', updateVideoPodcasts: updateVideoPodcastRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            yield put({ type: 'UPDATE_VIDEO_PODCAST_FAILURE', message: updateVideoPodcastRes.message });
            createNotification('success', updateVideoPodcastRes.message);
        } else {
            if (updateVideoPodcastRes.statusCode === 401) {
                logOut('error', updateVideoPodcastRes.message)
            } else {
                createNotification('error', updateVideoPodcastRes.message);
                yield put({ type: 'UPDATE_VIDEO_PODCAST_FAILURE', message: updateVideoPodcastRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'UPDATE_VIDEO_PODCAST_FAILURE', message: e.message });
    }
}

