import { defineAction } from 'redux-typed-actions'

export const AddCourse = defineAction('ADD_COURSE_REQUEST')
export const AddCourseSuccess = defineAction('ADD_COURSE_SUCCESS')
export const AddCourseFailed = defineAction('ADD_COURSE_FAILED')
