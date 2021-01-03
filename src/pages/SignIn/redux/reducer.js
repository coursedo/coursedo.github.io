import { SignInRequestSuccess, SignOut } from './actions'
const initialState = {
  token: null,
  refreshToken: null,
  user: null
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SignInRequestSuccess.type:
      return {
        ...state,
        token: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload
      }
    case SignOut.type:
      return initialState
    default:
      return state
  }
}
