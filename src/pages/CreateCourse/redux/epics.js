import GlobalModal from 'components/GlobalModal'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { history, MODAL_TYPE } from 'ultis/functions'
import { AddCourse, AddCourseFailed, AddCourseSuccess } from './actions'

const addCourseEpic$ = action$ =>
  action$.pipe(
    ofType(AddCourse.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'course',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 201) {
            GlobalModal.alertMessage(
              'Information',
              'Succeed creating course. Go back to home',
              MODAL_TYPE.NORMAL,
              () => history.replace('/')
            )
            return AddCourseSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return AddCourseFailed.get(result)
        }),
        catchError(error => {
          return AddCourseFailed.get(error)
        })
      )
    })
  )

export const courseEpics = combineEpics(addCourseEpic$)
