import { defineAction } from 'redux-typed-actions'

export const GetCourseDetail = defineAction('GET_COURSES_DETAIL_REQUEST')
export const GetCourseDetailSuccess = defineAction('GET_COURSES_DETAIL_SUCCESS')
export const GetCourseDetailFailed = defineAction('GET_COURSES_DETAIL_FAILED')

export const AddToWatchList = defineAction('ADD_TO_WATCHLIST_REQUEST')
export const AddToWatchListSuccess = defineAction('ADD_TO_WATCHLIST_SUCCESS')
export const AddToWatchListFailed = defineAction('ADD_TO_WATCHLIST_FAILED')

export const EnrollCourse = defineAction('ENROLL_REQUEST')
export const EnrollCourseSuccess = defineAction('ENROLL_SUCCESS')
export const EnrollCourseFailed = defineAction('ENROLL_FAILED')

export const SaveProgress = defineAction('SAVE_PROGRESS_REQUEST')
export const SaveProgressSuccess = defineAction('SAVE_PROGRESS_SUCCESS')
export const SaveProgressFailed = defineAction('SAVE_PROGRESS_FAILED')

export const Rating = defineAction('RATING_REQUEST')
export const RatingSuccess = defineAction('RATING_SUCCESS')
export const RatingFailed = defineAction('RATING_FAILED')

export const GetListFeedback = defineAction('GET_LIST_FEEDBACK_REQUEST')
export const GetListFeedbackSuccess = defineAction('GET_LIST_FEEDBACK_SUCCESS')
export const GetListFeedbackFailed = defineAction('GET_LIST_FEEDBACK_FAILED')

export const UpdateCurChapter = defineAction('UPDATE_CUR_CHAPTER')
export const CleanCourse = defineAction('CLEAN_COURSE')
