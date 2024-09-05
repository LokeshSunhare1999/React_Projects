import * as type from '../../constants';

const initialState = {
  viewPrograms: [],
  viewProgram: [],
  getProgramCategories: [],
  programsAssistance: [],
  sectionQuestionsCount: [],
  allProgramFilter: [],
  viewGuestListPro: [],
  updateProgramRequest: [],
  isActiveStatus: [],
  loading: false,
  error: null,
}

export function viewPrograms(state = initialState, action) {
  switch (action.type) {
    case type.VIEW_PROGRAMS:
      return {
        ...state,
        loading: true,
      }
    case type.VIEW_PROGRAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        viewPrograms: action.viewPrograms,
      }
    case type.VIEW_PROGRAMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}


export function viewProgram(state = initialState, action) {
  switch (action.type) {
    case type.VIEW_PROGRAM:
      return {
        ...state,
        loading: true,
      }
    case type.VIEW_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        viewProgram: action.viewProgramDetailsRes
      }
    case type.VIEW_PROGRAM_FAILURE:
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
        isActiveStatus: action.updateActiveStatusRes
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

export function viewGuestListProgram(state = initialState, action) {
  switch (action.type) {
    case type.VIEW_GUEST_LIST_PROGRAM:
      return {
        ...state,
        loading: true,
      }
    case type.VIEW_GUEST_LIST_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        viewGuestListPro: action.viewGuestListProgramRes

      }
    case type.VIEW_GUEST_LIST_PROGRAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}

export function updateProgramRequest(state = initialState, action) {
  switch (action.type) {
    case type.UPDATE_PROGRAM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case type.UPDATE_PROGRAM_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        updateProgramRequest: action.updateProgramRequest
      }
    case type.UPDATE_PROGRAM_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}