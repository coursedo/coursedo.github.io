import GlobalModal from 'components/GlobalModal'
// @ts-ignore
import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import {
  GetCoursesCate,
  GetCoursesCateFailed,
  GetCoursesCateSuccess,
  GetCoursesFilter,
  GetCoursesFilterFailed,
  GetCoursesFilterSuccess
} from './actions'

const getCourseFilterEpic$ = action$ =>
  action$.pipe(
    ofType(GetCoursesFilter.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `course`,
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetCoursesFilterSuccess.get({
              ...result.data,
              page: action.payload.page || null,
              sort: action.payload?.sort || null,
              sortOrder: action.payload?.sortOrder || null,
            })
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return GetCoursesFilterFailed.get(result)
        }),
        // @ts-ignore
        catchError(error => {
          return GetCoursesFilterFailed.get(error)
        })
      )
    })
  )
const getCourseCateEpic$ = action$ =>
  action$.pipe(
    ofType(GetCoursesCate.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `course`,
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetCoursesCateSuccess.get({
              ...result.data,
              page: action.payload.page || null,
              sort: action.payload?.sort || null,
              sortOrder: action.payload?.sortOrder || null,
            })
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return GetCoursesCateFailed.get(result)
        }),
        // @ts-ignore
        catchError((error) => {
          return GetCoursesCateFailed.get(error)
        })
      )
    })
  )

export const coursesEpics = combineEpics(
  getCourseFilterEpic$,
  getCourseCateEpic$
)
