import { Button } from 'antd'
import bgPic from 'assets/images/bg.png'
import Footer from 'components/Footer'
import Header from 'components/Header'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { history } from 'ultis/functions'
import 'pages/Home/home.css'
import { Card, Col, Row } from 'antd'
import { courses } from 'pages/Home/constant'
import CourseCard from 'components/CourseCard'

function Courses() {
  const dispatch = useDispatch()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

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

  return (
    <>
      <Header />
      {background()}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'white'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 0.7,
            paddingBlock: '5vh',
            paddingLeft: '5vw',
            paddingRight: '5vw'
          }}
        >
          {renderCourses()}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 0.3,
            backgroundColor: 'blue'
          }}
        >
          <Col span={8} xs={20} sm={16} md={12} lg={8} xl={4}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </div>
      </div>

      {/* <div id="swipe">
        <p id="type">Trending Courses</p>
        <SwipeList list={courses} type={'courses'} />
        <DiscoBtn onClick={() => history.push('/courses')} />
      </div>
      <div id="swipe">
        <p id="type">Most Popular Courses</p>
        <SwipeList list={courses} type={'courses'} />
        <DiscoBtn onClick={() => history.push('/courses')} />
      </div>
      <div id="swipe">
        <p id="type">Newest Courses</p>
        <SwipeList list={courses} type={'courses'} />
        <DiscoBtn onClick={() => history.push('/courses')} />
      </div>
      <div id="swipe">
        <p id="type">Top categories</p>
        <SwipeList list={courses} type={'category'} />
        <DiscoBtn onClick={() => history.push('/categories')} />
      </div> */}

      <Footer />
    </>
  )
}

export default Courses
