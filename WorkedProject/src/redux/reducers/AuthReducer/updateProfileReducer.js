import * as type from '../../constants';

const initialState = {
  updateProfile: [],
  loading: false,
  error: null,
}

export default function updateProfile(state = initialState, action) {
  switch (action.type) {
    case type.UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
      }
    case type.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        updateProfile: action.updateProfile
      }
    case type.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}