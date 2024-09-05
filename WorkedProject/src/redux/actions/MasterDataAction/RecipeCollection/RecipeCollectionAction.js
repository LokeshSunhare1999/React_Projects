
import {
    GET_RECIPE_COLLECTION_LIST,
    GET_RECIPE_COLLECTION_LIST_SUCCESS,
    GET_RECIPE_COLLECTION_LIST_FAILURE,

    ADD_RECIPE_COLLECTION,
    ADD_RECIPE_COLLECTION_SUCCESS,
    ADD_RECIPE_COLLECTION_FAILURE,

    EDIT_RECIPE_COLLECTION,
    EDIT_RECIPE_COLLECTION_SUCCESS,
    EDIT_RECIPE_COLLECTION_FAILURE,

    VIEW_EDIT_RECIPE_COLLECTION,
    VIEW_EDIT_RECIPE_COLLECTION_SUCCESS,
    VIEW_EDIT_RECIPE_COLLECTION_FAILURE,

    VIEW_RECIPE_COLLECTION_DETAILS,
    VIEW_RECIPE_COLLECTION_DETAILS_SUCCESS,
    VIEW_RECIPE_COLLECTION_DETAILS_FAILURE,

    GET_RECIPE_LIST,
    GET_RECIPE_LIST_SUCCESS,
    GET_RECIPE_LIST_FAILURE,

    DELETE_MASTER_DATA_MODULE,
    DELETE_MASTER_DATA_MODULE_SUCCESS,
    DELETE_MASTER_DATA_MODULE_FAILURE,

    VIEW_RECIPE,
    VIEW_RECIPE_SUCCESS,
    VIEW_RECIPE_FAILURE,

    ADD_RECIPE,
    ADD_RECIPE_SUCCESS,
    ADD_RECIPE_FAILURE,

    EDIT_RECIPE,
    EDIT_RECIPE_SUCCESS,
    EDIT_RECIPE_FAILURE,

    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,

} from '../../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function getRecipeCollectionList(data) {
    return {
        type: GET_RECIPE_COLLECTION_LIST,
        data,
    };
}

export function getRecipeCollectionListSuccess(data) {
    return {
        type: GET_RECIPE_COLLECTION_LIST_SUCCESS,
        data,
    };
}

export function getRecipeCollectionListFailure(data) {
    return {
        type: GET_RECIPE_COLLECTION_LIST_FAILURE,
        data,
    };
}

export function addRecipeCollection(data) {
    return {
        type: ADD_RECIPE_COLLECTION,
        data,
    };
}

export function addRecipeCollectionSuccess(data) {
    return {
        type: ADD_RECIPE_COLLECTION_SUCCESS,
        data,
    };
}

export function addRecipeCollectionFailure(data) {
    return {
        type: ADD_RECIPE_COLLECTION_FAILURE,
        data,
    };
}

export function addRecipe(data) {
    return {
        type: ADD_RECIPE,
        data,
    };
}

export function addRecipeSuccess(data) {
    return {
        type: ADD_RECIPE_SUCCESS,
        data,
    };
}

export function addRecipeFailure(data) {
    return {
        type: ADD_RECIPE_FAILURE,
        data,
    };
}

export function editRecipe(data) {
    return {
        type: EDIT_RECIPE,
        data,
    };
}

export function editRecipeSuccess(data) {
    return {
        type: EDIT_RECIPE_SUCCESS,
        data,
    };
}

export function editRecipeFailure(data) {
    return {
        type: EDIT_RECIPE_FAILURE,
        data,
    };
}

export function viewEditRecipeCollection(data) {
    return {
        type: VIEW_EDIT_RECIPE_COLLECTION,
        data,
    };
}

export function viewEditRecipeCollectionSuccess(data) {
    return {
        type: VIEW_EDIT_RECIPE_COLLECTION_SUCCESS,
        data,
    };
}

export function viewEditRecipeCollectionFailure(data) {
    return {
        type: VIEW_EDIT_RECIPE_COLLECTION_FAILURE,
        data,
    };
}

export function editRecipeCollection(data, navigate) {
    return {
        type: EDIT_RECIPE_COLLECTION,
        data, navigate
    };
}

export function editRecipeCollectionSuccess(data, navigate) {
    return {
        type: EDIT_RECIPE_COLLECTION_SUCCESS,
        data, navigate
    };
}

export function editRecipeCollectionFailure(data, navigate) {
    return {
        type: EDIT_RECIPE_COLLECTION_FAILURE,
        data, navigate
    };
}

export function viewRecipeCollectionDetails(data) {
    return {
        type: VIEW_RECIPE_COLLECTION_DETAILS,
        data,
    };
}

export function viewRecipeCollectionDetailsSuccess(data) {
    return {
        type: VIEW_RECIPE_COLLECTION_DETAILS_SUCCESS,
        data,
    };
}

export function viewRecipeCollectionDetailsFailure(data) {
    return {
        type: VIEW_RECIPE_COLLECTION_DETAILS_FAILURE,
        data,
    };
}

export function getRecipeList(data) {
    return {
        type: GET_RECIPE_LIST,
        data,
    };
}

export function getRecipeListSuccess(data) {
    return {
        type: GET_RECIPE_LIST_SUCCESS,
        data,
    };
}

export function getRecipeListFailure(data) {
    return {
        type: GET_RECIPE_LIST_FAILURE,
        data,
    };
}

export function viewRecipe(data) {
    return {
        type: VIEW_RECIPE,
        data,
    };
}

export function viewRecipeSuccess(data) {
    return {
        type: VIEW_RECIPE_SUCCESS,
        data,
    };
}

export function viewRecipeFailure(data) {
    return {
        type: VIEW_RECIPE_FAILURE,
        data,
    };
}

export function deleteMasterDataModule(data) {
    return {
        type: DELETE_MASTER_DATA_MODULE,
        data,
    };
}

export function deleteMasterDataModuleSuccess(data) {
    return {
        type: DELETE_MASTER_DATA_MODULE_SUCCESS,
        data,
    };
}

export function deleteMasterDataModuleFailure(data) {
    return {
        type: DELETE_MASTER_DATA_MODULE_FAILURE,
        data,
    };
}


export function uploadFile(data) {
    return {
        type: UPLOAD_FILE,
        data,
    };
}

export function uploadFileSuccess(data) {
    return {
        type: UPLOAD_FILE_SUCCESS,
        data,
    };
}

export function uploadFileFailure(data) {
    return {
        type: UPLOAD_FILE_FAILURE,
        data,
    };
}




