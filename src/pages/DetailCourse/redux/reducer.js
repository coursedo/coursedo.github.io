import {
  CleanCourse,
  CleanFeedbacks,
  EnrollCourseSuccess,
  GetCourseDetail,
  GetCourseDetailFailed,
  GetCourseDetailSuccess,
  GetListFeedbackSuccess,
  UpdateCurChapter
} from './actions'
const initialState = {
  course: null,
  chapter: null,
  isLoading: false,
  feedbacks: [],
  total: 0,
  page: 1
}

export function DetailCourseReducer(state = initialState, action) {
  switch (action.type) {
    case GetCourseDetail.type:
      return {
        ...state,
        isLoading: true
      }
    case GetCourseDetailSuccess.type:
      return {
        ...state,
        course: action.payload,
        isLoading: false
      }
    case GetCourseDetailFailed.type:
      return {
        ...state,
        isLoading: false,
        chapter: null
      }
    case EnrollCourseSuccess.type:
      return {
        ...state,
        course: {
          ...state.course,
          isEnrolled: action.payload.id !== null ? true : false
        }
      }
    case UpdateCurChapter.type:
      return {
        ...state,
        chapter: action.payload
      }
    case GetListFeedbackSuccess.type:
      return {
        ...state,
        feedbacks: action.payload.results,
        page: action.payload.page,
        total: action.payload.total
      }
    case CleanCourse.type:
      return {
        ...state,
        course: null,
        chapter: null
      }
    case CleanFeedbacks.type:
      return {
        ...state,
        feedbacks: [],
        total: 0,
        page: 1
      }
    default:
      return state
  }
}
