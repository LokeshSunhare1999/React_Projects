import * as types from "./actionTypes";

export const loadUserStart = () => ({
    type: types.LOAD_USERS_START,
})
export const loadUserSuccess = (users) => ({
    type: types.LOAD_USERS_SUCCESS,
    payload: users
})
export const loadUserError = (error) => ({
    type: types.LOAD_USERS_ERROR,
    payload: error
})