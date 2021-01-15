import GlobalModal from 'components/GlobalModal'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import {
  AddToWatchList,
  AddToWatchListFailed,
  AddToWatchListSuccess,
  EnrollCourse,
  EnrollCourseFailed,
  EnrollCourseSuccess,
  GetCourseDetail,
  GetCourseDetailFailed,
  GetCourseDetailSuccess,
  GetListFeedback,
  GetListFeedbackFailed,
  GetListFeedbackSuccess,
  Rating,
  RatingFailed,
  RatingSuccess,
  SaveProgress,
  SaveProgressFailed,
  SaveProgressSuccess
} from './actions'

const getCourseDetailEpic$ = action$ =>
  action$.pipe(
    ofType(GetCourseDetail.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `course/${action.payload}`,
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetCourseDetailSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return GetCourseDetailFailed.get(result)
        }),
        // @ts-ignore
        catchError(error => {
          return GetCourseDetailFailed.get(error)
        })
      )
    })
  )

const enrollCourseEpic$ = action$ =>
  action$.pipe(
    ofType(EnrollCourse.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: `course/${action.payload.id}/enroll`,
        param: action.payload.data,
        option: {
          format: 'json'
        }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return EnrollCourseSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return EnrollCourseFailed.get(result)
        }),
        // @ts-ignore
        catchError(error => {
          return EnrollCourseFailed.get(error)
        })
      )
    })
  )

const addWatchListEpic$ = action$ =>
  action$.pipe(
    ofType(AddToWatchList.type),
    exhaustMap(action => {
      return request({
        method: 'PATCH',
        url: `users/${action.payload.id}/watchlist`,
        param: { courseId: action.payload.courseId},
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return AddToWatchListSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return AddToWatchListFailed.get(result)
        }),
        // @ts-ignore
        catchError(error => {
          return AddToWatchListFailed.get(error)
        })
      )
    })
  )

const saveProgress$ = action$ =>
  action$.pipe(
    ofType(SaveProgress.type),
    exhaustMap(action => {
      return request({
        method: 'PATCH',
        url: `course/${action.payload.courseId}/enroll/${action.payload.enrollmentId}`,
        param: action.payload.data,
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage('Information', 'Update progression successfully!!!')
            return SaveProgressSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return SaveProgressFailed.get(result)
        }),
        // @ts-ignore
        catchError(error => {
          return SaveProgressFailed.get(error)
        })
      )
    })
  )

  const ratingEpic$ = action$ =>
  action$.pipe(
    ofType(Rating.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: `course/${action.payload.id}/rating`,
        param: action.payload.data,
        option: {
          format: 'json'
        }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage('Information', 'Thanks for your feedback!!!')
            return RatingSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return RatingFailed.get(result)
        }),
        // @ts-ignore
        catchError(error => {
          return RatingFailed.get(error)
        })
      )
    })
  )

  const getFbs$ = action$ =>
  action$.pipe(
    ofType(GetListFeedback.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `course/${action.payload.id}/feedback`,
        param: {
          page: action.payload.page,
          limit: 10,
        },
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetListFeedbackSuccess.get({...result.data, page: action.payload.page})
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return GetListFeedbackFailed.get(result)
        }),
        // @ts-ignore
        catchError(error => {
          return GetListFeedbackFailed.get(error)
        })
      )
    })
  )

export const courseDetailEpics = combineEpics(
  getCourseDetailEpic$,
  enrollCourseEpic$,
  addWatchListEpic$,
  saveProgress$,
  ratingEpic$,
  getFbs$
)
