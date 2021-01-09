import { combineEpics } from 'redux-observable'
import { authEpics } from 'pages/SignIn/redux/epics'
import { dashboardEpics } from 'pages/Dashboard/redux/epics'

export const rootEpic = combineEpics(authEpics, dashboardEpics)
