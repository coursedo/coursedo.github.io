import { SignOut } from 'pages/SignIn/redux/actions'
import {
  AddCourse,
  AddCourseFailed,
  AddCourseSuccess,
  GetCourseDetail,
  GetCourseDetailFailed,
  GetCourseDetailSuccess,
  UpdateCourse,
  UpdateCourseFailed,
  UpdateCourseSuccess
} from './actions'
const initialState = {
  isLoading: false,
  courseDetail: null,
  isUpdating: false
}

export function courseReducer(state = initialState, action) {
  switch (action.type) {
    case SignOut.type:
      return initialState
    case GetCourseDetail.type:
      return { ...state, isLoading: true }
    case GetCourseDetailSuccess.type:
      return {
        ...state,
        courseDetail: action.payload,
        isLoading: false
      }
    case GetCourseDetailFailed.type:
      return { ...state, isLoading: false }
    case UpdateCourse.type:
      return { ...state, isUpdating: true }
    case UpdateCourseSuccess.type:
      return { ...state, isUpdating: false }
    case UpdateCourseFailed.type:
      return { ...state, isUpdating: false }
    case AddCourse.type:
      return { ...state, isUpdating: true }
    case AddCourseSuccess.type:
      return { ...state, isUpdating: false }
    case AddCourseFailed.type:
      return { ...state, isUpdating: false }
    default:
      return state
  }
}
