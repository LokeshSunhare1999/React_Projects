import * as types from "./actionTypes";
import { take, takeEvery, takeLatest, put, all, delay, fork, call } from "redux-saga/effects"

import { loadUserSuccess, loadUserError } from "./action";
import { loadUserApi } from "./api";

export function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUserApi);
        if (response.status === 200) {
            yield delay(500);
            yield put(loadUserSuccess(response.data))
        }
    } catch (error) {
        yield put(loadUserError(error.response.data))
    }
}

export function* onLoadUsers() {
    yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync)
}

const userSagas = [
    fork(onLoadUsers)
];

export default function* rootSaga() {
    yield all([...userSagas]);
}