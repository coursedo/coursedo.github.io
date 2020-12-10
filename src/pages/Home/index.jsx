import { Button, Modal, Typography } from 'antd'
import { GlobalModalSetup } from 'components/GlobalModal'
import React, { useState } from 'react'
import { history } from 'ultis/functions'
import 'antd/dist/antd.css'

const { Text } = Typography

function Home() {
  const [visible, setVisible] = useState(false)
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
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            'haha chưa config button modal'
          )
          // setVisible(true)
        }}
      >
        Mở modal
      </Button>
      <Button onClick={() => history.push('signin')}>Đăng ký</Button>
      <Button onClick={() => history.push('signup')}>Đăng nhập</Button>
      <Modal
        title="hello"
        visible={visible}
        centered
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Text>{'hu hu'}</Text>
      </Modal>
    </div>
  )
}

export default Home
