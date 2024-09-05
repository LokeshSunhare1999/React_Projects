import * as type from '../../constants';

const initialState = {
    profile_Data: [],
    loading: false,
    error: null,
}

export default function viewAdminProfile(state = initialState, action) {
    console.log("action", action)
    switch (action.type) {
        case type.VIEW_ADMIN_PROFILE:
            return {
                ...state,
                loading: true,
            }
        case type.VIEW_ADMIN_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                profile_Data: action.profileData
            }
        case type.VIEW_ADMIN_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}