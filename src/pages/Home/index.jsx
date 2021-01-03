import { Button } from 'antd'
import GlobalModal from 'components/GlobalModal'
import Header from 'components/Header'
import { SignOut } from 'pages/SignIn/redux/actions'
import React from 'react'
import { useDispatch } from 'react-redux'
import { history, MODAL_TYPE } from 'ultis/functions'

function Home() {
  const dispatch = useDispatch()
  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'white'
        }}
      >
        <Button
          onClick={() => {
            GlobalModal.alertMessage('Information', 'Ha ha', MODAL_TYPE.CHOICE)
          }}
        >
          Mở modal
        </Button>
        <Button type="primary" onClick={() => history.push('/signup')}>
          Đăng ký
        </Button>
        <Button onClick={() => history.push('/signin')}>Đăng nhập</Button>
        <Button onClick={() => dispatch(SignOut.get())}>Log out</Button>
      </div>
    </>
  )
}

export default Home
