import GlobalModal from 'components/GlobalModal'
import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import {
  AddCategory,
  AddCategoryFailed,
  AddCategorySuccess,
  DeleteCategory,
  DeleteCategoryFailed,
  DeleteCategorySuccess,
  GetAllCategories,
  GetAllCategoriesFailed,
  GetAllCategoriesSuccess,
  UpdateCategory,
  UpdateCategoryFailed,
  UpdateCategorySuccess
} from './actions'

const getCategoriesEpic$ = action$ =>
  action$.pipe(
    ofType(GetAllCategories.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'category'
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetAllCategoriesSuccess.get(result.data)
          }
          return GetAllCategoriesFailed.get(result)
        }),
        catchError(error => {
          return GetAllCategoriesFailed.get(error)
        })
      )
    })
  )

const addCategoryEpic$ = action$ =>
  action$.pipe(
    ofType(AddCategory.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'category',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 201) {
            store.dispatch(GetAllCategories.get())
            return AddCategorySuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return AddCategoryFailed.get(result)
        }),
        catchError(error => {
          return AddCategoryFailed.get(error)
        })
      )
    })
  )

const updateCategoryEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateCategory.type),
    exhaustMap(action => {
      return request({
        method: 'PATCH',
        url: `category/${action.payload.id}`,
        param: action.payload.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetAllCategories.get())
            return UpdateCategorySuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return UpdateCategoryFailed.get(result)
        }),
        catchError(error => {
          return UpdateCategoryFailed.get(error)
        })
      )
    })
  )

const deleteCategoryEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteCategory.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `category/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 204) {
            store.dispatch(GetAllCategories.get())
            return DeleteCategorySuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return DeleteCategoryFailed.get(result)
        }),
        catchError(error => {
          return DeleteCategoryFailed.get(error)
        })
      )
    })
  )

export const dashboardEpics = combineEpics(
  getCategoriesEpic$,
  addCategoryEpic$,
  updateCategoryEpic$,
  deleteCategoryEpic$
)
