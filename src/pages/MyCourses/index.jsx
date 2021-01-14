import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import Footer from 'components/Footer'
import Header from 'components/Header'
import CoursesTab from 'pages/Dashboard/component/coursesTab'
import 'pages/Profile/profile.css'
import { GetProfile } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, ROLES } from 'ultis/functions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function MyCourses() {
  const userDetail = useSelector(state => state.Auth.user)
  const isLoadingProfile = useSelector(state => state.Auth.isLoadingProfile)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userDetail || userDetail.role === ROLES.ADMIN) {
      history.replace('/')
    } else {
      dispatch(GetProfile.get(userDetail.id))
    }
  }, [])

  useEffect(() => {
    if (!userDetail || userDetail.role === ROLES.ADMIN) {
      history.replace('/')
    }
  }, [userDetail])

  if (isLoadingProfile || !userDetail) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="chooseContainer" style={{ minWidth: 500 }}>
        <span className="titleTopic" style={{ alignSelf: 'center' }}>
          My courses
        </span>
        <div style={{ minHeight: '40vh' }}>
          <CoursesTab
            role={userDetail.role}
            courseList={
              userDetail.role === ROLES.TEACHER
                ? userDetail.courses
                : userDetail.role === ROLES.STUDENT
                ? userDetail.enrollment
                : []
            }
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyCourses
