import { Form, Formik } from 'formik'
import { SignUpRequest } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import { COLOR } from 'ultis/functions'
import * as yup from 'yup'
import '../SignIn/signin.css'
import { Button, Input } from 'antd'

function SignUp() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth?.user)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  useEffect(() => {
    if (user) {
      history.replace('/')
    }
  }, [user])

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .max(48, 'Email không được quá 48 kí tự')
      .label('Email')
      .email('Email không hợp lệ')
      .required('* Vui lòng nhập email'),
    password: yup
      .string()
      .required('* Vui lòng nhập mật khẩu')
      .min(8, 'Mật khẩu gồm 8 kí tự trở lên')
      .max(48, 'Mật khẩu không vượt quá 48 kí tự')
      .matches(/(?=.{8,})/, {
        message: 'Mật khẩu phải gồm 8 kí tự'
      }),
    confirmPassword: yup
      .string()
      .required('* Vui lòng nhập lại mật khẩu')
      .oneOf(
        [yup.ref('password'), null],
        'Mật khẩu nhập lại phải khớp với mật khẩu đã nhập'
      ),
    username: yup
      .string()
      .trim()
      .required('* Vui lòng nhập tên đăng nhập')
      .min(3, 'Tên đăng nhập từ 3 kí tự trở lên')
      .max(16, 'Tên đăng nhập không được quá 16 kí tự')
      .matches(
        /(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        'Tên đăng nhập không hợp lệ'
      )
  })

  const handleSignup = values => {
    dispatch(
      SignUpRequest.get({
        ...values,
        username: values.username.toLowerCase(),
        email: values.email.toLowerCase()
      })
    )
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      handleSignup(values)
    }
  }

  return (
    <div id="bg">
      <div id="loginBg" style={{ paddingBottom: 20 }}>
        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <span className="dimoName">Lemon-aid</span>
        </a>
        <div id="loginBox">
          <span id="loginStyle">Đăng ký</span>
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              username: ''
            }}
            isInitialValid={false}
            validationSchema={validationSchema}
            onSubmit={values => handleSignup(values)}
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
                // của material ui chưa đổi, tự đổi hén
                <Form className="formStyle">
                  {/* <CTextField
                    helperText={errors.username && errors.username}
                    FormHelperTextProps={{ classes: helperTextStyle }}
                    label="Tên đăng nhập"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange('username')}
                    onTouchStart={() => setFieldTouched('username')}
                    onBlur={handleBlur('username')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    style={styles.input}
                    autoFocus
                  />
                  <CTextField
                    helperText={errors.email && errors.email}
                    FormHelperTextProps={{ classes: helperTextStyle }}
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange('email')}
                    onTouchStart={() => setFieldTouched('email')}
                    onBlur={handleBlur('email')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    style={styles.input}
                  />
                  <CTextField
                    helperText={errors.password && errors.password}
                    FormHelperTextProps={{ classes: helperTextStyle }}
                    label="Mật khẩu"
                    variant="outlined"
                    onChange={handleChange('password')}
                    onTouchStart={() => setFieldTouched('password')}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    style={styles.input}
                    type="password"
                  />
                  <CTextField
                    helperText={
                      errors.confirmPassword && errors.confirmPassword
                    }
                    FormHelperTextProps={{ classes: helperTextStyle }}
                    label="Nhập lại mật khẩu"
                    variant="outlined"
                    onChange={handleChange('confirmPassword')}
                    onTouchStart={() => setFieldTouched('confirmPassword')}
                    value={values.confirmPassword}
                    onBlur={handleBlur('confirmPassword')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    style={styles.input}
                    type="password"
                  /> */}
                  <div style={{ alignSelf: 'flex-end' }}>
                    <span>Đã có tài khoản?</span>
                    <Button
                      color="primary"
                      onClick={() =>
                        history.push({
                          pathname: '/signin',
                          state: { from: `/signup` }
                        })
                      }
                    >
                      Đăng nhập
                    </Button>
                  </div>
                  <Button
                    id="loginBtn"
                    disabled={!isValid}
                    style={{
                      backgroundColor: isValid
                        ? COLOR.primary
                        : COLOR.deactiveGray
                    }}
                    onClick={handleSubmit}
                    size={'large'}
                  >
                    Đăng ký
                  </Button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      {isDesktopOrLaptop && (
        <div id="imgBg">
          {/* <img src={require('../../assets/signin_img.svg')} alt="img" /> */}
          <span className="tagline">Vào bếp không khó</span>
          <span className="tagline">Có Lemon-aid lo</span>
        </div>
      )}
    </div>
  )
}

export default SignUp
