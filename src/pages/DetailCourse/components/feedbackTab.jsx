import { Button, Col, Input, Rate, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetListFeedback, Rating } from '../redux/actions'
import '../styles.css'

const TextArea = Input.TextArea

function FeedbackTab(props) {
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const val = {
      id: props.id,
      page: 1
    }
    dispatch(GetListFeedback.get(val))
    return () => {}
  }, [dispatch])

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
              {props.rating}
            </p>
            <p id="introTxt">
              {props.ratingCount}{' '}
              {props.ratingCount === 1 ? 'rating' : 'ratings'}
            </p>
          </div>

          <Rate
            disabled
            defaultValue={props.rating}
            style={{
              fontSize: 50,
              marginLeft: 20,
              alignSelf: 'center'
            }}
          />
        </Row>
        {props.allows ? (
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
                  onClick={() => {
                    const value = {
                      data: {
                        rating: rating,
                        feedback: feedback
                      },
                      id: props.id
                    }
                    dispatch(Rating.get(value))
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

  return (
    <div>
      <p id="introHeader" style={{ color: '#FF8A00' }}>
        Ratings & Reviews
      </p>
      {renderTopRating()}
      <Row>
        
      </Row>
    </div>
  )
}

export default FeedbackTab
