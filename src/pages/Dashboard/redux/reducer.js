import { PAGE } from 'pages/Dashboard/constant'
import { SignOut } from 'pages/SignIn/redux/actions'
import {
  GetAllCategories,
  GetAllCategoriesFailed,
  GetAllCategoriesSuccess,
  GetUserProfile,
  GetUserProfileFailed,
  GetUserProfileSuccess,
  GetUsers,
  GetUsersFailed,
  GetUsersSuccess,
  SetCurrentPage
} from './actions'
const initialState = {
  isLoading: false,
  isLoadingDashboard: false,
  currentPage: PAGE.CATEGORY,
  detailPage: null,
  categoryList: [],
  userList: [],
  userDetail: null
}

export function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GetAllCategories.type:
      return { ...state, isLoading: true }
    case GetAllCategoriesSuccess.type:
      return { ...state, categoryList: action.payload, isLoading: false }
    case GetAllCategoriesFailed.type:
      return { ...state, isLoading: false }
    case GetUsers.type:
      return { ...state, isLoading: true }
    case GetUsersSuccess.type:
      return { ...state, userList: action.payload, isLoading: false }
    case GetUsersFailed.type:
      return { ...state, isLoading: false }
    case GetUserProfile.type:
      return { ...state, isLoading: true }
    case GetUserProfileSuccess.type:
      return { ...state, userDetail: action.payload, isLoading: false }
    case GetUserProfileFailed.type:
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
