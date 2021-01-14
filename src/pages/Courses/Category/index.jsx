import { Button, Col, Menu, Pagination, Row, Select } from 'antd'
import bgPic from 'assets/images/bg.png'
import CourseCard from 'components/CourseCard'
import Footer from 'components/Footer'
import Header from 'components/Header'
import 'components/Header/header.css'
import 'pages/Home/home.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { checkBadge, history } from 'ultis/functions'
import { GetCoursesCate, UpdateCurCate } from '../redux/actions'
import queryString from 'query-string'
const { Option } = Select
const { SubMenu } = Menu

function CateCourses(props) {
  const dispatch = useDispatch()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const { courseList, page, sort, sortOrder, total, curCate } = useSelector(
    state => state.CourseList
  )
  const { categoryList } = useSelector(state => state.Dashboard)
  const user = useSelector(state => state.Auth.user)
  const value = queryString.parse(props.location.search)
  const id = props.match.params.id

  useEffect(() => {
    const val = {
      category: id,
      page: page,
      limit: 6,
      sort: sort,
      sortOrder: sortOrder
    }
    dispatch(GetCoursesCate.get(val))
    return () => {}
  }, [id, page])

  const background = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'white'
        }}
      >
        {isDesktopOrLaptop && (
          <div id="landing" style={{ backgroundImage: `url(${bgPic})` }}>
            <span id="welcomeTxt">
              Browse Thousands of Our Video Tutorials Curated Only for you.
            </span>
            {user ? (
              <div />
            ) : (
              <Button
                style={{
                  marginTop: '1vw',
                  backgroundColor: 'white',
                  color: '#FFC000'
                }}
                type="primary"
                onClick={() => history.push('/signup')}
              >
                Join for Free
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderCourses = () => {
    return (
      <Row gutter={16}>
        {courseList.length > 0 ? (
          courseList.map(item => {
            return (
              <Col span={8} xs={24} sm={12} md={8} style={{ marginBlock: 30 }}>
                <CourseCard
                  id={item.id}
                  img={item.thumbnail}
                  title={item.name}
                  teacher={item.teacherName}
                  cate={item.category}
                  price={item.price}
                  rating={item.rating}
                  total={item.ratingCount}
                  item={item}
                />
              </Col>
            )
          })
        ) : (
          <div />
        )}
      </Row>
    )
  }

  const handleChange = value => {
    let val = null
    if (value === '1') {
      val = {
        category: id,
        page: 1,
        limit: 6
      }
    } else if (value === '2') {
      val = {
        category: id,
        page: 1,
        limit: 6,
        sort: 'rating'
      }
    } else if (value === '3') {
      val = {
        category: id,
        page: 1,
        limit: 6,
        sort: 'price',
        sortOrder: 'asc'
      }
    } else if (value === '4') {
      val = {
        category: id,
        page: 1,
        limit: 6,
        sort: 'price',
        sortOrder: 'desc'
      }
    }
    dispatch(GetCoursesCate.get(val))
  }

  const updatePage = num => {
    const val = {
      category: id,
      page: num,
      limit: 6,
      sort: sort,
      sortOrder: sortOrder
    }
    dispatch(GetCoursesCate.get(val))
  }

  const renderHeader = () => {
    return (
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          marginTop: 50
        }}
      >
        <Col>
          <p id="catTitle">{curCate}</p>
        </Col>

        <Col>
          <Select
            defaultValue="Sort By"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="1">Sort</Option>
            <Option value="2">Rating</Option>
            <Option value="3">Price Increase</Option>
            <Option value="4">Price Decrease</Option>
          </Select>
        </Col>
      </Row>
    )
  }

  const renderListCat = () => {
    return (
      <Menu style={{ width: 256 }} mode="inline">
        {categoryList?.length > 0 ? (
          categoryList.map((item, index) => {
            return (
              <SubMenu
                key={'sub' + index.toString()}
                title={item.name}
                onTitleClick={() => {
                  dispatch(UpdateCurCate.get(item?.name))
                  history.push(`/categories/${item.id}`)
                }}
              >
                {item.subCategory?.length > 0 ? (
                  item.subCategory.map(sub => {
                    return (
                      <Menu.Item
                        key={sub.id.toString()}
                        onClick={() => {
                          dispatch(UpdateCurCate.get(sub?.name))
                          history.push(`/categories/${sub.id}`)
                        }}
                      >
                        {sub.name}
                      </Menu.Item>
                    )
                  })
                ) : (
                  <div />
                )}
              </SubMenu>
            )
          })
        ) : (
          <div />
        )}
      </Menu>
    )
  }

  return (
    <div className="main">
      <Header />
      {background()}
      <div className="container-fluid">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column'
            }}
          >
            {renderHeader()}
            {renderCourses()}
            <div
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flex: 1,
                marginBlock: 60
              }}
            >
              <Pagination
                current={page}
                onChange={num => updatePage(num)}
                total={total}
                pageSize={6}
              />
            </div>
          </div>
          {isDesktopOrLaptop && (
            <div style={{ marginTop: 50 }}>{renderListCat()}</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CateCourses
