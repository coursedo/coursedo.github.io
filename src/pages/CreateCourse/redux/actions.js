import { defineAction } from 'redux-typed-actions'

export const AddCourse = defineAction('ADD_COURSE_REQUEST')
export const AddCourseSuccess = defineAction('ADD_COURSE_SUCCESS')
export const AddCourseFailed = defineAction('ADD_COURSE_FAILED')

export const GetCourseDetail = defineAction('GET_COURSE_DETAIL_REQUEST')
export const GetCourseDetailSuccess = defineAction('GET_COURSE_DETAIL_SUCCESS')
export const GetCourseDetailFailed = defineAction('GET_COURSE_DETAIL_FAILED')

export const UpdateCourse = defineAction('UPDATE_COURSE_REQUEST')
export const UpdateCourseSuccess = defineAction('UPDATE_COURSE_SUCCESS')
export const UpdateCourseFailed = defineAction('UPDATE_COURSE_FAILED')

export const DeleteChapter = defineAction('DELETE_CHAPTER_REQUEST')
export const DeleteChapterSuccess = defineAction('DELETE_CHAPTER_SUCCESS')
export const DeleteChapterFailed = defineAction('DELETE_CHAPTER_FAILED')
