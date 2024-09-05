import * as type from '../../constants';

const initialState = {
    loading: false,
    error: null,
    exists: null,
}

export default function loading(state = initialState, action) {
    switch (action.type) {
        case type.LOADING:
            return {
                ...state,
                fetching: true,
                error: null,
                loading: true
            }
        case type.LOADING_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                loading: false,
                exists: true
            }
        case type.LOADING_FAILURE:
            return {
                ...state,
                fetching: false,
                error: null,
                exists: false,
                loading: false
            }
        default:
            return state
    }
}
