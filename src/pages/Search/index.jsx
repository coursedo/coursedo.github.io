import { Button, Pagination, Menu, Col, Row, Select } from 'antd'
import bgPic from 'assets/images/bg.png'
import Footer from 'components/Footer'
import Header from 'components/Header'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { history } from 'ultis/functions'
import 'pages/Home/home.css'
import { courses } from 'pages/Home/constant'
import CourseCard from 'components/CourseCard'
import { useSelector } from 'react-redux'
const { Option } = Select
const { SubMenu } = Menu

function Search() {
  const dispatch = useDispatch()
  const keyword = 'Keyword'
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const [current, setCurrentPage] = useState(0)
  const categoryList = useSelector(state => state.Dashboard.categoryList)
  const user = useSelector(state => state.Auth.user)

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
                onClick={() => history.push('/forgot')}
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
        {courses.length > 0 ? (
          courses.map(item => {
            return (
              <Col
                span={8}
                xs={24}
                sm={12}
                md={8}
                style={{ marginBlock: '3vh' }}
              >
                <CourseCard
                  img={item.img}
                  title={item.title}
                  teacher={item.teacher}
                  cate={item.category}
                  price={item.price}
                  rating={item.rating}
                  total={item.total}
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
    console.log(`selected ${value}`)
  }

  const renderHeader = () => {
    return (
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          marginTop: '5vh'
        }}
      >
        <Col>
          <h3 id="catTitle">{keyword}</h3>
        </Col>

        <Col>
          <Select
            defaultValue="Sort By"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="default">Sort</Option>
            <Option value="ratingDesc">Rating</Option>
            <Option value="priceInc">Price Increase</Option>
            <Option value="priceDecs">Price Decrease</Option>
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
              <SubMenu key={'sub' + index.toString()} title={item.name}>
                {item.subCategory?.length > 0 ? (
                  item.subCategory.map(sub => {
                    return (
                      <Menu.Item key={sub.id.toString()}>{sub.name}</Menu.Item>
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
    <>
      <Header />
      {background()}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flex: 1,
          backgroundColor: 'white'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1
          }}
        >
          {renderHeader()}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.7,
              paddingBlock: '3vh',
              paddingLeft: '5vw',
              paddingRight: '5vw'
            }}
          >
            {renderCourses()}
          </div>
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flex: 1,
              marginBottom: '2vh'
            }}
          >
            <Pagination
              current={current}
              onChange={setCurrentPage}
              total={50}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flex: 0.3,
            backgroundColor: 'white',
            paddingBlock: '3vh'
          }}
        >
          {renderListCat()}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Search
