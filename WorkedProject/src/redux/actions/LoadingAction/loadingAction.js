import {
    LOADING,
    LOADING_SUCCESS,
    LOADING_FAILURE,

} from './constants';

export function loading(status) {
    return {
        type: LOADING,
        status,
    };
}

export function loadingSuccess(status) {
    return {
        type: LOADING_SUCCESS,
        status,
    };
}

export function loadingFailure(status) {
    return {
        type: LOADING_FAILURE,
        status,
    };
}