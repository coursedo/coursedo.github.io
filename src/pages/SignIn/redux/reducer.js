import { SignInRequestSuccess, SignOut } from './actions'
const initialState = {
  token: null,
  user: null
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SignInRequestSuccess.type:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }
    case SignOut.type:
      return initialState
    default:
      return state
  }
}
