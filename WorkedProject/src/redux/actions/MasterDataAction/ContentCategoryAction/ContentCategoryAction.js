import {
    GET_CONTENTS_CATEGORY_LIST,
    GET_CONTENTS_CATEGORY_LIST_SUCCESS,
    GET_CONTENTS_CATEGORY_LIST_FAILURE,

    VIEW_CONTENTS_CATEGORY_LIST,
    VIEW_CONTENTS_CATEGORY_LIST_SUCCESS,
    VIEW_CONTENTS_CATEGORY_LIST_FAILURE,

    ADD_CONTENTS_CATEGORY_LIST,
    ADD_CONTENTS_CATEGORY_LIST_SUCCESS,
    ADD_CONTENTS_CATEGORY_LIST_FAILURE,

    UPDATE_CONTENTS_CATEGORY_LIST,
    UPDATE_CONTENTS_CATEGORY_LIST_SUCCESS,
    UPDATE_CONTENTS_CATEGORY_LIST_FAILURE,

} from '../../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function getContentsCategory(data) {
    return {
        type: GET_CONTENTS_CATEGORY_LIST,
        data,
    };
}

export function getContentsCategorySuccess(data) {
    return {
        type: GET_CONTENTS_CATEGORY_LIST_SUCCESS,
        data,
    };
}

export function getContentsCategoryFailure(data) {
    return {
        type: GET_CONTENTS_CATEGORY_LIST_FAILURE,
        data,
    };
}


export function viewContentCategoryDetails(data) {
    return {
        type: VIEW_CONTENTS_CATEGORY_LIST,
        data,
    };
}

export function viewContentCategoryDetailsSuccess(data) {
    return {
        type: VIEW_CONTENTS_CATEGORY_LIST_SUCCESS,
        data,
    };
}

export function viewContentCategoryDetailsFailure(data) {
    return {
        type: VIEW_CONTENTS_CATEGORY_LIST_FAILURE,
        data,
    };
}

export function addNewContentCategory(data) {
    return {
        type: ADD_CONTENTS_CATEGORY_LIST,
        data,
    };
}

export function addNewContentCategorySuccess(data) {
    return {
        type: ADD_CONTENTS_CATEGORY_LIST_SUCCESS,
        data,
    };
}

export function addNewContentCategoryFailure(data) {
    return {
        type: ADD_CONTENTS_CATEGORY_LIST_FAILURE,
        data,
    };
}

export function updateContentCategoryDetails(data) {
    return {
        type: UPDATE_CONTENTS_CATEGORY_LIST,
        data,
    };
}

export function updateContentCategoryDetailsSuccess(data) {
    return {
        type: UPDATE_CONTENTS_CATEGORY_LIST_SUCCESS,
        data,
    };
}

export function updateContentCategoryDetailsFailure(data) {
    return {
        type: UPDATE_CONTENTS_CATEGORY_LIST_FAILURE,
        data,
    };
}
