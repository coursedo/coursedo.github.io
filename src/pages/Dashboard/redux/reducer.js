import { PAGE } from 'pages/Dashboard/constant'
import { SignOut } from 'pages/SignIn/redux/actions'
import {
  GetAllCategories,
  GetAllCategoriesFailed,
  GetAllCategoriesSuccess,
  SetCurrentPage
} from './actions'
const initialState = {
  isLoading: false,
  isLoadingDashboard: false,
  currentPage: PAGE.CATEGORY,
  detailPage: null,
  categoryList: []
}

export function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GetAllCategories.type:
      return { ...state, isLoading: true }
    case GetAllCategoriesSuccess.type:
      return { ...state, categoryList: action.payload, isLoading: false }
    case GetAllCategoriesFailed.type:
      return { ...state, isLoading: false }
    case SetCurrentPage.type:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        detailPage: action.payload.detailPage
      }
    case SignOut.type:
      return initialState
    default:
      return state
  }
}
