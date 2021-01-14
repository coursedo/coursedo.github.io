import { combineEpics } from 'redux-observable'
import { authEpics } from 'pages/SignIn/redux/epics'
import { dashboardEpics } from 'pages/Dashboard/redux/epics'
import { courseEpics } from 'pages/CreateCourse/redux/epics'
import { homeEpics } from 'pages/Home/redux/epics'
import { coursesEpics } from 'pages/Courses/redux/epics'

export const rootEpic = combineEpics(
  authEpics,
  dashboardEpics,
  courseEpics,
  homeEpics,
  coursesEpics
)
