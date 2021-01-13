import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Spin, Typography } from 'antd'
import CInput from 'components/CInput'
import { Formik } from 'formik'
import { UpdateProfile } from 'pages/SignIn/redux/actions'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { COLOR } from 'ultis/functions'
import * as yup from 'yup'
import '../profile.css'
import AvatarDialog from './avatarDialog'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required('* Please input password')
    .min(3, 'Full name must include at least 3 characters')
    .max(64, 'Full name must include at most 48 characters')
    .matches(
      /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
      {
        message: 'Invalid full name'
      }
    ),
  phoneNumber: yup
    .string()
    .required('* Please input phone number')
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, {
      message: 'Invalid phone number'
    })
})

function ProfileTab({ user }) {
  const [isEdit, setEdit] = useState(false)
  const isLoading = useSelector(state => state.Auth.isLoading)
  const dispatch = useDispatch()
  const inputRef = useRef()
  const [src, setSrc] = useState(null)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  useEffect(() => {
    if (!isLoading) {
      setEdit(false)
    }
  }, [isLoading])

  const handleUpdateProfile = values => {
    dispatch(UpdateProfile.get({ id: user.id, data: values }))
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      handleUpdateProfile(values)
    }
  }

  const readSrc = picture => {
    let reader = new FileReader()
    reader.readAsDataURL(picture)
    reader.onloadend = () => {
      setSrc(reader.result)
    }
  }

  const onCloseDialog = () => {
    setSrc(null)
  }
  return (
    <Formik
      initialValues={{
        fullName: user?.fullName || '',
        phoneNumber: user?.phoneNumber || ''
      }}
      isInitialValid={false}
      validationSchema={validationSchema}
      onSubmit={values => handleUpdateProfile(values)}
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
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 48,
                flexDirection: isDesktopOrLaptop ? 'row' : 'column'
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: isDesktopOrLaptop ? 0 : 32
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={inputRef}
                  type="file"
                  onChange={e => readSrc(e.target.files[0])}
                />
                <a onClick={() => inputRef.current.click()}>
                  {isLoading ? (
                    <Spin indicator={loadingIcon} />
                  ) : user?.avatar ? (
                    <Avatar size={150} src={user?.avatar} />
                  ) : (
                    <Avatar size={150} icon={<UserOutlined />} />
                  )}
                </a>

                <Typography style={{ fontSize: 20, marginTop: 16 }}>
                  {user.fullName}
                </Typography>
              </div>

              <div style={{ width: isDesktopOrLaptop ? 400 : '100%' }}>
                <CInput
                  className="inputBox"
                  placeholder="Full name"
                  defaultValue={values.fullName}
                  disabled={!isEdit}
                  onChange={handleChange('fullName')}
                  onTouchStart={() => setFieldTouched('fullName')}
                  onBlur={handleBlur('fullName')}
                  onKeyPress={event => handleKeyPress(isValid, event, values)}
                  error={errors.fullName}
                />
                <CInput
                  className="inputBox"
                  placeholder="Email"
                  defaultValue={user?.email}
                  disabled={true}
                />
                <CInput
                  className="inputBox"
                  placeholder="Phone number"
                  defaultValue={values.phoneNumber}
                  disabled={!isEdit}
                  onChange={handleChange('phoneNumber')}
                  onTouchStart={() => setFieldTouched('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  onKeyPress={event => handleKeyPress(isValid, event, values)}
                  error={errors.phoneNumber}
                />
              </div>
            </div>
            {isEdit ? (
              <Button
                disabled={!isValid}
                loading={isLoading}
                type="primary"
                onClick={handleSubmit}
              >
                {isLoading ? 'Updating' : 'Update'}
              </Button>
            ) : (
              <Button type="primary" onClick={() => setEdit(true)}>
                {'Edit'}
              </Button>
            )}
            <AvatarDialog
              open={src != null}
              value={src}
              onClose={onCloseDialog}
            />
          </div>
        )
      }}
    </Formik>
  )
}

export default ProfileTab
