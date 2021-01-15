import { Badge, Rate, Row } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import '../CourseCard/card.css'

//src, title, teacher, rating, category, price
function CourseCard(props) {
  const history = useHistory()

  const checkDate = formated_Date => {
    var date = new Date()
    date.setDate(date.getDate() - 2)
    const itemDate = new Date(formated_Date)
    if (itemDate > date) {
      return true
    } else {
      return false
    }
  }

  const checkBadge = item => {
    if (item.price === 0 || item.promotionPrice === 0) {
      return 'FREE'
    } else if (item.promotionPrice > 0 && item.promotionPrice < item.price) {
      return `${(
        ((item.price - item.promotionPrice) / item.price) *
        100
      ).toFixed(2)}% OFF`
    } else if (checkDate(item.updatedAt) === true) {
      return 'NEW'
    } else if (item.enrollCount > 5) {
      return 'HOT'
    } else {
      return '$' + item.price
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Badge.Ribbon
        text={checkBadge(props.item)}
        color={
          checkBadge(props.item) === 'HOT' || checkBadge(props.item) === 'NEW'
            ? 'red'
            : checkBadge(props.item).includes('OFF')
            ? '#27AE60'
            : '#FF8A00'
        }
      >
        <div
          onClick={() => history.push(`/course/${props.id}`)}
          className="container"
          style={{
            backgroundImage: `url(${
              props.img ? props.img : 'https://source.unsplash.com/random'
            })`,
            width: 200,
            height: 170
          }}
        >
          <div className="overlay">
            <div className="items"></div>
            <div className="items head">
              <div style={{ width: 130 }}>
                <p id="title">{props.cate?.toUpperCase()}</p>
              </div>
              <Row>
                {props.item.promotionPrice !== null &&
                  props.item.promotionPrice >= 0 &&
                  props.item.promotionPrice < props.price && (
                    <p id="promotion">$ {props.price}</p>
                  )}

                <p id="priceTxt">
                  {props.price === 0 || props.item.promotionPrice === 0
                    ? 'FREE'
                    : props.item.promotionPrice > 0
                    ? '$' + props.item.promotionPrice
                    : '$' + props.price}
                </p>
              </Row>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flex: 0.3,
                  alignItems: 'center'
                }}
              >
                <Rate className="price" disabled defaultValue={props.rating} />
                <p className="price rating">{`(${props.total})`}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="card" style={{ width: 200, height: 80 }}>
          <p id="title">{props.title}</p>
          <p id="teacher" style={{ marginTop: '-2vh' }}>
            {props.teacher}
          </p>
        </div>
      </Badge.Ribbon>
    </div>
  )
}

export default CourseCard
