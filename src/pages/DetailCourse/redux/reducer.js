import {
  CleanCourse,
  EnrollCourseSuccess,
  GetCourseDetailSuccess,
  GetListFeedbackSuccess,
  UpdateCurChapter
} from './actions'
const initialState = {
  course: null,
  chapter: null,
  feedbacks: [],
  total: 0,
  page: 1,
}

export function DetailCourseReducer(state = initialState, action) {
  switch (action.type) {
    case GetCourseDetailSuccess.type:
      return {
        ...state,
        course: action.payload,
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
    default:
      return state
  }
}
