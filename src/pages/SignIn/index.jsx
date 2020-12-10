import { Button, Input } from 'antd'
import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import { COLOR } from 'ultis/functions'
import * as yup from 'yup'
import { SignInRequest } from './redux/actions'
import './signin.css'

function SignIn() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth?.user)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  useEffect(() => {
    if (user) {
      if (history.location.state) {
        history.goBack()
      } else {
        history.replace('/')
      }
    }
  }, [user])

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('* Vui lòng nhập mật khẩu')
      .min(8, 'Mật khẩu gồm 8 kí tự trở lên')
      .max(48, 'Mật khẩu không vượt quá 48 kí tự')
      .matches(/(?=.{8,})/, {
        message: 'Mật khẩu phải gồm 8 kí tự'
      }),
    email: yup
      .string()
      .label('Email')
      .email('Email hiện tại không hợp lệ')
      .required('* Vui lòng nhập email')
  })

  const handleLogin = values => {
    dispatch(
      SignInRequest.get({ ...values, email: values.email.toLowerCase() })
    )
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      handleLogin(values)
    }
  }

  return (
    <div id="bg">
      <div id="loginBg">
        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <span className="dimoName">coursedo</span>
        </a>
        <div id="loginBox">
          <span id="loginStyle">Đăng nhập</span>
          <Formik
            initialValues={{
              password: '',
              email: ''
            }}
            isInitialValid={false}
            validationSchema={validationSchema}
            onSubmit={values => handleLogin(values)}
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
                <Form className="formStyle">
                  <Input
                    id="inputBox"
                    value={values.email}
                    onChange={handleChange('email')}
                    onTouchStart={() => setFieldTouched('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Email"
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                  />
                  {errors.email && <span id="errorStyle">{errors.email}</span>}
                  <Input
                    id="inputBox"
                    type="password"
                    onChange={handleChange('password')}
                    onTouchStart={() => setFieldTouched('password')}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    placeholder="Mật khẩu"
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                  />
                  {errors.password && (
                    <span id="errorStyle">{errors.password}</span>
                  )}
                  <div className="buttomBox">
                    <Button onClick={() => history.push('/forgot')}>
                      Quên mật khẩu
                    </Button>
                    <div>
                      <span>Chưa có tài khoản?</span>
                      <Button
                        color="primary"
                        onClick={() => history.push('/signup')}
                      >
                        Đăng ký
                      </Button>
                    </div>
                  </div>
                  <Button
                    id="loginBtn"
                    disabled={!isValid}
                    style={{
                      backgroundColor: isValid ? COLOR.primary : COLOR.gray
                    }}
                    onClick={handleSubmit}
                    size={'large'}
                  >
                    Đăng nhập
                  </Button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      {isDesktopOrLaptop && (
        <div id="imgBg">
          <span className="tagline">Vào bếp không khó</span>
          <span className="tagline">Có Lemon-aid lo</span>
        </div>
      )}
    </div>
  )
}

export default SignIn
