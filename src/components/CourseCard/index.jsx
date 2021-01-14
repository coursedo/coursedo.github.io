import { Badge, Rate } from 'antd'
import '../CourseCard/card.css'
import React from 'react'
import { useHistory } from 'react-router-dom'

//src, title, teacher, rating, category, price
function CourseCard(props) {
  const history = useHistory()

  const checkDate = formated_Date => {
    var date = new Date()
    date.setDate(date.getDate() - 7)
    const itemDate = new Date(formated_Date)
    if (itemDate > date) {
      return true
    } else {
      return false
    }
  }

  const checkBadge = item => {
    if (item.price === 0) {
      return 'FREE'
    } else if (item.enrollCount > 100) {
      return 'HOT'
    } else if (checkDate(item.updatedAt) === true) {
      return 'NEW'
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flex: 1,
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
