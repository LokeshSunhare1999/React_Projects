import {
    GET_TESTIMONIALS_LIST,
    GET_TESTIMONIALS_LIST_SUCCESS,
    GET_TESTIMONIALS_LIST_FAILURE,

    VIEW_TESTIMONIALS_DETAILS,
    VIEW_TESTIMONIALS_DETAILS_SUCCESS,
    VIEW_TESTIMONIALS_DETAILS_FAILURE,

    APPROVE_REJECT_TESTIMONIALS,
    APPROVE_REJECT_TESTIMONIALS_SUCCESS,
    APPROVE_REJECT_TESTIMONIALS_FAILURE,

} from '../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function getTestimonialsList(data) {
    return {
        type: GET_TESTIMONIALS_LIST,
        data,
    };
}

export function getTestimonialsListSuccess(data) {
    return {
        type: GET_TESTIMONIALS_LIST_SUCCESS,
        data,
    };
}

export function getTestimonialsListFailure(data) {
    return {
        type: GET_TESTIMONIALS_LIST_FAILURE,
        data,
    };
}

export function viewTestimonialsDetails(data) {
    return {
        type: VIEW_TESTIMONIALS_DETAILS,
        data,
    };
}

export function viewTestimonialsDetailsSuccess(data) {
    return {
        type: VIEW_TESTIMONIALS_DETAILS_SUCCESS,
        data,
    };
}

export function viewTestimonialsDetailsFailure(data) {
    return {
        type: VIEW_TESTIMONIALS_DETAILS_FAILURE,
        data,
    };
}

export function approveRejectTestimonials(data) {
    return {
        type: APPROVE_REJECT_TESTIMONIALS,
        data,
    };
}

export function approveRejectTestimonialsSuccess(data) {
    return {
        type: APPROVE_REJECT_TESTIMONIALS_SUCCESS,
        data,
    };
}

export function approveRejectTestimonialsFailure(data) {
    return {
        type: APPROVE_REJECT_TESTIMONIALS_FAILURE,
        data,
    };
}







