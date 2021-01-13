import { Button, Modal } from 'antd'
import { UpdateProfile } from 'pages/SignIn/redux/actions'
import React, { useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from 'react-redux'
import CoursedoFirebase from 'ultis/firebaseConfig'

function AvatarDialog(props) {
  const dispatch = useDispatch()

  const user = useSelector(state => state.Auth.user)

  const [crop, setCrop] = useState({ aspect: 1 / 1 })
  const [imageRef, setImageRef] = useState(null)
  const [cropped, setCropped] = useState(null)

  const { onClose, value, open } = props

  const onSubmit = () => {
    handleUploadImg()
    onClose()
  }

  const handleUploadImg = async () => {
    try {
      const snapshot = await CoursedoFirebase.storage()
        .ref('Avatar')
        .child(user.id)
        .putString(cropped, 'data_url')
      const downloadUrl = await snapshot.ref.getDownloadURL()
      dispatch(
        UpdateProfile.get({ id: user.id, data: { avatar: downloadUrl } })
      )
    } catch (errorUpload) {
      console.log(errorUpload)
    }
  }

  const makeClientCrop = async crop => {
    if (imageRef && crop.width && crop.height) {
      await getCroppedImg(imageRef, crop)
    }
  }

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const reader = new FileReader()
    canvas.toBlob(blob => {
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        setCropped(reader.result)
      }
    })
  }

  return (
    <Modal
      title={'Update avatar'}
      visible={open}
      centered
      onOk={onSubmit}
      onCancel={onClose}
      footer={[
        <Button key="cancelButton" onClick={onClose} size="large">
          Cancel
        </Button>,
        <Button
          key="okButton"
          size="large"
          type="primary"
          onClick={onSubmit}
          disabled={cropped == null}
        >
          Update
        </Button>
      ]}
    >
      <ReactCrop
        src={value}
        crop={crop}
        ruleOfThirds
        onImageLoaded={image => setImageRef(image)}
        onComplete={makeClientCrop}
        onChange={crop => setCrop(crop)}
      />
    </Modal>
  )
}

AvatarDialog.defaultProps = {
  value: null,
  onClose: () => {},
  open: false
}

export default AvatarDialog
