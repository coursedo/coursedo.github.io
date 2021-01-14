import { Button } from 'antd'
import bgPic from 'assets/images/bg.png'
import Footer from 'components/Footer'
import Header from 'components/Header'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { history } from 'ultis/functions'
import '../../components/Header/header.css'
import './about.css'

function About() {
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

    return (
        <div className="main">
            <Header onSearch={val => console.info('keyword', val)} />
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">About COURSEDO</h3>
                </div>
                <div className="panel-body">
                    <p><span>+84 938394171 </span>
                        <span>coursedo.com@gmail.com</span>
                        <span>227 Nguyen Van Cu street, Ward 4, District 5, HCMC city</span>
                    </p>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default About
