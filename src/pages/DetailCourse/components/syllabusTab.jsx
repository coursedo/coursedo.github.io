import { Button, Col, Empty, Menu, Row } from 'antd'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { SaveProgress, UpdateCurChapter } from '../redux/actions'
import '../styles.css'

const { SubMenu } = Menu

function SyllabusTab({ chapters, poster }) {
  const dispatch = useDispatch()
  const chapter = useSelector(state => state.DetailCourse.chapter)
  const course = useSelector(state => state.DetailCourse.course)
  const [progress, setProgress] = useState(0)

  const renderChapter = () => {
    return (
      <Menu style={{ width: 256 }} mode="inline">
        {chapters?.length > 0 ? (
          chapters.map(sub => {
            return (
              <Menu.Item
                key={sub.id.toString()}
                onClick={() => {
                  dispatch(UpdateCurChapter.get(sub))
                }}
              >
                Chapter {sub.numberId}: {sub.name}
                <br />
                {sub.description}
              </Menu.Item>
            )
          })
        ) : (
          <div />
        )}
      </Menu>
    )
  }

  return (
    <div style={{ width: '100vw' }}>
      <Row>
        <Col span={6} xs={24} sm={12} md={6}>
          {renderChapter()}
        </Col>
        <Col span={18} xs={24} sm={18}>
          {chapter !== null ? (
            <div>
              <p id="introTxt">
                Chapter {chapter?.numberId}: {chapter?.name}
              </p>
              <p id="desTxt">Description: {chapter?.description}</p>
            </div>
          ) : (
            <div />
          )}
          {chapter?.video !== null ? (
            <div>
              <ReactPlayer
                url={chapter?.video}
                onProgress={({ playedSeconds }) => setProgress(playedSeconds)}
              />
            </div>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Col>
      </Row>
      {chapter !== null && chapter?.video !== null && course?.isEnrolled ? (
        <Row style={{ marginTop: 50 }}>
          <Col span={8} />
          <Col span={8} xs={24} sm={12} md={8}>
            <Button
              style={{
                marginTop: '1vw',
                backgroundColor: '#FFC000',
                color: 'white',
                height: 40,
                width: 200,
                fontSize: 20,
                alignItems: 'center'
              }}
              type="primary"
              onClick={() => {
                const value = {
                  data: {
                    currentChapter: chapter?.numberId,
                    currentVideoTime: progress
                  },
                  courseId: course?.id,
                  enrollmentId: course?.enrollmentId
                }
                dispatch(SaveProgress.get(value))
              }}
            >
              Update progression
            </Button>
          </Col>
          <Col span={8} />
        </Row>
      ) : (
        <div />
      )}
    </div>
  )
}

export default SyllabusTab
