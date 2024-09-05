import * as type from '../../constants';

const initialState = {
    forgot_Data: [],
  loading: false,
  error: null,
}

export default function forgot(state = initialState, action) {
  switch (action.type) {
    case type.FORGOT:
      return {
        ...state,
        loading: true,
      }
    case type.FORGOT_SUCCESS:
      return {
        ...state,
        loading: false,
        forgot_Data: action.forgot
      }
    case type.FORGOT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}