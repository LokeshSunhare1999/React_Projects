import { call, put, takeEvery } from 'redux-saga/effects'
import { getRecipeCollectionList_API, addNewRecipeCollection_API, masterDataModuleDelete_API, ViewRecipeCollectionForEdit_API, editRecipeCollection_API, getRecipe_API, viewRecipeDetailsById_API, addNewRecipe_API, updateRecipe_API } from '../../../../Config/Api';
import { createNotification } from '../../../../Config/NotificationToast';
import { logOut } from "../../../../utils/Helper";
import { instance } from "../../../auth/axiosInstance";
import { getDataFromFirebase } from '../../../../Config/commonFirebaseImage';

export default function* recipeCollection() {
    yield takeEvery('GET_RECIPE_COLLECTION_LIST', getAllRecipeCollectionList);
    yield takeEvery('ADD_RECIPE_COLLECTION', addNewRecipeCollection);
    yield takeEvery('ADD_RECIPE', addNewRecipe);
    yield takeEvery('DELETE_MASTER_DATA_MODULE', deleteAnyMasterDataModule);
    yield takeEvery('VIEW_EDIT_RECIPE_COLLECTION', viewRecipeCollectionForEdit);
    yield takeEvery('EDIT_RECIPE_COLLECTION', editRecipeCollection);
    yield takeEvery('GET_RECIPE_LIST', getRecipeByIdList);
    yield takeEvery('VIEW_RECIPE', viewRecipeById);
    yield takeEvery('EDIT_RECIPE', editRecipeDetails);
}

const getAllRecipeCollection = async (url) => {
    try {
        const response = await instance.get(url);
        console.log("response", response);
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}
function* getAllRecipeCollectionList(action) {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${getRecipeCollectionList_API}?page_no=${action.data.pageNo}&page_size=${action.data.pageSize}&filter_text=${action.data.filter_text}`
    try {
        const response = yield call(getAllRecipeCollection, URL);

        const getRecipeCollectionListRes = response;
        if (getRecipeCollectionListRes.statusCode === 200) {
            yield put({ type: 'GET_RECIPE_COLLECTION_LIST_SUCCESS', getRecipeCollectionList: getRecipeCollectionListRes });
            yield put({ type: 'GET_RECIPE_COLLECTION_LIST_FAILURE', message: getRecipeCollectionListRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (getRecipeCollectionListRes.statusCode === 401) {
                logOut('error', getRecipeCollectionListRes.message)
            } else {
                createNotification('error', getRecipeCollectionListRes.message);
                yield put({ type: 'GET_RECIPE_COLLECTION_LIST_FAILURE', message: getRecipeCollectionListRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'GET_RECIPE_COLLECTION_LIST_FAILURE', message: "No data found" });
    }
}

const addNewRecipeCollectionCall = async (data) => {
    try {
        const response = await instance.post(addNewRecipeCollection_API, {
            data,
        });
        return response;
    } catch (errors) {
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* addNewRecipeCollection(action) {
    const BODY = {
        "title": action.data.title,
        "description": action.data.description,
    }
    const data = BODY;

    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(addNewRecipeCollectionCall, data);

        const addRecipeCollectionRes = response;
        if (addRecipeCollectionRes.statusCode === 200 || addRecipeCollectionRes.statusCode === 201) {
            yield put({ type: 'ADD_RECIPE_COLLECTION_SUCCESS', addRecipeCollection: addRecipeCollectionRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', addRecipeCollectionRes.message);
        } else {
            if (addRecipeCollectionRes.statusCode === 401) {
                logOut('error', addRecipeCollectionRes.message)
            } else {
                createNotification('error', addRecipeCollectionRes.message);
                yield put({ type: 'ADD_RECIPE_COLLECTION_FAILURE', message: addRecipeCollectionRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'ADD_RECIPE_COLLECTION_FAILURE', message: e.message });
    }
}

const addNewRecipeCall = async (data) => {
    try {
        const response = await instance.post(addNewRecipe_API, {
            data,
        });
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}
function* addNewRecipe(action) {

    const BODY = {
        "collection_id": action.data.collection_id,
        "recipe_title": action.data.recipe_title,
        "media_thumbnail": action.data.media_thumbnail,
        "veg_nonveg": action.data.veg_nonveg,
        "minutes": action.data.minutes,
        "calories": action.data.calories,
        "dosha": action.data.dosha,
        "portion_size": action.data.portion_size,
        "ingredients": JSON.stringify(action.data.ingredients),
        "nutritions": JSON.stringify(action.data.nutritions),
    }

    const data = BODY;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(addNewRecipeCall, data);

        const addRecipeRes = response;
        if (addRecipeRes.statusCode === 200 || addRecipeRes.statusCode === 201) {
            yield put({ type: 'ADD_RECIPE_SUCCESS', addRecipe: addRecipeRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', addRecipeRes.message);
        } else {
            if (addRecipeRes.statusCode === 401) {
                logOut('error', addRecipeRes.message)
            } else {
                createNotification('error', addRecipeRes.message);
                yield put({ type: 'ADD_RECIPE_FAILURE', message: addRecipeRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'ADD_RECIPE_FAILURE', message: e.message });
    }
}

const viewRecipeCollectionEdit = async (url) => {
    try {
        const response = await instance.get(url);
        console.log("response", response);
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* viewRecipeCollectionForEdit(action) {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${ViewRecipeCollectionForEdit_API}?collection_id=${action.data.collection_id}`
    try {
        const response = yield call(viewRecipeCollectionEdit, URL);
        const viewEditRecipeCollectionRes = response;

        if (viewEditRecipeCollectionRes.statusCode === 200) {
            yield put({ type: 'VIEW_EDIT_RECIPE_COLLECTION_SUCCESS', viewEditRecipeCollection: viewEditRecipeCollectionRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewEditRecipeCollectionRes.statusCode === 401) {
                logOut('error', viewEditRecipeCollectionRes.message)
            } else {
                createNotification('error', viewEditRecipeCollectionRes.message);
                yield put({ type: 'VIEW_EDIT_RECIPE_COLLECTION_FAILURE', message: viewEditRecipeCollectionRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_EDIT_RECIPE_COLLECTION_FAILURE', message: e.message });
    }
}

const deleteMasterDataApi = async (data) => {
    try {
        const response = await instance.delete(masterDataModuleDelete_API, {
            data,
        });
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* deleteAnyMasterDataModule(action) {

    const BODY = {
        "feature_type": action.data.feature_type,
        "ids": action.data.ids
    }


    const data = { data: BODY };
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(deleteMasterDataApi, data);

        const deleteMasterModuleDataRes = response;
        if (deleteMasterModuleDataRes.statusCode === 200) {
            yield put({ type: 'DELETE_MASTER_DATA_MODULE_SUCCESS', deleteMasterDataModule: deleteMasterModuleDataRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', deleteMasterModuleDataRes.message);
        } else {
            if (deleteMasterModuleDataRes.statusCode === 401) {
                logOut('error', deleteMasterModuleDataRes.message)
            } else {
                createNotification('error', deleteMasterModuleDataRes.message);
                yield put({ type: 'DELETE_MASTER_DATA_MODULE_FAILURE', message: deleteMasterModuleDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        createNotification('error', "Something went wrong");
        yield put({ type: 'DELETE_MASTER_DATA_MODULE_FAILURE', message: e.message });
    }
}


const editRecipeCollectionApi = async (data) => {
    try {
        const response = await instance.put(editRecipeCollection_API, {
            data,
        });
        return response;
    } catch (errors) {
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}


function* editRecipeCollection(action) {

    const BODY = {
        "collection_id": action.data.collection_id,
        "title": action.data.title,
        "description": action.data.description,
    }

    const data = BODY;
    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(editRecipeCollectionApi, data);
        const editRecipeCollectionRes = response;

        if (editRecipeCollectionRes.statusCode === 200) {
            yield put({ type: 'EDIT_RECIPE_COLLECTION_SUCCESS', editRecipeCollection: editRecipeCollectionRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', editRecipeCollectionRes.message);
            setTimeout(() => {
                action.navigate(-1)
            }, 500);
        } else {
            if (editRecipeCollectionRes.statusCode === 401) {
                logOut('error', editRecipeCollectionRes.message)
            } else {
                createNotification('error', editRecipeCollectionRes.message);
                yield put({ type: 'EDIT_RECIPE_COLLECTION_FAILURE', message: editRecipeCollectionRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        createNotification('error', "Something went wrong");
        yield put({ type: 'EDIT_RECIPE_COLLECTION_FAILURE', message: e.message });
    }
}

const editRecipeDetailsApi = async (data) => {
    try {
        const response = await instance.put(updateRecipe_API, {
            data,
        });
        return response;
    } catch (errors) {
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* editRecipeDetails(action) {
    const BODY = {
        "recipe_id": action.data.recipe_id,
        "recipe_title": action.data.recipe_title,
        "media_thumbnail": action.data.media_thumbnail,
        "veg_nonveg": action.data.veg_nonveg,
        "minutes": action.data.minutes,
        "calories": action.data.calories,
        "dosha": action.data.dosha,
        "portion_size": action.data.portion_size,
        "ingredients": JSON.stringify(action.data.ingredients),
        "nutritions": JSON.stringify(action.data.nutritions)
    }
    const data = BODY;


    yield put({ type: 'LOADING_FAILURE', loading: true });
    try {
        const response = yield call(editRecipeDetailsApi, data);
        const editRecipeRes = response;

        if (editRecipeRes.statusCode === 200) {
            yield put({ type: 'EDIT_RECIPE_SUCCESS', editRecipe: editRecipeRes });
            yield put({ type: 'LOADING_FAILURE', loading: false });
            createNotification('success', editRecipeRes.message);
        } else {
            if (editRecipeRes.statusCode === 401) {
                logOut('error', editRecipeRes.message)
            } else {
                createNotification('error', editRecipeRes.message);
                yield put({ type: 'EDIT_RECIPE_FAILURE', message: editRecipeRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'EDIT_RECIPE_FAILURE', message: e.message });
    }
}

const getRecipeByIdDetails = async (url) => {
    try {
        const response = await instance.get(url);
        return response;
    } catch (errors) {
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return errors.response.data
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors.response.data
    }
}

function* getRecipeByIdList(action) {
    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${getRecipe_API}?page_no=${action.data.pageNo}&page_size=${action.data.pageSize}&filter_text=${action.data.filter_text}&collection_id=${action.data.collection_id}`
    try {
        const response = yield call(getRecipeByIdDetails, URL);
        const getRecipeListRes = response;

        if (getRecipeListRes.statusCode === 200) {
            yield put({ type: 'GET_RECIPE_LIST_SUCCESS', getRecipeList: getRecipeListRes });
            yield put({ type: 'GET_RECIPE_LIST_FAILURE', message: getRecipeListRes.message });
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (getRecipeListRes.statusCode === 401) {
                logOut('error', getRecipeListRes.message)
            } else {
                createNotification('error', getRecipeListRes.message);
                yield put({ type: 'GET_RECIPE_LIST_FAILURE', message: getRecipeListRes.statusCode });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'GET_RECIPE_LIST_FAILURE', message: "No data found" });
    }
}

const getViewRecipeById = async (url) => {
    try {
        const response = await instance.get(url);
        console.log("response", response);
        return response;
    } catch (errors) {
        console.log("errors", errors)
        if (
            errors.response.data.statusCode === 400) {
            createNotification('error', errors.response.data.message);
            return
        } if (errors.response.data.statusCode === 401) {
            logOut('error', errors.response.data.message);
            createNotification('error', errors.response.data.message);
        } else {
            createNotification('warning', "Something went wrong");
        }
        return errors
    }
}

function* viewRecipeById(action) {

    yield put({ type: 'LOADING_FAILURE', loading: true });
    const URL = `${viewRecipeDetailsById_API}?recipe_id=${action.data.recipe_id}`
    try {
        const response = yield call(getViewRecipeById, URL);
        const viewRecipeDataRes = response;

        if (viewRecipeDataRes.statusCode === 200) {
            if (response && response?.data && response?.data) {
                let RecipeData = response?.data.getRecipeDetail
                    if (RecipeData?.media_thumbnail) {
                        if ((RecipeData.media_thumbnail!== "")) {
                            RecipeData.media_thumbnail = yield getDataFromFirebase(RecipeData.media_thumbnail);
                        }
                    }
                    response.data.getRecipeDetail = RecipeData;
                yield put({ type: 'VIEW_RECIPE_SUCCESS', viewRecipe: viewRecipeDataRes });
            }
            yield put({ type: 'LOADING_FAILURE', loading: false });
        } else {
            if (viewRecipeDataRes.statusCode === 401) {
                logOut('error', viewRecipeDataRes.message)
            } else {
                createNotification('error', viewRecipeDataRes.message);
                yield put({ type: 'VIEW_RECIPE_FAILURE', message: viewRecipeDataRes.message });
                yield put({ type: 'LOADING_FAILURE', loading: false });
            }
        }
    } catch (e) {
        yield put({ type: 'VIEW_RECIPE_FAILURE', message: e.message });
    }
}




