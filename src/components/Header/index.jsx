import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Input } from 'antd'
import { Categories } from 'components/Categories'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './header.css'

const Search = Input.Search

const cat = [
  {
    cate: 'Python',
    subCat: [
      {
        name: 'Python',
        link: '/#'
      },
      {
        name: 'Python',
        link: '/#'
      },
      {
        name: 'Python',
        link: '/#'
      }
    ]
  }
]

function Header(props) {
  const user = useSelector(state => state.Auth.user)
  const history = useHistory()
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
        <span id="logoText">coursedo</span>
        <Dropdown overlay={Categories(cat)} style={{ marginBottom: 30 }}>
          <a id="categoriesTxt" className="ant-dropdown-link" href="#">
            Categories
          </a>
        </Dropdown>
      </div>
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 30,
          marginRight: 30
        }}
      >
        <Search
          id="search"
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
