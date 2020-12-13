import { Button } from 'antd'
import GlobalModal from 'components/GlobalModal'
import React from 'react'
import { history, MODAL_TYPE } from 'ultis/functions'

function Home() {
  return (
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
          GlobalModal.alertMessage('Thông báo', 'Ha ha', MODAL_TYPE.CHOICE)
        }}
      >
        Mở modal
      </Button>
      <Button type="primary" onClick={() => history.push('signin')}>
        Đăng ký
      </Button>
      <Button onClick={() => history.push('signup')}>Đăng nhập</Button>
    </div>
  )
}

export default Home
