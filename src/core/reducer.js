import { connectRouter } from 'connected-react-router'
import { courseReducer } from 'pages/CreateCourse/redux/reducer'
import { dashboardReducer } from 'pages/Dashboard/redux/reducer'
import { homeReducer } from 'pages/Home/redux/reducer'
import { authReducer } from 'pages/SignIn/redux/reducer'
import { combineReducers } from 'redux'
import { history } from 'ultis/functions'

export const rootReducer = combineReducers({
  Auth: authReducer,
  Dashboard: dashboardReducer,
  Course: courseReducer,
  Home: homeReducer,
  router: connectRouter(history)
})
