import * as type from '../../constants';

const initialState = {
    getContentCategoryList: [],
    viewContentCategoryDetails: [],
    addNewContentCategory: [],
    updateContentCategoryDetails: [],
    loading: false,
    error: null,
}

export function getContentCategoryList(state = initialState, action) {
    switch (action.type) {
        case type.GET_CONTENTS_CATEGORY_LIST:
            return {
                ...state,
                loading: true,
            }
        case type.GET_CONTENTS_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                getContentCategoryList: action.getContentCategoryRes,
            }
        case type.GET_CONTENTS_CATEGORY_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

