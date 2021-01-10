import { combineEpics } from 'redux-observable'
import { authEpics } from 'pages/SignIn/redux/epics'
import { dashboardEpics } from 'pages/Dashboard/redux/epics'
import { courseEpics } from 'pages/CreateCourse/redux/epics'
import { homeEpics } from 'pages/Home/redux/epics'

export const rootEpic = combineEpics(
  authEpics,
  dashboardEpics,
  courseEpics,
  homeEpics
)
