import { Button } from 'antd'
import bgPic from 'assets/images/bg.png'
import Footer from 'components/Footer'
import Header from 'components/Header'
import { GetAllCategories } from 'pages/Dashboard/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { history } from 'ultis/functions'
import DiscoBtn from './components/discoverBtn'
import SwipeList from './components/swipeComponent'
import { courses } from './constant'
import './home.css'

function Home() {
  const dispatch = useDispatch()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const user = useSelector(state => state.Auth.user)

  useEffect(() => {
    dispatch(GetAllCategories.get())
    return () => {}
  }, [])

  return (
    <>
      <Header />
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
      <div id="swipe">
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
      </div>
      <Footer />
    </>
  )
}

export default Home
