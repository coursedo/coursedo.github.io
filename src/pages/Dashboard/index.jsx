import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Menu, Spin } from 'antd'
import { SignOut } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FiBookOpen, FiGrid, FiUsers } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, ROLES } from 'ultis/functions'
import CategoryList from './component/categoryList'
import CoursesList from './component/coursesList'
import StudentList from './component/studentList'
import TeacherList from './component/teacherList'
import { PAGE } from './constant'
import './dashboard.css'
import { SetCurrentPage } from './redux/actions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function Dashboard() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const isLoadingDashboard = useSelector(
    state => state.Dashboard.isLoadingDashboard
  )

  useEffect(() => {
    if (!user || user?.role !== ROLES.ADMIN) {
      history.replace('/')
    }
  }, [user])

  const currentPage = useSelector(state => state.Dashboard.currentPage)

  const onMenuSelect = e => {
    dispatch(SetCurrentPage.get({ currentPage: e.key }))
  }

  const handleSignOut = () => {
    dispatch(SignOut.get())
    history.replace('/')
  }

  const renderRightDashboard = () => {
    switch (currentPage) {
      case PAGE.CATEGORY:
        return <CategoryList />
      case PAGE.COURSE:
        return <CoursesList />
      case PAGE.TEACHER:
        return <TeacherList />
      case PAGE.STUDENT:
        return <StudentList />
      default:
        return <CategoryList />
    }
  }

  if (isLoadingDashboard || !user || user.role !== ROLES.ADMIN) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    )
  }

  return (
    <div id="dashboardBg">
      <div id="menuContainer">
        {user?.avatar ? (
          <Avatar size={100} src={user?.avatar} />
        ) : (
          <Avatar size={100} icon={<UserOutlined />} />
        )}
        <span id="adminName">{user.fullName ? user.fullName : 'Admin'}</span>
        <Menu
          defaultSelectedKeys={[PAGE.CATEGORY]}
          selectedKeys={[currentPage]}
          mode="inline"
          onClick={onMenuSelect}
          style={{ backgroundColor: COLOR.primary1 }}
        >
          <Menu.Item
            style={{ color: 'white' }}
            className="customItem"
            key={PAGE.CATEGORY}
            icon={<FiGrid size={16} style={{ marginRight: 8 }} />}
          >
            Categories
          </Menu.Item>
          <Menu.Item
            style={{ color: 'white' }}
            className="customItem"
            key={PAGE.COURSE}
            icon={<FiBookOpen size={16} style={{ marginRight: 8 }} />}
          >
            Courses
          </Menu.Item>
          <Menu.Item
            style={{ color: 'white' }}
            className="customItem"
            key={PAGE.TEACHER}
            icon={<FaChalkboardTeacher size={14} style={{ marginRight: 8 }} />}
          >
            Teachers
          </Menu.Item>
          <Menu.Item
            style={{ color: 'white' }}
            className="customItem"
            key={PAGE.STUDENT}
            icon={<FiUsers size={16} style={{ marginRight: 8 }} />}
          >
            Students
          </Menu.Item>
        </Menu>
        <Button
          type="ghost"
          style={{
            width: '80%',
            marginTop: 64,
            borderColor: 'white',
            borderRadius: 8,
            color: 'white'
          }}
          onClick={() => handleSignOut()}
        >
          Log out
        </Button>
      </div>
      {renderRightDashboard()}
    </div>
  )
}

export default Dashboard
