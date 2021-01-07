import { Space, Spin } from 'antd'
import { VerifyEmail } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import '../SignIn/signin.css'

function VerifyEmailPage() {
  const param = useParams()
  const { token } = param
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(VerifyEmail.get({ token }))
  }, [])

  return (
    <Space
      style={{ display: 'flex', justifyContent: 'center', paddingTop: 48 }}
    >
      <Spin size="large" />
    </Space>
  )
}

export default VerifyEmailPage
