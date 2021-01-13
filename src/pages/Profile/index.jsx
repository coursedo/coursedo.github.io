import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Tabs } from 'antd'
import Footer from 'components/Footer'
import Header from 'components/Header'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR } from 'ultis/functions'
import ChangePassTab from './components/changePassTab'
import ProfileTab from './components/profileTab'
import './profile.css'

const { TabPane } = Tabs

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function Profile() {
  const userDetail = useSelector(state => state.Auth.user)
  const isLoadingProfile = useSelector(state => state.Auth.isLoadingProfile)
  const history = useHistory()

  useEffect(() => {
    if (!userDetail) {
      history.replace('/')
    }
  }, [])

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
      <div className="chooseContainer">
        <span className="titleTopic" style={{ alignSelf: 'center' }}>
          Profile
        </span>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Information" key="1">
            <ProfileTab user={userDetail} />
          </TabPane>
          <TabPane tab="Change Password" key="2">
            <ChangePassTab user={userDetail} />
          </TabPane>
        </Tabs>
      </div>
      <Footer />
    </>
  )
}

export default Profile
