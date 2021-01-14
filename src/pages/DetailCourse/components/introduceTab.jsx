import { UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Row } from 'antd'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useDispatch } from 'react-redux'
import '../styles.css'

function IntroduceTab({
  teacherAvatar,
  teacherName,
  teacherEmail,
  description
}) {
  const dispatch = useDispatch()

  return (
    <div>
      <p id="introHeader" style={{ color: '#FF8A00' }}>
        Instructor
      </p>
      <div>
        <Row>
          {teacherAvatar !== null ? (
            <Avatar size={68} src={teacherAvatar} />
          ) : (
            <Avatar size={68} icon={<UserOutlined />} />
          )}
          <Col style={{ marginLeft: 20 }}>
            <p id="introTxt">{teacherName}</p>
            <a href={'mailto:' + teacherEmail} id="desTxt">
              {teacherEmail}
            </a>
          </Col>
        </Row>
      </div>
      <p id="introHeader" style={{ color: '#FF8A00' }}>
        Description
      </p>
      <div>{ReactHtmlParser(description)}</div>
    </div>
  )
}

export default IntroduceTab
