import GlobalModal from 'components/GlobalModal'
import { DeleteCategoryFailed } from 'pages/Dashboard/redux/actions'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { history, MODAL_TYPE } from 'ultis/functions'
import {
  AddCourse,
  AddCourseFailed,
  AddCourseSuccess,
  DeleteChapter,
  DeleteChapterSuccess,
  GetCourseDetail,
  GetCourseDetailFailed,
  GetCourseDetailSuccess,
  UpdateCourse,
  UpdateCourseFailed,
  UpdateCourseSuccess
} from './actions'

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

const editCourseEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateCourse.type),
    exhaustMap(action => {
      return request({
        method: 'PATCH',
        url: `course/${action.payload.id}`,
        param: action.payload.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            if (Object.keys(action.payload.data).length > 1) {
              GlobalModal.alertMessage(
                'Information',
                'Succeed editing course. Go back.',
                MODAL_TYPE.NORMAL,
                () => history.replace(`/course/${action.payload.id}`)
              )
            }
            return UpdateCourseSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return UpdateCourseFailed.get(result)
        }),
        catchError(error => {
          return UpdateCourseFailed.get(error)
        })
      )
    })
  )

const getCourseEpic$ = action$ =>
  action$.pipe(
    ofType(GetCourseDetail.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `course/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetCourseDetailSuccess.get(result.data)
          }
          return GetCourseDetailFailed.get(result)
        }),
        catchError(error => {
          return GetCourseDetailFailed.get(error)
        })
      )
    })
  )

const deleteChapterEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteChapter.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `course/${action.payload.courseId}/chapter/${action.payload.chapterId}`
      }).pipe(
        map(result => {
          if (result.status === 204) {
            action.payload?.onSuccess()
            return DeleteChapterSuccess.get(result.data)
          }
          return DeleteCategoryFailed.get(result)
        }),
        catchError(error => {
          return DeleteCategoryFailed.get(error)
        })
      )
    })
  )

export const courseEpics = combineEpics(
  addCourseEpic$,
  getCourseEpic$,
  editCourseEpic$,
  deleteChapterEpic$
)
