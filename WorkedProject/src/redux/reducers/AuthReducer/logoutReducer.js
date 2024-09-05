import * as type from '../../constants';

const initialState = {
    logout: [],
    loading: false,
    error: null,
}

export default function logout(state = initialState, action) {
    switch (action.type) {
        case type.LOGOUT:
            return {
                ...state,
                loading: true,
            }
        case type.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                logout: action.logout
            }
        case type.LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}