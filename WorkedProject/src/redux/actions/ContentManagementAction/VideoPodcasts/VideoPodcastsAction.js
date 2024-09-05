import {
    GET_CONTENTS_LIST,
    GET_CONTENTS_LIST_SUCCESS,
    GET_CONTENTS_LIST_FAILURE,

    VIEW_CONTENT_DETAILS,
    VIEW_CONTENT_DETAILS_SUCCESS,
    VIEW_CONTENT_DETAILS_FAILURE,

    ADD_VIDEO_PODCAST,
    ADD_VIDEO_PODCAST_SUCCESS,
    ADD_VIDEO_PODCAST_FAILURE,

    UPDATE_VIDEO_PODCAST,
    UPDATE_VIDEO_PODCAST_SUCCESS,
    UPDATE_VIDEO_PODCAST_FAILURE,

    DELETE_VIDEO_PODCAST,
    DELETE_VIDEO_PODCAST_SUCCESS,
    DELETE_VIDEO_PODCAST_FAILURE,

    GET_PROGRAMS_LIST,
    GET_PROGRAMS_LIST_SUCCESS,
    GET_PROGRAMS_LIST_FAILURE,

    GET_CATEGORY_LIST,
    GET_CATEGORY_LIST_SUCCESS,
    GET_CATEGORY_LIST_FAILURE
} from '../../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function getContentsList(data) {
    return {
        type: GET_CONTENTS_LIST,
        data,
    };
}

export function getContentsListSuccess(data) {
    return {
        type: GET_CONTENTS_LIST_SUCCESS,
        data,
    };
}

export function getContentsListFailure(data) {
    return {
        type: GET_CONTENTS_LIST_FAILURE,
        data,
    };
}



export function getProgramsList(data) {
    return {
        type: GET_PROGRAMS_LIST,
        data,
    };
}

export function getProgramsListSuccess(data) {
    return {
        type: GET_PROGRAMS_LIST_SUCCESS,
        data,
    };
}

export function getProgramsListFailure(data) {
    return {
        type: GET_PROGRAMS_LIST_FAILURE,
        data,
    };
}

export function getCategoryList(data) {
    return {
        type: GET_CATEGORY_LIST,
        data,
    };
}

export function getCategoryListSuccess(data) {
    return {
        type: GET_CATEGORY_LIST_SUCCESS,
        data,
    };
}

export function getCategoryListFailure(data) {
    return {
        type: GET_CATEGORY_LIST_FAILURE,
        data,
    };
}



export function viewContentDetails(data) {
    return {
        type: VIEW_CONTENT_DETAILS,
        data,
    };
}

export function viewContentDetailsSuccess(data) {
    return {
        type: VIEW_CONTENT_DETAILS_SUCCESS,
        data,
    };
}

export function viewContentDetailsFailure(data) {
    return {
        type: VIEW_CONTENT_DETAILS_FAILURE,
        data,
    };
}



export function addVideoPodcast(data) {
    return {
        type: ADD_VIDEO_PODCAST,
        data,
    };
}

export function addVideoPodcastSuccess(data) {
    return {
        type: ADD_VIDEO_PODCAST_SUCCESS,
        data,
    };
}

export function addVideoPodcastFailure(data) {
    return {
        type: ADD_VIDEO_PODCAST_FAILURE,
        data,
    };
}



export function updateVideoPodcast(data) {
    return {
        type: UPDATE_VIDEO_PODCAST,
        data,
    };
}

export function updateVideoPodcastSuccess(data) {
    return {
        type: UPDATE_VIDEO_PODCAST_SUCCESS,
        data,
    };
}

export function updateVideoPodcastFailure(data) {
    return {
        type: UPDATE_VIDEO_PODCAST_FAILURE,
        data,
    };
}



export function deleteVideoPodcast(data) {
    return {
        type: DELETE_VIDEO_PODCAST,
        data,
    };
}

export function deleteVideoPodcastSuccess(data) {
    return {
        type: DELETE_VIDEO_PODCAST_SUCCESS,
        data,
    };
}

export function deleteVideoPodcastFailure(data) {
    return {
        type: DELETE_VIDEO_PODCAST_FAILURE,
        data,
    };
}
