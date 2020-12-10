import { combineEpics } from 'redux-observable'
import { authEpics } from 'pages/SignIn/redux/epics'

export const rootEpic = combineEpics(authEpics)
