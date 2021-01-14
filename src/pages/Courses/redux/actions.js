import { defineAction } from 'redux-typed-actions'

export const GetCoursesFilter = defineAction('GET_COURSES_FILTER_REQUEST')
export const GetCoursesFilterSuccess = defineAction('GET_COURSES_FILTER_SUCCESS')
export const GetCoursesFilterFailed = defineAction('GET_COURSES_FILTER_FAILED')

export const GetCoursesCate = defineAction('GET_COURSES_CATE_REQUEST')
export const GetCoursesCateSuccess = defineAction('GET_COURSES_CATE_SUCCESS')
export const GetCoursesCateFailed = defineAction('GET_COURSES_CATE_FAILED')

export const UpdateCurCate = defineAction('UPDATE_CUR_CATE')
export const UpdateSearch = defineAction('UPDATE_SEARCH')



