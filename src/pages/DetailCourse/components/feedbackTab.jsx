import {
  Avatar,
  Button,
  Col,
  Divider,
  Input,
  List,
  Pagination,
  Rate,
  Row
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetListFeedback, Rating } from '../redux/actions'
import '../styles.css'

const TextArea = Input.TextArea

function FeedbackTab() {
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const course = useSelector(state => state.DetailCourse.course)
  const { page, feedbacks, total } = useSelector(state => state.DetailCourse)

  useEffect(() => {
    if (course !== null && course?.id !== null) {
      const val = {
        id: course.id,
        page: 1
      }
      dispatch(GetListFeedback.get(val))
    }

    return () => {}
  }, [dispatch, course])

  const renderTopRating = () => {
    return (
      <Row
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Row
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <p className="rateTxt" style={{ marginBlock: '0em' }}>
              {course?.rating}
            </p>
            <p id="introTxt">
              {course?.ratingCount}{' '}
              {course?.ratingCount === 1 ? 'rating' : 'ratings'}
            </p>
          </div>

          <Rate
            disabled
            defaultValue={course?.rating}
            style={{
              fontSize: 50,
              marginLeft: 20,
              alignSelf: 'center'
            }}
          />
        </Row>
        {course?.isEnrolled ? (
          <Col>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Rate
                defaultValue={rating}
                style={{
                  fontSize: 30,
                  marginBottom: 20,
                  marginRight: 20,
                  alignSelf: 'center'
                }}
                onChange={setRating}
              />
              <p id="introTxt">{rating}/5</p>
            </Row>
            <TextArea
              showCount
              rows={4}
              style={{ width: '40vw' }}
              value={feedback || ''}
              onChange={e => setFeedback(e.target.value)}
            />
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
                  disabled={rating === 0}
                  onClick={() => {
                    if (rating > 0 || (rating > 0 && /\S+/.test(feedback))) {
                      const value = {
                        data: {
                          rating: rating,
                          feedback: feedback
                        },
                        id: course?.id
                      }
                      dispatch(Rating.get(value))
                      setRating(0)
                      setFeedback('')
                    }
                  }}
                >
                  Send
                </Button>
              </Col>
              <Col span={8} />
            </Row>
          </Col>
        ) : (
          <div />
        )}
      </Row>
    )
  }

  const updatePage = num => {
    const val = {
      id: course.id,
      page: num
    }
    dispatch(GetListFeedback.get(val))
  }

  const renderFeedback = () => {
    return (
      <Col span={24}>
        <Divider orientation="left">
          <p id="introTxt">Reviews</p>
        </Divider>
        <List
          style={{ marginTop: 50 }}
          itemLayout="horizontal"
          dataSource={feedbacks}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <Row
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <p id="introTxt">{item.fullName}</p>
                    <Rate
                      disabled
                      defaultValue={item.rating}
                      style={{
                        fontSize: 20,
                        marginLeft: 20,
                        marginTop: -20,
                        alignSelf: 'center'
                      }}
                    />
                  </Row>
                }
                description={<p id="desTxt">{item.feedback}</p>}
              />
            </List.Item>
          )}
        />
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Divider></Divider>
          <Pagination
            current={page}
            onChange={num => updatePage(num)}
            total={total}
            pageSize={6}
          />
        </Row>
      </Col>
    )
  }

  return (
    <div>
      <p id="introHeader" style={{ color: '#FF8A00' }}>
        Ratings & Reviews
      </p>
      {renderTopRating()}
      {renderFeedback()}
      <Row></Row>
    </div>
  )
}

export default FeedbackTab
