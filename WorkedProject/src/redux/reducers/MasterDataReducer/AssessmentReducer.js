import * as type from '../../constants';

const initialState = {
    viewAssessments: [],
    viewAssessment: [],
    getAssessmentCategories: [],
    assessmentAssistance: [],
    sectionQuestionsCount: [],
    allAssessmentFilter: [],
    isActiveStatus: [],
    loading: false,
    error: null,
}

export function viewAssessments(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_ASSESSMENTS:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_ASSESSMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                viewAssessments: action.viewAssessments,
            }
        case type.VIEW_ASSESSMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function viewAssessment(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_ASSESSMENT:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_ASSESSMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                viewAssessment: action.viewAssessment
            }
        case type.VIEW_ASSESSMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}


export function getProgramsCategories(state = initialState, action) {
    switch (action.type) {
        case type.GET_PROGRAMS_CATEGORIES:
            return {
                ...state,
                loading: true,
            }
        case type.GET_PROGRAMS_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                getProgramCategories: action.get_programs_categories
            }
        case type.GET_PROGRAMS_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}


export function getProgramAssistance(state = initialState, action) {
    switch (action.type) {
        case type.GET_PROGRAM_ASSISTANCE:
            return {
                ...state,
                loading: true,
            }
        case type.GET_PROGRAM_ASSISTANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                programsAssistance: action.get_programs_assistance
            }
        case type.GET_PROGRAM_ASSISTANCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}


export function getSectionsQuestionsCount(state = initialState, action) {
    switch (action.type) {
        case type.GET_SECTIONS_QUESTIONS_COUNT:
            return {
                ...state,
                loading: true,
            }
        case type.GET_SECTIONS_QUESTIONS_COUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                sectionQuestionsCount: action.get_section_questions_count
            }
        case type.GET_SECTIONS_QUESTIONS_COUNT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}


export function getAllProgramsFilter(state = initialState, action) {
    switch (action.type) {
        case type.GET_ALL_PROGRAMS_FILTER:
            return {
                ...state,
                loading: true,
            }
        case type.GET_ALL_PROGRAMS_FILTER_SUCCESS:
            return {
                ...state,
                loading: false,
                allProgramFilter: action.get_allProgram_filter
            }
        case type.GET_ALL_PROGRAMS_FILTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}


export function updateIsActiveStatus(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_IS_ACTIVE_STATUS:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_IS_ACTIVE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isActiveStatus: action.get_allProgram_filter
            }
        case type.UPDATE_IS_ACTIVE_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}