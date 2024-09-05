import * as type from '../../constants';

const initialState = {
    getTestimonialsList: [],
    viewTestimonialsDetails: [],
    approveRejectTestimonials: [],
    loading: false,
    error: null,
}

export function getTestimonialsList(state = initialState, action) {
    switch (action.type) {
        case type.GET_TESTIMONIALS_LIST:
            return {
                ...state,
                loading: true,
            }
        case type.GET_TESTIMONIALS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                getTestimonialsList: action.getTestimonialsList,
            }
        case type.GET_TESTIMONIALS_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function viewTestimonialsDetails(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_TESTIMONIALS_DETAILS:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_TESTIMONIALS_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                viewTestimonialsDetails: action.viewTestimonialsDetails
            }
        case type.VIEW_TESTIMONIALS_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function approveRejectTestimonials(state = initialState, action) {
    switch (action.type) {
        case type.APPROVE_REJECT_TESTIMONIALS:
            return {
                ...state,
                loading: true,
            }
        case type.APPROVE_REJECT_TESTIMONIALS_SUCCESS:
            return {
                ...state,
                loading: false,
                approveRejectTestimonials: action.approveRejectTestimonials
            }
        case type.APPROVE_REJECT_TESTIMONIALS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}




