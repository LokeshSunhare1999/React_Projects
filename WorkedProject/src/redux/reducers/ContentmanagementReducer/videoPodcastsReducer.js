import * as type from '../../constants';

const initialState = {
  contentList: [],
  programsList: [],
  categoryList: [],
  viewContent: [],
  addVideoPodcast: [],
  updateVideoPodcasts: [],
  deleteVideoPodcasts: [],
  loading: false,
  error: null,
}

export function getContentsList(state = initialState, action) {
  switch (action.type) {
    case type.GET_CONTENTS_LIST:
      return {
        ...state,
        loading: true,
      }
    case type.GET_CONTENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        contentList: action.contentList,
      }
    case type.GET_CONTENTS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}

export function getProgramsList(state = initialState, action) {
  switch (action.type) {
    case type.GET_PROGRAMS_LIST:
      return {
        ...state,
        loading: true,
      }
    case type.GET_PROGRAMS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        programsList: action.programsList,
      }
    case type.GET_PROGRAMS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}
export function getCategoryList(state = initialState, action) {
  switch (action.type) {
    case type.GET_CATEGORY_LIST:
      return {
        ...state,
        loading: true,
      }
    case type.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryList: action.categoryList,
      }
    case type.GET_CATEGORY_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}

export function viewContentDetails(state = initialState, action) {
  switch (action.type) {
    case type.VIEW_CONTENT_DETAILS:
      return {
        ...state,
        loading: true,
      }
    case type.VIEW_CONTENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        viewContent: action.viewContent
      }
    case type.VIEW_CONTENT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}


export function addVideoPodcast(state = initialState, action) {
  switch (action.type) {
    case type.ADD_VIDEO_PODCAST:
      return {
        ...state,
        loading: true,
      }
    case type.ADD_VIDEO_PODCAST_SUCCESS:
      return {
        ...state,
        loading: false,
        addVideoPodcast: action.addVideoPodcast
      }
    case type.ADD_VIDEO_PODCAST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}



export function updateVideoPodcast(state = initialState, action) {
  switch (action.type) {
    case type.UPDATE_VIDEO_PODCAST:
      return {
        ...state,
        loading: true,
      }
    case type.UPDATE_VIDEO_PODCAST_SUCCESS:
      return {
        ...state,
        loading: false,
        updateVideoPodcasts: action.updateVideoPodcasts
      }
    case type.UPDATE_VIDEO_PODCAST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}



export function deleteVideoPodcast(state = initialState, action) {
  switch (action.type) {
    case type.DELETE_VIDEO_PODCAST:
      return {
        ...state,
        loading: true,
      }
    case type.DELETE_VIDEO_PODCAST_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteVideoPodcasts: action.deleteVideoPodcasts
      }
    case type.DELETE_VIDEO_PODCAST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}
