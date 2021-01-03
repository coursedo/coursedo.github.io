import { Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import './header.css'
import { useHistory } from 'react-router-dom'

function Header(props) {
  const user = useSelector(state => state.Auth.user)
  const history = useHistory()
  return (
    <div id="headerView">
      <span id="logoText">coursedo</span>
      {user ? (
        user?.avatar ? (
          <Avatar size={48} src={user?.avatar} />
        ) : (
          <Avatar size={48} icon={<UserOutlined />} />
        )
      ) : (
        <Button
          type="primary"
          style={{ borderRadius: 50 }}
          onClick={() =>
            history.push({
              pathname: '/signin',
              state: { from: `/` }
            })
          }
        >
          Sign in
        </Button>
      )}
    </div>
  )
}

export default Header
