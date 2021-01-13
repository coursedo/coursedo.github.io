import { Button } from 'antd'
import CInput from 'components/CInput'
import { Formik } from 'formik'
import { ChangePassword } from 'pages/SignIn/redux/actions'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import * as yup from 'yup'
import '../profile.css'

function ChangePassTab({ user }) {
  const isLoading = useSelector(state => state.Auth.isLoading)
  const dispatch = useDispatch()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  const validationSchema = yup.object().shape({
    oldPass: yup
      .string()
      .required('* Please input password')
      .min(8, 'Password must include at least 8 characters')
      .max(48, 'Password must include at most 48 characters')
      .matches(/(?=.{8,})/, {
        message: 'Password must include at least 8 characters'
      }),
    newPass: yup
      .string()
      .required('* Please input password')
      .min(8, 'New password must include at least 8 characters')
      .max(48, 'New password must include at most 48 characters')
      .matches(/(?=.{8,})/, {
        message: 'New password must include at least 8 characters'
      })
      .notOneOf(
        [yup.ref('oldPass'), null],
        'New password must be different from old password'
      ),

    confirmPass: yup
      .string()
      .required('* Please input new password again')
      .oneOf(
        [yup.ref('newPass'), null],
        'Confirm password is not same as new password'
      )
  })

  const changePassword = values => {
    dispatch(ChangePassword.get({ id: user.id, data: values }))
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      changePassword(values)
    }
  }
  return (
    <Formik
      initialValues={{
        oldPass: '',
        newPass: '',
        confirmPass: ''
      }}
      isInitialValid={false}
      validationSchema={validationSchema}
      onSubmit={values => changePassword(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        errors,
        touched,
        setFieldTouched
      }) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 48
            }}
          >
            <div style={{ width: isDesktopOrLaptop ? 400 : '100%' }}>
              <CInput
                className="inputBox"
                placeholder="Current password"
                defaultValue={values.oldPass}
                onChange={handleChange('oldPass')}
                onTouchStart={() => setFieldTouched('oldPass')}
                onBlur={handleBlur('oldPass')}
                onKeyPress={event => handleKeyPress(isValid, event, values)}
                error={errors.oldPass}
                type="password"
              />
              <CInput
                className="inputBox"
                placeholder="New password"
                defaultValue={values.newPass}
                onChange={handleChange('newPass')}
                onTouchStart={() => setFieldTouched('newPass')}
                onBlur={handleBlur('newPass')}
                onKeyPress={event => handleKeyPress(isValid, event, values)}
                error={errors.newPass}
                type="password"
              />
              <CInput
                className="inputBox"
                placeholder="Confirm password"
                defaultValue={values.confirmPass}
                onChange={handleChange('confirmPass')}
                onTouchStart={() => setFieldTouched('confirmPass')}
                onBlur={handleBlur('confirmPass')}
                onKeyPress={event => handleKeyPress(isValid, event, values)}
                error={errors.confirmPass}
                type="password"
              />
            </div>
            <Button
              style={{ marginTop: 24 }}
              disabled={!isValid}
              loading={isLoading}
              type="primary"
              onClick={handleSubmit}
            >
              {isLoading ? 'Changing' : 'Change password'}
            </Button>
          </div>
        )
      }}
    </Formik>
  )
}

export default ChangePassTab
