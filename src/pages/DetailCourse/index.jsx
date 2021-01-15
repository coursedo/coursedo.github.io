import { LoadingOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Rate, Row, Spin, Tabs } from 'antd'
import Footer from 'components/Footer'
import Header from 'components/Header'
import 'components/Header/header.css'
import moment from 'moment'
import { UpdateCurCate } from 'pages/Courses/redux/actions'
import SwipeList from 'pages/Home/components/swipeComponent'
import 'pages/Home/home.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import { COLOR, ROLES } from 'ultis/functions'
import FeedbackTab from './components/feedbackTab'
import IntroduceTab from './components/introduceTab'
import SyllabusTab from './components/syllabusTab'
import {
  AddToWatchList,
  CleanCourse,
  EnrollCourse,
  GetCourseDetail
} from './redux/actions'
import './styles.css'

const { TabPane } = Tabs

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function DetailCourse(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const user = useSelector(state => state.Auth.user)
  const watchlist = useSelector(state => state.Auth.watchlist)
  const id = props.match.params.id
  const course = useSelector(state => state.DetailCourse.course)
  const isLoading = useSelector(state => state.DetailCourse.isLoading)

  useEffect(() => {
    dispatch(GetCourseDetail.get(id))
    return () => {
      dispatch(CleanCourse.get())
    }
  }, [dispatch, id, watchlist])

  if (!course) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    )
  }

  const background = () => {
    return (
      <div
        style={{
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
      >
        {isDesktopOrLaptop ? (
          <div
            className="courseBg"
            style={{
              backgroundImage: `url(${
                course?.thumbnail
                  ? course?.thumbnail
                  : 'https://source.unsplash.com/random'
              })`,
              width: '100vw',
              height: 'auto'
            }}
          >
            <div className="overBg">{renderHeaderContent()}</div>
          </div>
        ) : (
          <div
            className="courseBgPhone"
            style={{
              backgroundImage: `url(${
                course?.thumbnail
                  ? course?.thumbnail
                  : 'https://source.unsplash.com/random'
              })`,
              width: '100vw',
              height: 'auto'
            }}
          >
            <div className="overBg">{renderHeaderContent()}</div>
          </div>
        )}
      </div>
    )
  }

  const renderHeaderContent = () => {
    return (
      <div className="main">
        <div className="container-fluid">
          <Row>
            <Col span={12}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a
                    id="courseTeacher"
                    onClick={() => {
                      dispatch(UpdateCurCate.get(course?.category))
                      history.push(`/categories/${course?.categoryId}`)
                    }}
                  >
                    {course?.category}
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a id="courseTeacher">{course?.name}</a>
                </Breadcrumb.Item>
              </Breadcrumb>
              <p id="courseHeader">{course?.name}</p>
              <p id="courseTeacher">{course?.teacherName}</p>
              <Row>
                <Rate
                  className="courseTeacher"
                  disabled
                  defaultValue={course?.rating}
                />
                <p id="courseTeacher">({course?.ratingCount})</p>
              </Row>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                {course?.promotionPrice !== null &&
                  course?.promotionPrice >= 0 &&
                  course?.promotionPrice < course?.price && (
                    <p id="promotionPrice">$ {course?.price}</p>
                  )}

                <p
                  id="courseTeacher"
                  style={{ fontSize: 24, fontWeight: 'bold' }}
                >
                  {course?.price === 0 || course?.promotionPrice === 0
                    ? 'FREE'
                    : course?.promotionPrice > 0
                    ? '$' + course?.promotionPrice
                    : '$' + course?.price}
                </p>
              </Row>
              <Row>
                <p id="courseTeacher">{course?.enrollCount} already enrolled</p>
              </Row>
              {user ? (
                user?.role === ROLES.STUDENT ? (
                  course?.isEnrolled === false ? (
                    <Row>
                      <Button
                        style={{
                          backgroundColor: '#FFC000',
                          color: 'white',
                          height: 60,
                          width: 200,
                          fontSize: 20,
                          marginRight: 16
                        }}
                        type="primary"
                        onClick={() => {
                          const value = {
                            id: course?.id,
                            data: {
                              paidStatus: true,
                              total:
                                course?.promotionPrice &&
                                course?.promotionPrice > 0
                                  ? course?.promotionPrice
                                  : course?.price
                            }
                          }
                          dispatch(EnrollCourse.get(value))
                        }}
                      >
                        Buy now
                      </Button>
                      <Button
                        style={{
                          backgroundColor: 'white',
                          color: '#FFC000',
                          height: 60,
                          width: 200,
                          fontSize: 16
                        }}
                        type="primary"
                        onClick={() => {
                          const value = {
                            id: user.id,
                            courseId: course.id
                          }
                          dispatch(AddToWatchList.get(value))
                        }}
                      >
                        {watchlist?.length > 0 &&
                        watchlist.filter(item => item.id === course?.id)
                          .length > 0
                          ? 'Add to watchlist'
                          : 'Remove from watchlist'}
                      </Button>
                    </Row>
                  ) : (
                    <Button
                      style={{
                        backgroundColor: 'white',
                        color: '#FFC000',
                        height: 60,
                        width: 200,
                        fontSize: 16
                      }}
                      type="primary"
                      onClick={() => {
                        const value = {
                          id: user.id,
                          courseId: course?.id
                        }
                        dispatch(AddToWatchList.get(value))
                      }}
                    >
                      {watchlist?.length > 0 &&
                      watchlist.filter(item => item.id === course?.id).length >
                        0
                        ? 'Add to watchlist'
                        : 'Remove from watchlist'}
                    </Button>
                  )
                ) : (
                  <div />
                )
              ) : (
                <Button
                  style={{
                    marginTop: '1vw',
                    backgroundColor: '#FFC000',
                    color: 'white',
                    height: 60,
                    width: 200,
                    fontSize: 16
                  }}
                  type="primary"
                  onClick={() => history.push('/signup')}
                >
                  Buy now
                </Button>
              )}
              <p id="courseTeacher">
                Last update: {moment(course?.updatedAt).format('llll')}
              </p>
            </Col>
            <Col
              span={12}
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <p id="courseTeacher">{course?.shortDescription}</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  if (isLoading || !course) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    )
  }

  return (
    <div className="main">
      <Header />
      {background()}
      <div className="container-fluid">
        <Tabs size="large" defaultActiveKey="1" centered>
          <TabPane tab="Information" key="1">
            <IntroduceTab
              description={course?.description}
              teacherName={course?.teacherName}
              teacherEmail={course?.teacherEmail}
              teacherAvatar={course?.teacherAvatar}
            />
          </TabPane>
          <TabPane tab="Syllabus" key="2">
            <SyllabusTab
              chapters={course?.chapters}
              poster={course?.thumbnail}
            />
          </TabPane>
          <TabPane tab="Ratings & Reviews" key="3">
            <FeedbackTab />
          </TabPane>
        </Tabs>
        <div id="swipe" style={{ paddingBottom: 50 }}>
          <p id="introHeader" style={{ color: '#FF8A00' }}>
            Similar courses
          </p>
          <SwipeList list={course?.relatedCourses} type={'courses'} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DetailCourse
