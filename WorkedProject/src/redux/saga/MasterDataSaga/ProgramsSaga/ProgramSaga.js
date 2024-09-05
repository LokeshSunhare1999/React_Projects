import { call, put, takeEvery } from 'redux-saga/effects'
import { AllPrograms_API, UpdateActiveStatus_API, ViewProgramDetails_API, GuestListForProgram_API, update_Program_Req_API } from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut, encryptUrlData } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";

export default function* viewPrograms() {
    yield takeEvery('VIEW_PROGRAMS', viewAllPrograms);
    yield takeEvery('UPDATE_IS_ACTIVE_STATUS', updateIsActiveStatus);
    yield takeEvery('VIEW_PROGRAM', viewProgram);
    yield takeEvery('VIEW_GUEST_LIST_PROGRAM', viewGuestListProgram);
    yield takeEvery('UPDATE_PROGRAM_REQUEST', updateProgramReq);
}

const getAllProgramsList = async (URL) => {
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

function* viewAllPrograms(action) {
    const URL = `${AllPrograms_API}?page_no=${action.data.pageNo}&page_size=${action.data.pageSize}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}${(action.data.min_duration) ? `&min_duration=${action.data.min_duration}` : ""}${(action.data.max_duration) ? `&max_duration=${action.data.max_duration}` : ""}${(action.data.level) ? `&level=${action.data.level}` : ""}`

    // let params= `page_no=${action.data.pageNo}&page_size=${action.data.pageSize}${(action.data.filter_text) ? `&filter_text=${action.data.filter_text}` : ""}${(action.data.min_duration) ? `&min_duration=${action.data.min_duration}` : ""}${(action.data.max_duration) ? `&max_duration=${action.data.max_duration}` : ""}${(action.data.level) ? `&level=${action.data.level}` : ""}`;
    // const URL = `${AllPrograms_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });

    try {
        const response = yield call(getAllProgramsList, URL);

        const viewProgramsDataRes = response
        if (viewProgramsDataRes.statusCode === 200) {
            yield put({ type: 'VIEW_PROGRAMS_SUCCESS', viewPrograms: viewProgramsDataRes });
            yield put({ type: 'VIEW_PROGRAMS_FAILURE', message: viewProgramsDataRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewProgramsDataRes.statusCode === 401) {
                logOut('error', viewProgramsDataRes.message)
            } else {
                createNotification('error', viewProgramsDataRes.message);
                yield put({ type: 'VIEW_PROGRAMS_FAILURE', message: viewProgramsDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_PROGRAMS_FAILURE', message: "Ananda programs data does not exists" });
    }
}

const updateActiveStatusGlobal = async (data) => {
    try {
        const response = await instance.put(UpdateActiveStatus_API, {
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

function* updateIsActiveStatus(action) {
    const BODY = JSON.stringify({
        "feature_type": action.data.feature_type,
        "id": action.data.id,
        "status": action.data.status
    })

    const data = BODY
    try {
        const response = yield call(updateActiveStatusGlobal, data);

        const updateActiveStatusRes = response;
        if (updateActiveStatusRes.statusCode === 200) {
            yield put({ type: 'UPDATE_IS_ACTIVE_STATUS_SUCCESS', updateActiveStatusPro: updateActiveStatusRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', updateActiveStatusRes.message);
        } else {
            if (updateActiveStatusRes.statusCode === 401) {
                logOut('error', updateActiveStatusRes.message)
            } else {
                createNotification('error', updateActiveStatusRes.message);
                yield put({ type: 'UPDATE_IS_ACTIVE_STATUS_FAILURE', message: updateActiveStatusRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'UPDATE_IS_ACTIVE_STATUS_FAILURE', message: "Ananda programs data does not exists" });
    }
}

const viewProgramDetails = async (url) => {
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

function* viewProgram(action) {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${ViewProgramDetails_API}?program_id=${action.data.programId}`
    // let params= `program_id=${action.data.programId}`;
    // const URL = `${ViewProgramDetails_API}?${encryptUrlData(params)}`;
    try {
        const response = yield call(viewProgramDetails, URL);

        const viewProgramDetailsRes = response;
        if (viewProgramDetailsRes.statusCode === 200) {
            yield put({ type: 'VIEW_PROGRAM_SUCCESS', viewProgramDetailsRes: viewProgramDetailsRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewProgramDetailsRes.statusCode === 401) {
                logOut('error', viewProgramDetailsRes.message)
            } else {
                createNotification('error', viewProgramDetailsRes.message);
                yield put({ type: 'VIEW_PROGRAM_FAILURE', message: viewProgramDetailsRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_PROGRAM_FAILURE', message: "Ananda programs data does not exists" });
    }
}

const getGuestListProgram = async (URL) => {
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

function* viewGuestListProgram(action) {
    const URL = `${GuestListForProgram_API}?program_id=${action.data.program_id}&guest_type=${action.data.guest_type}${(action.data.search_text) ? `&search_text=${action.data.search_text}` : ""}`
    // let params= `program_id=${action.data.program_id}&guest_type=${action.data.guest_type}${(action.data.search_text) ? `&search_text=${action.data.search_text}` : ""}`;
    // const URL = `${GuestListForProgram_API}?${encryptUrlData(params)}`;
    yield put({ type: 'LOADING_FAILURE', loading: true });

    yield put({ type: 'LOADING_FAILURE', loading: true });

    try {
        const response = yield call(getGuestListProgram, URL);
        const viewGuestListProgramRes = response;
        if (viewGuestListProgramRes.statusCode === 200) {
            yield put({ type: 'VIEW_GUEST_LIST_PROGRAM_SUCCESS', viewGuestListProgramRes: viewGuestListProgramRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewGuestListProgramRes.statusCode === 401) {
                logOut('error', viewGuestListProgramRes.message)
            } else {
                createNotification('error', viewGuestListProgramRes.message);
                yield put({ type: 'VIEW_GUEST_LIST_PROGRAM_FAILURE', message: viewGuestListProgramRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_GUEST_LIST_PROGRAM_FAILURE', message: "Ananda programs data does not exists" });
    }
}



const updateProgram = async (data) => {
    try {
        const response = await instance.put(update_Program_Req_API, {
            data,
        });
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

function* updateProgramReq(action) {
    const BODY = JSON.stringify({
        "feature_type": action.data.feature_type,
        "payload": JSON.stringify(action.data.payload),
        "name": action.data.name,
    })
    yield put({ type: 'LOADING_FAILURE', loading: true });

    const data = BODY
    try {
        const response = yield call(updateProgram, data);

        const updateProgramRes = response;
        console.log("updateProgramRes.statusCode === 200", updateProgramRes.statusCode === 200);
        if (updateProgramRes.statusCode === 200) {
            yield put({ type: 'UPDATE_PROGRAM_REQUEST_SUCCESS', updateProgramRequest: updateProgramRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', updateProgramRes.message);
        } else {
            if (updateProgramRes.statusCode === 401) {
                logOut('error', updateProgramRes.message)
            } else {
                createNotification('error', updateProgramRes.message);
                yield put({ type: 'UPDATE_PROGRAM_REQUEST_FAILURE', message: updateProgramRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'UPDATE_PROGRAM_REQUEST_FAILURE', message: "Ananda programs data does not exists" });
    }
}
