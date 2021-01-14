import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  Upload
} from 'antd'
import CInput from 'components/CInput'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Formik } from 'formik'
import {
  beforeUpload,
  dummyRequest,
  getBase64
} from 'pages/Dashboard/component/addTeacher'
import { GetAllCategories, GetUsers } from 'pages/Dashboard/redux/actions'
import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import CoursedoFirebase from 'ultis/firebaseConfig'
import { COLOR, ROLES } from 'ultis/functions'
import { validationCourseSchema } from './constant'
import './createCourse.css'
import { AddCourse } from './redux/actions'

const { Title, Text } = Typography
const { Option } = Select

export default function CreateCourse(props) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const history = useHistory()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const userList = useSelector(state => state.Dashboard.userList)
  const categoryList = useSelector(state => state.Dashboard.categoryList)
  const isUpdating = useSelector(state => state.Course.isUpdating)
  const [isLoadingImage, setLoadingImage] = useState(false)
  const [imgName, setImgName] = useState(null)
  let realList = []
  categoryList.forEach(item => {
    realList.push({
      name: item.name,
      id: item.id
    })
    item?.subCategory &&
      item?.subCategory.length > 0 &&
      item?.subCategory.forEach(subCat => {
        realList.push({
          name: subCat.name,
          id: subCat.id
        })
      })
  })

  useEffect(() => {
    if (user && (user.role === ROLES.ADMIN || user.role === ROLES.TEACHER)) {
      dispatch(GetAllCategories.get())
      if (user.role === ROLES.ADMIN) {
        dispatch(GetUsers.get({ role: ROLES.TEACHER }))
      }
    } else {
      history.replace('/')
    }
  }, [user])

  const submitCourse = (values, imgURL) => {
    values.chapters.forEach((item, index) => {
      item.numberId = index + 1
    })
    dispatch(
      AddCourse.get({
        ...values,
        numberOfChapter: values.chapters.length,
        thumbnail: imgURL,
        promotionPrice: Number(values.promotionPrice)
          ? Number(values.promotionPrice)
          : null
      })
    )
  }

  const handleUploadImg = values => {
    CoursedoFirebase.storage()
      .ref('Courses')
      .child(imgName)
      .getDownloadURL()
      .then(dwnURL => {
        submitCourse(values, dwnURL)
      })
      .catch(async error => {
        try {
          const snapshot = await CoursedoFirebase.storage()
            .ref('Courses')
            .child(imgName)
            .putString(values.thumbnail, 'data_url')
          const downloadUrl = await snapshot.ref.getDownloadURL()
          submitCourse(values, downloadUrl)
        } catch (errorUpload) {}
      })
  }

  const handleUploadThumb = (info, handleChange) => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      setImgName(info.file.name)
      getBase64(info.file.originFileObj, imageUrl => {
        handleChange('thumbnail')(imageUrl)
        setLoadingImage(false)
      })
    }
  }

  const handleDescription = (state, setFieldValue = value => {}) => {
    const rawContentState = convertToRaw(state.getCurrentContent())
    const markup = draftToHtml(rawContentState)
    setFieldValue('description', markup)
  }

  if (!user) {
    return (
      <>
        <Header from="addCourse" />
        <Space size="large" align="center" direction="vertical">
          <Typography variant="body1" style={{ margin: 28 }}>
            You are not signed in. Please sign in to create course
          </Typography>
          <Button
            type="primary"
            size="large"
            onClick={() =>
              history.push({
                pathname: '/signin',
                state: { from: `/create` }
              })
            }
          >
            Sign in
          </Button>
        </Space>
      </>
    )
  }

  const uploadButton = (
    <div>
      {isLoadingImage ? (
        <LoadingOutlined style={{ color: COLOR.primary1 }} />
      ) : (
        <PlusOutlined />
      )}
      <div
        className="ant-upload-text"
        style={{ fontFamily: 'Source Sans Pro' }}
      >
        {isLoadingImage ? 'Uploading' : 'Upload'}
      </div>
    </div>
  )

  return (
    <>
      <Header from="addCourse" />
      <Formik
        initialValues={{
          name: '',
          shortDescription: null,
          description: '',
          thumbnail: null,
          price: 0,
          chapters: [{ numberId: 1, name: '', description: null, video: null }],
          categoryId: null,
          completeStatus: false,
          publicStatus: true,
          teacherId: user && user.role === ROLES.TEACHER ? user.id : null,
          promotionPrice: null
        }}
        isInitialValid={false}
        validationSchema={validationCourseSchema}
        onSubmit={values => handleUploadImg(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
          setFieldTouched,
          setFieldValue
        }) => {
          return (
            <div
              className={'createBg'}
              style={{
                marginLeft: isDesktopOrLaptop ? 64 : 0,
                marginRight: isDesktopOrLaptop ? 64 : 0
              }}
            >
              <Title
                level={4}
                style={{ textAlign: 'center', marginBottom: 48 }}
              >
                Create new course
              </Title>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={dummyRequest}
                beforeUpload={beforeUpload}
                onChange={info => handleUploadThumb(info, handleChange)}
              >
                {values.thumbnail ? (
                  <img
                    src={values.thumbnail}
                    alt="avatar"
                    style={{ width: '100%' }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              <Typography style={{ color: 'red' }}>
                {errors.thumbnail}
              </Typography>
              <div style={{ marginTop: 12 }}>
                <Text strong>Name</Text>
                <CInput
                  className="inputBox"
                  value={values.name}
                  onChange={handleChange('name')}
                  onTouchStart={() => setFieldTouched('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Python Development"
                  error={errors.name}
                />
              </div>

              <div>
                <Text strong>Short description</Text>
                <CInput
                  className="inputBox"
                  value={values.shortDescription}
                  onChange={handleChange('shortDescription')}
                  onTouchStart={() => setFieldTouched('shortDescription')}
                  onBlur={handleBlur('shortDescription')}
                  placeholder="This is a Python course"
                  error={errors.shortDescription}
                />
              </div>

              <div>
                <Text strong>Description</Text>
                <Editor
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onBlur={(event, state) =>
                    handleDescription(state, setFieldValue)
                  }
                />
              </div>

              <div style={{ marginBottom: 12, marginTop: 16 }}>
                <Text strong>Category</Text>
                <Select
                  style={{ width: '100%' }}
                  value={values.categoryId}
                  onChange={value => setFieldValue('categoryId', value)}
                >
                  <Option value={null}>Choose one category</Option>
                  {realList.map(item => (
                    <Option key={`cate${item.id}`} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
                <Typography style={{ color: 'red' }}>
                  {errors.categoryId}
                </Typography>
              </div>

              {user && user.role === ROLES.ADMIN && (
                <div style={{ marginBottom: 12, marginTop: 16 }}>
                  <Text strong>Teacher</Text>
                  <Select
                    style={{ width: '100%' }}
                    value={values.teacherId}
                    onChange={value => setFieldValue('teacherId', value)}
                  >
                    <Option value={null}>
                      Choose one teacher for this course
                    </Option>
                    {userList.map(item => (
                      <Option key={`teacher${item.id}`} value={item.id}>
                        {item.fullName}
                      </Option>
                    ))}
                  </Select>
                  <Typography style={{ color: 'red' }}>
                    {errors.teacherId}
                  </Typography>
                </div>
              )}

              <Row align="top" justify="space-between" wrap gutter={32}>
                <Col span={6} xs={24} sm={24} lg={12} className="rowCol">
                  <Text strong style={{ marginBottom: 12, marginRight: 8 }}>
                    Price
                  </Text>
                  <CInput
                    className="inputBox"
                    value={values.price}
                    onChange={handleChange('price')}
                    onTouchStart={() => setFieldTouched('price')}
                    onBlur={handleBlur('price')}
                    placeholder="1.99"
                    error={errors.price}
                    type="number"
                  />
                </Col>

                <Col span={6} xs={24} sm={24} lg={12} className="rowCol">
                  <Text strong style={{ marginBottom: 12, marginRight: 8 }}>
                    {`Promotion price (left blank if not provided)`}
                  </Text>
                  <CInput
                    className="inputBox"
                    value={values.promotionPrice}
                    onChange={handleChange('promotionPrice')}
                    onTouchStart={() => setFieldTouched('promotionPrice')}
                    onBlur={handleBlur('promotionPrice')}
                    placeholder="0.99"
                    error={errors.promotionPrice}
                    type="number"
                  />
                </Col>

                <Col span={6} xs={14} sm={12} lg={12} className="rowCol">
                  <Text style={{ marginRight: 16 }} strong>
                    Mark as complete
                  </Text>
                  <Switch
                    defaultChecked={values.completeStatus}
                    onChange={checked =>
                      setFieldValue('completeStatus', checked)
                    }
                  />
                </Col>

                <Col span={6} xs={10} sm={12} lg={12} className="rowCol">
                  <Text style={{ marginRight: 16 }} strong>
                    Public
                  </Text>
                  <Switch
                    defaultChecked={values.publicStatus}
                    onChange={checked => setFieldValue('publicStatus', checked)}
                  />
                </Col>
              </Row>

              <div style={{ marginTop: 48 }}>
                <Title style={{ marginBottom: 16 }} level={5}>
                  Chapters
                </Title>
                <Row
                  align="top"
                  justify="start"
                  wrap
                  gutter={[
                    { xs: 8, sm: 16, md: 24 },
                    { xs: 8, sm: 16, md: 24 }
                  ]}
                >
                  {values.chapters.length > 0 &&
                    values.chapters.map((step, i) => (
                      <Col
                        span={8}
                        key={`step${step.numberId}`}
                        xs={24}
                        md={12}
                        lg={8}
                      >
                        <div className="rowCol" style={{ marginBottom: 8 }}>
                          <Text strong>Chapter {i + 1}</Text>
                          <Button
                            size="middle"
                            style={{ backgroundColor: 'red', color: 'white' }}
                            onClick={() => {
                              let chapters = values.chapters
                              chapters.splice(i, 1)
                              setFieldValue('chapters', chapters)
                            }}
                          >
                            Delete
                          </Button>
                        </div>

                        <CInput
                          className="inputBox"
                          value={step.name}
                          onChange={event => {
                            let chapters = values.chapters
                            chapters[i].name = event.target.value
                            setFieldValue('chapters', chapters)
                          }}
                          onTouchStart={() => setFieldTouched('chapters')}
                          onBlur={handleBlur('chapters')}
                          placeholder="Chapter name"
                          error={
                            errors.chapters &&
                            typeof errors.chapters === 'object' &&
                            errors.chapters[i]?.name &&
                            errors.chapters[i].name
                          }
                        />
                        <CInput
                          className="inputBox"
                          value={step.description}
                          onChange={event => {
                            let chapters = values.chapters
                            chapters[i].description = event.target.value
                            setFieldValue('chapters', chapters)
                          }}
                          onTouchStart={() => setFieldTouched('chapters')}
                          onBlur={handleBlur('chapters')}
                          placeholder="Description"
                          error={
                            errors.chapters &&
                            typeof errors.chapters === 'object' &&
                            errors.chapters[i]?.description &&
                            errors.chapters[i].description
                          }
                        />
                        <CInput
                          className="inputBox"
                          value={step.video}
                          onChange={event => {
                            let chapters = values.chapters
                            chapters[i].video = event.target.value
                            setFieldValue('chapters', chapters)
                          }}
                          onTouchStart={() => setFieldTouched('chapters')}
                          onBlur={handleBlur('chapters')}
                          placeholder="Chapter video link"
                          error={
                            errors.chapters &&
                            typeof errors.chapters === 'object' &&
                            errors.chapters[i]?.video &&
                            errors.chapters[i].video
                          }
                        />
                      </Col>
                    ))}
                </Row>

                {errors.chapters && typeof errors.chapters === 'string' && (
                  <Typography style={{ color: 'red' }}>
                    {errors.chapters}
                  </Typography>
                )}
                <Button
                  size="middle"
                  type="primary"
                  style={{ marginTop: 16 }}
                  onClick={() => {
                    let chapters = values.chapters
                    chapters.push({
                      numberId: values.chapters.length + 1,
                      name: '',
                      description: null,
                      video: null
                    })
                    setFieldValue('chapters', chapters)
                  }}
                >
                  Add chapter
                </Button>
              </div>

              <div style={{ textAlign: 'center', marginTop: 64 }}>
                <Button
                  size="large"
                  style={{
                    marginRight: 24,
                    backgroundColor: 'red',
                    color: 'white'
                  }}
                  onClick={() => history.goBack()}
                >
                  Cancel
                </Button>
                <Button
                  size="large"
                  type="primary"
                  disabled={!isValid}
                  onClick={handleSubmit}
                  loading={isUpdating}
                >
                  Create
                </Button>
              </div>
            </div>
          )
        }}
      </Formik>
      <Footer />
    </>
  )
}
