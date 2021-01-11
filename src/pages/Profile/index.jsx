import { EyeOutlined, LoadingOutlined } from '@ant-design/icons'
import { Space, Spin, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, ROLES } from 'ultis/functions'
import './profile.css'
import { Tabs } from 'antd'
import ProfileTab from './components/profileTab'
import ChangePassTab from './components/changePassTab'

const { TabPane } = Tabs

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function Profile() {
  const userDetail = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()

  return (
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
  )
}

export default Profile
