
import {
    VIEW_PROGRAMS,
    VIEW_PROGRAMS_SUCCESS,
    VIEW_PROGRAMS_FAILURE,

    VIEW_PROGRAM,
    VIEW_PROGRAM_SUCCESS,
    VIEW_PROGRAM_FAILURE,

    GET_PROGRAMS_CATEGORIES,
    GET_PROGRAMS_CATEGORIES_SUCCESS,
    GET_PROGRAMS_CATEGORIES_FAILURE,

    GET_PROGRAM_ASSISTANCE,
    GET_PROGRAM_ASSISTANCE_SUCCESS,
    GET_PROGRAM_ASSISTANCE_FAILURE,

    GET_SECTIONS_QUESTIONS_COUNT,
    GET_SECTIONS_QUESTIONS_COUNT_SUCCESS,
    GET_SECTIONS_QUESTIONS_COUNT_FAILURE,

    GET_ALL_PROGRAMS_FILTER,
    GET_ALL_PROGRAMS_FILTER_SUCCESS,
    GET_ALL_PROGRAMS_FILTER_FAILURE,

    UPDATE_IS_ACTIVE_STATUS,
    UPDATE_IS_ACTIVE_STATUS_SUCCESS,
    UPDATE_IS_ACTIVE_STATUS_FAILURE,

    VIEW_GUEST_LIST_PROGRAM,
    VIEW_GUEST_LIST_PROGRAM_SUCCESS,
    VIEW_GUEST_LIST_PROGRAM_FAILURE,

    UPDATE_PROGRAM_REQUEST,
    UPDATE_PROGRAM_REQUEST_SUCCESS,
    UPDATE_PROGRAM_REQUEST_FAILURE,

} from '../../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function viewPrograms(data) {
    return {
        type: VIEW_PROGRAMS,
        data,
    };
}

export function viewProgramsSuccess(data) {
    return {
        type: VIEW_PROGRAMS_SUCCESS,
        data,
    };
}

export function viewProgramsFailure(data) {
    return {
        type: VIEW_PROGRAMS_FAILURE,
        data,
    };
}

export function viewProgram(data) {
    return {
        type: VIEW_PROGRAM,
        data,
    };
}

export function viewProgramSuccess(data) {
    return {
        type: VIEW_PROGRAM_SUCCESS,
        data,
    };
}

export function viewProgramFailure(data) {
    return {
        type: VIEW_PROGRAM_FAILURE,
        data,
    };
}
export function getProgramsCategories(data) {
    return {
        type: GET_PROGRAMS_CATEGORIES,
        data,
    };
}

export function getProgramsCategoriesSuccess(data) {
    return {
        type: GET_PROGRAMS_CATEGORIES_SUCCESS,
        data,
    };
}

export function getProgramsCategoriesFailure(data) {
    return {
        type: GET_PROGRAMS_CATEGORIES_FAILURE,
        data,
    };
}
export function getProgramAssistance(data) {
    return {
        type: GET_PROGRAM_ASSISTANCE,
        data,
    };
}

export function getProgramAssistanceSuccess(data) {
    return {
        type: GET_PROGRAM_ASSISTANCE_SUCCESS,
        data,
    };
}

export function getProgramAssistanceFailure(data) {
    return {
        type: GET_PROGRAM_ASSISTANCE_FAILURE,
        data,
    };
}
export function getSectionsQuestionsCount(data) {
    return {
        type: GET_SECTIONS_QUESTIONS_COUNT,
        data,
    };
}

export function getSectionsQuestionsCountSuccess(data) {
    return {
        type: GET_SECTIONS_QUESTIONS_COUNT_SUCCESS,
        data,
    };
}

export function getSectionsQuestionsCountFailure(data) {
    return {
        type: GET_SECTIONS_QUESTIONS_COUNT_FAILURE,
        data,
    };
}

export function getAllProgramsFilter(data) {
    return {
        type: GET_ALL_PROGRAMS_FILTER,
        data,
    };
}

export function getAllProgramsFilterSuccess(data) {
    return {
        type: GET_ALL_PROGRAMS_FILTER_SUCCESS,
        data,
    };
}

export function getAllProgramsFilterFailure(data) {
    return {
        type: GET_ALL_PROGRAMS_FILTER_FAILURE,
        data,
    };
}
export function updateIsActiveStatus(data) {
    return {
        type: UPDATE_IS_ACTIVE_STATUS,
        data,
    };
}

export function updateIsActiveStatusSuccess(data) {
    return {
        type: UPDATE_IS_ACTIVE_STATUS_SUCCESS,
        data,
    };
}

export function updateIsActiveStatusFailure(data) {
    return {
        type: UPDATE_IS_ACTIVE_STATUS_FAILURE,
        data,
    };
}

export function viewGuestListProgram(data) {
    return {
        type: VIEW_GUEST_LIST_PROGRAM,
        data,
    };
}

export function viewGuestListProgramSuccess(data) {
    return {
        type: VIEW_GUEST_LIST_PROGRAM_SUCCESS,
        data,
    };
}

export function viewGuestListProgramFailure(data) {
    return {
        type: VIEW_GUEST_LIST_PROGRAM_FAILURE,
        data,
    };
}

export function updateProgramRequest(data) {
    return {
        type: UPDATE_PROGRAM_REQUEST,
        data,
    };
}

export function updateProgramRequestSuccess(data) {
    return {
        type: UPDATE_PROGRAM_REQUEST_SUCCESS,
        data,
    };
}

export function updateProgramRequestFailure(data) {
    return {
        type: UPDATE_PROGRAM_REQUEST_FAILURE,
        data,
    };
}
