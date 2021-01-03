import GlobalModal from 'components/GlobalModal'
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
        url: 'auth/login',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200 && result.data?.authenticated) {
            return SignInRequestSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            'Information',
            'Email or password may not correct. Please try again.'
          )
          return SignInRequestFailed.get(result.data.message)
        }),
        catchError(error => {
          return SignInRequestFailed.get(error)
        })
      )
    })
  )

const signupEpic$ = action$ =>
  action$.pipe(
    ofType(SignUpRequest.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'auth/signup',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 201) {
            store.dispatch(replace('/signin', { from: '/signup' }))
            GlobalModal.alertMessage(
              'Information',
              'Sign up succeed. Please sign in to continue.'
            )
            return SignUpRequestSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
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
            GlobalModal.alertMessage(
              'Information',
              'Please check email to change password',
              MODAL_TYPE.NORMAL,
              () => store.dispatch(replace('/'))
            )
            return ResetPasswordSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', null)
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
            GlobalModal.alertMessage(
              'Information',
              'Change new password succeed. Please sign in to continue.',
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
  createPasswordEpic$
)
