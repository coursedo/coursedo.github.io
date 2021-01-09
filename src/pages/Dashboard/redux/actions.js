import { defineAction } from 'redux-typed-actions'

export const SetCurrentPage = defineAction('SET_CURRENT_PAGE')

export const GetAllCategories = defineAction('GET_CATEGORIES_REQUEST')
export const GetAllCategoriesSuccess = defineAction('GET_CATEGORIES_SUCCESS')
export const GetAllCategoriesFailed = defineAction('GET_CATEGORIES_FAILED')

export const AddCategory = defineAction('ADD_CATEGORY_REQUEST')
export const AddCategorySuccess = defineAction('ADD_CATEGORY_SUCCESS')
export const AddCategoryFailed = defineAction('ADD_CATEGORY_FAILED')

export const UpdateCategory = defineAction('UPDATE_CATEGORY_REQUEST')
export const UpdateCategorySuccess = defineAction('UPDATE_CATEGORY_SUCCESS')
export const UpdateCategoryFailed = defineAction('UPDATE_CATEGORY_FAILED')

export const DeleteCategory = defineAction('DELETE_CATEGORY_REQUEST')
export const DeleteCategorySuccess = defineAction('DELETE_CATEGORY_SUCCESS')
export const DeleteCategoryFailed = defineAction('DELETE_CATEGORY_FAILED')
