import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Tabs } from 'antd'
import Footer from 'components/Footer'
import Header from 'components/Header'
import CoursesTab from 'pages/Dashboard/component/coursesTab'
import 'pages/Profile/profile.css'
import { GetProfile, GetWatchlist } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, ROLES } from 'ultis/functions'
import WatchlistTab from './components/watchlistTab'

const { TabPane } = Tabs

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function MyCourses() {
  const userDetail = useSelector(state => state.Auth.user)
  const isLoadingProfile = useSelector(state => state.Auth.isLoadingProfile)
  const watchlist = useSelector(state => state.Auth.watchlist)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userDetail || userDetail.role === ROLES.ADMIN) {
      history.replace('/')
    } else {
      dispatch(GetProfile.get(userDetail.id))
      if (userDetail.role === ROLES.STUDENT) {
        dispatch(GetWatchlist.get(userDetail.id))
      }
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
          {userDetail.role === ROLES.TEACHER ? (
            <CoursesTab
              role={userDetail.role}
              courseList={userDetail.courses}
            />
          ) : (
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="My enrollment" key="1">
                <CoursesTab
                  role={userDetail.role}
                  courseList={userDetail.enrollment}
                />
              </TabPane>
              <TabPane tab="My watchlist" key="2">
                <WatchlistTab courseList={watchlist} />
              </TabPane>
            </Tabs>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyCourses
