import {
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
  isLoading: false
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
        isLoading: false
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
        feedback: action.payload.results,
        page: action.payload.page,
        total: action.payload.total
      }
    default:
      return state
  }
}
