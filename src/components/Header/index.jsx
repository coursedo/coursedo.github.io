import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Input, Popover, Menu } from 'antd'
import { Categories } from 'components/Categories'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './header.css'
import { ROLES } from 'ultis/functions'
import { SignOut } from 'pages/SignIn/redux/actions'

const Search = Input.Search
const { SubMenu } = Menu

function Header(props) {
  const user = useSelector(state => state.Auth.user)
  const categoryList = useSelector(state => state.Dashboard.categoryList)
  const history = useHistory()
  const dispatch = useDispatch()

  const studentPopover = (
    <Menu style={{ width: 200 }}>
      <Menu.Item
        key={'profile'}
        onClick={() => {
          history.push(`/profile`)
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key={'course'}
        onClick={() => {
          history.push(`/my-courses`)
        }}
      >
        My courses
      </Menu.Item>
      <Menu.Item
        key={'logout'}
        onClick={() => {
          dispatch(SignOut.get())
        }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  )

  const teacherPopover = (
    <Menu style={{ width: 200 }}>
      <Menu.Item
        key={'profile'}
        onClick={() => {
          history.push(`/profile`)
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key={'logout'}
        onClick={() => {
          dispatch(SignOut.get())
        }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  )

  return (
    <div id="headerView">
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <span
          id="logoText"
          onClick={() =>
            history.push({
              pathname: '/',
              state: { from: `/` }
            })
          }
        >
          coursedo
        </span>
        {user?.role !== 1 ? (
          <Dropdown
            overlay={Categories(categoryList)}
            style={{ marginBottom: 30 }}
          >
            <a id="categoriesTxt" className="ant-dropdown-link" href="#">
              Categories
            </a>
          </Dropdown>
        ) : (
          <div />
        )}
      </div>
      {user?.role !== 1 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 30,
              marginRight: 30
            }}
          >
            <Search
              style={{ width: '30vw' }}
              placeholder="Search for Courses i.e web-development"
              enterButton="Search"
              size="large"
              onSearch={value => props.onSearch(value)}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end',
              marginRight: 60
            }}
          >
            <Button
              shape="round"
              style={{ borderWidth: 0 }}
              id="btnTxt"
              onClick={() =>
                history.push({
                  pathname: '/courses',
                  state: { from: `/` }
                })
              }
            >
              Courses
            </Button>
            <Button
              shape="round"
              style={{ borderWidth: 0 }}
              id="btnTxt"
              onClick={() =>
                history.push({
                  pathname: '/contact',
                  state: { from: `/` }
                })
              }
            >
              Contact Us
            </Button>
          </div>
        </div>
      ) : (
        <div />
      )}
      {!(props?.from === 'addCourse') && user?.role === ROLES.TEACHER && (
        <Button
          type="primary"
          style={{ borderRadius: 50, marginRight: 24 }}
          onClick={() => history.push('/create')}
        >
          Add new course
        </Button>
      )}
      {user ? (
        user?.avatar ? (
          <Popover
            placement="bottomRight"
            content={
              user?.role === ROLES.TEACHER ? teacherPopover : studentPopover
            }
            trigger="click"
          >
            <Avatar size={48} src={user?.avatar} />
          </Popover>
        ) : (
          <Popover
            placement="bottomRight"
            content={
              user?.role === ROLES.TEACHER ? teacherPopover : studentPopover
            }
            trigger="click"
          >
            <Avatar size={48} icon={<UserOutlined />} />
          </Popover>
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
