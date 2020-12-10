import { GlobalModalSetup } from 'components/GlobalModal'
import { replace } from 'connected-react-router'
import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { MODAL_TYPE } from 'ultis/functions'
import {
  CreatePassword,
  CreatePasswordFailed,
  CreatePasswordSuccess,
  ResetPassword,
  ResetPasswordFailed,
  ResetPasswordSuccess,
  SignInRequest,
  SignInRequestFailed,
  SignInRequestSuccess,
  SignUpRequest,
  SignUpRequestFailed,
  SignUpRequestSuccess
} from './actions'

const signinEpic$ = action$ =>
  action$.pipe(
    ofType(SignInRequest.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'signin',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return SignInRequestSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data?.err
          )
          return SignInRequestFailed.get(result.data.err)
        }),
        catchError(error => {
          return SignInRequestFailed.get(error)
        })
      )
    })
  )

const signinSuccessEpic$ = action$ =>
  action$.pipe(
    ofType(SignInRequestSuccess.type),
    map(action => {})
  )

const signupEpic$ = action$ =>
  action$.pipe(
    ofType(SignUpRequest.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'signup',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(replace('/signin', { from: '/signup' }))
            GlobalModalSetup.getGlobalModalHolder().alertMessage(
              'Thông báo',
              result.data.message
            )
            return SignUpRequestSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data?.message
          )
          return SignUpRequestFailed.get(result)
        }),
        catchError(error => {
          return SignUpRequestFailed.get(error)
        })
      )
    })
  )

const resetPasswordEpic$ = action$ =>
  action$.pipe(
    ofType(ResetPassword.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'reset-password',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModalSetup.getGlobalModalHolder().alertMessage(
              'Thông báo',
              'Vui lòng kiểm tra email để thay đổi mật khẩu',
              MODAL_TYPE.NORMAL,
              () => store.dispatch(replace('/'))
            )
            return ResetPasswordSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            null
          )
          return ResetPasswordFailed.get(result)
        }),
        catchError(error => {
          return ResetPasswordFailed.get(error)
        })
      )
    })
  )

const createPasswordEpic$ = action$ =>
  action$.pipe(
    ofType(CreatePassword.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'create-new-password',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModalSetup.getGlobalModalHolder().alertMessage(
              'Thông báo',
              'Tạo mật khẩu thành công. Vui lòng đăng nhập',
              MODAL_TYPE.NORMAL,
              () => store.dispatch(replace('/signin'))
            )
            return CreatePasswordSuccess.get(result.data)
          }
          return CreatePasswordFailed.get(result)
        }),
        catchError(error => {
          return CreatePasswordFailed.get(error)
        })
      )
    })
  )

export const authEpics = combineEpics(
  signinEpic$,
  signupEpic$,
  resetPasswordEpic$,
  signinSuccessEpic$,
  createPasswordEpic$
)
