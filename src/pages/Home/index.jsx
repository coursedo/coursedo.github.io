import { Button } from 'antd'
import bgPic from 'assets/images/bg.png'
import Footer from 'components/Footer'
import Header from 'components/Header'
import { GetAllCategories } from 'pages/Dashboard/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { history } from 'ultis/functions'
import '../../components/Header/header.css'
import DiscoBtn from './components/discoverBtn'
import SwipeList from './components/swipeComponent'
import { courses } from './constant'
import './home.css'
import { GetHomeCourse } from './redux/actions'

function Home() {
  const dispatch = useDispatch()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const user = useSelector(state => state.Auth.user)
  const {trending, mostBuy, newest} = useSelector(state => state.Home)

  useEffect(() => {
    dispatch(GetAllCategories.get())
    dispatch(GetHomeCourse.get())
    return () => {}
  }, [])

  return (
    <div className="main">
      <Header onSearch={val => console.info('keyword', val)} />
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
              Get Access to Unlimited Educational Resources. Everywhere,
              Everytime!
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

      <div className="container-fluid">
        <div id="swipe">
          <p id="type">Trending Courses</p>
          <SwipeList list={trending} type={'courses'} />
          <DiscoBtn onClick={() => history.push('/courses')} />
        </div>

        <div id="swipe">
          <p id="type">Most Popular Courses</p>
          <SwipeList list={mostBuy} type={'courses'} />
          <DiscoBtn onClick={() => history.push('/courses')} />
        </div>
        <div id="swipe">
          <p id="type">Newest Courses</p>
          <SwipeList list={newest} type={'courses'} />
          <DiscoBtn onClick={() => history.push('/courses')} />
        </div>
        <div id="swipe">
          <p id="type">Top categories</p>
          <SwipeList list={courses} type={'category'} />
          <DiscoBtn onClick={() => history.push('/categories')} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
