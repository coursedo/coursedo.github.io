import {
  GetCoursesCateSuccess,
  GetCoursesFilterSuccess,
  UpdateCurCate,
  UpdateSearch
} from './actions'
const initialState = {
  courseList: [],
  page: 1,
  sort: null,
  sortOrder: null,
  total: 0,
  curCate: ''
}

export function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case GetCoursesFilterSuccess.type:
      return {
        ...state,
        courseList: action.payload.results,
        page: action.payload.page,
        sortOrder: action.payload.sortOrder,
        sort: action.payload.sort,
        total:action.payload.total,
      }
    case GetCoursesCateSuccess.type:
      return {
        ...state,
        courseList: action.payload.results,
        page: action.payload.page,
        sortOrder: action.payload.sortOrder,
        sort: action.payload.sort,
        total:action.payload.total,
      }
    case UpdateCurCate.type:
      return {
        ...state,
        curCate: action.payload,
        page: 1,
      }
    case UpdateSearch.type:
      return {
        ...state,
        page: 1,
        sortOrder: null,
        sort: null,
        total:0,
      }
    default:
      return state
  }
}
