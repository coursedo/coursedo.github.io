import { connectRouter } from 'connected-react-router'
import { coursesReducer } from 'pages/Courses/redux/reducer'
import { courseReducer } from 'pages/CreateCourse/redux/reducer'
import { dashboardReducer } from 'pages/Dashboard/redux/reducer'
import { DetailCourseReducer } from 'pages/DetailCourse/redux/reducer'
import { homeReducer } from 'pages/Home/redux/reducer'
import { authReducer } from 'pages/SignIn/redux/reducer'
import { combineReducers } from 'redux'
import { history } from 'ultis/functions'

export const rootReducer = combineReducers({
  Auth: authReducer,
  Dashboard: dashboardReducer,
  Course: courseReducer,
  Home: homeReducer,
  CourseList: coursesReducer,
  DetailCourse: DetailCourseReducer,
  router: connectRouter(history)
})
