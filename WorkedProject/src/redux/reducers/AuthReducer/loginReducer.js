import * as type from '../../constants';

const initialState = {
  login: [],
  loading: false,
  error: null,
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN:
      return {
        ...state,
        loading: true,
      }
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        login: action.login
      }
    case type.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}