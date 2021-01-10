import { SignOut } from 'pages/SignIn/redux/actions'
const initialState = {
  isLoading: false
}

export function courseReducer(state = initialState, action) {
  switch (action.type) {
    case SignOut.type:
      return initialState
    default:
      return state
  }
}
