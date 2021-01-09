import { connectRouter } from 'connected-react-router'
import { dashboardReducer } from 'pages/Dashboard/redux/reducer'
import { authReducer } from 'pages/SignIn/redux/reducer'
import { combineReducers } from 'redux'
import { history } from 'ultis/functions'

export const rootReducer = combineReducers({
  Auth: authReducer,
  Dashboard: dashboardReducer,
  router: connectRouter(history)
})
