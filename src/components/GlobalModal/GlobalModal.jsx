import { Modal, Typography } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import { MODAL_TYPE } from 'ultis/functions'

const { Text } = Typography

class GlobalModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      title: '',
      content: '',
      type: MODAL_TYPE.NORMAL,
      onPress: () => {}
    }
  }

  alertMessage = (
    iTitle = '',
    iContent,
    iType = MODAL_TYPE.NORMAL,
    onPress = () => {}
  ) => {
    this.setState({
      isShow: true,
      title: iTitle,
      content: iContent ? iContent : 'Đã có lỗi xảy ra',
      type: iType ? iType : MODAL_TYPE.NORMAL,
      onPress: onPress ? onPress : () => {}
    })
  }

  closeModal = () => {
    this.setState({ isShow: false })
  }

  handleOk = () => {
    this.state.onPress()
    this.closeModal()
  }

  handleCancel = () => {
    this.closeModal()
  }

  render() {
    return (
      <Modal
        title={this.state.title}
        visible={this.state.visible}
        centered
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Text>{this.state.content}</Text>
      </Modal>
    )
  }
}

export default GlobalModal
