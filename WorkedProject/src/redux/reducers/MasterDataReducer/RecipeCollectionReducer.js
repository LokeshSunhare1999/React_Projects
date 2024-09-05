import * as type from '../../constants';

const initialState = {
    getRecipeCollectionList: [],
    addRecipeCollection: [],
    viewEditRecipeCollection: [],
    editRecipeCollection: [],
    viewRecipeCollectionDetails: [],
    getRecipeList: [],
    viewRecipe: [],
    addRecipe: [],
    editRecipe: [],
    deleteMasterDataModule: [],
    isActiveStatus: [],
    uploadFile: [],
    loading: false,
    error: null,
}

export function getRecipeCollectionList(state = initialState, action) {
    switch (action.type) {
        case type.GET_RECIPE_COLLECTION_LIST:
            return {
                ...state,
                loading: true,
            }
        case type.GET_RECIPE_COLLECTION_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                getRecipeCollectionList: action.getRecipeCollectionList,
            }
        case type.GET_RECIPE_COLLECTION_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function addRecipeCollection(state = initialState, action) {
    switch (action.type) {
        case type.ADD_RECIPE_COLLECTION:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_RECIPE_COLLECTION_SUCCESS:
            return {
                ...state,
                loading: false,
                addRecipeCollection: action.addRecipeCollection
            }
        case type.ADD_RECIPE_COLLECTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function addRecipe(state = initialState, action) {
    switch (action.type) {
        case type.ADD_RECIPE:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                addRecipe: action.addRecipe
            }
        case type.ADD_RECIPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function editRecipe(state = initialState, action) {
    switch (action.type) {
        case type.EDIT_RECIPE:
            return {
                ...state,
                loading: true,
            }
        case type.EDIT_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                editRecipe: action.editRecipe
            }
        case type.EDIT_RECIPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function viewEditRecipeCollection(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_EDIT_RECIPE_COLLECTION:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_EDIT_RECIPE_COLLECTION_SUCCESS:
            return {
                ...state,
                loading: false,
                viewEditRecipeCollection: action.viewEditRecipeCollection
            }
        case type.VIEW_EDIT_RECIPE_COLLECTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function editRecipeCollection(state = initialState, action) {
    switch (action.type) {
        case type.EDIT_RECIPE_COLLECTION:
            return {
                ...state,
                loading: true,
            }
        case type.EDIT_RECIPE_COLLECTION_SUCCESS:
            return {
                ...state,
                loading: false,
                editRecipeCollection: action.editRecipeCollection
            }
        case type.EDIT_RECIPE_COLLECTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function viewRecipeCollectionDetails(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_RECIPE_COLLECTION_DETAILS:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_RECIPE_COLLECTION_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                viewRecipeCollectionDetails: action.viewRecipeCollectionDetails
            }
        case type.VIEW_RECIPE_COLLECTION_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function getRecipeList(state = initialState, action) {
    switch (action.type) {
        case type.GET_RECIPE_LIST:
            return {
                ...state,
                loading: true,
            }
        case type.GET_RECIPE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                getRecipeList: action.getRecipeList
            }
        case type.GET_RECIPE_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function viewRecipe(state = initialState, action) {
    switch (action.type) {
        case type.VIEW_RECIPE:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                viewRecipe: action.viewRecipe
            }
        case type.VIEW_RECIPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function deleteMasterDataModule(state = initialState, action) {
    switch (action.type) {
        case type.DELETE_MASTER_DATA_MODULE:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_MASTER_DATA_MODULE_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteMasterDataModule: action.deleteMasterDataModule
            }
        case type.DELETE_MASTER_DATA_MODULE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}

export function uploadFile(state = initialState, action) {
    switch (action.type) {
        case type.UPLOAD_FILE:
            return {
                ...state,
                loading: true,
            }
        case type.UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                loading: false,
                uploadFile: action.uploadFile,
            }
        case type.UPLOAD_FILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}