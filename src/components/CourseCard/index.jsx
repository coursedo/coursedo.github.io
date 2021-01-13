import { Badge, Rate } from 'antd'
import '../CourseCard/card.css'
import React from 'react'
import { useHistory } from 'react-router-dom'


//src, title, teacher, rating, category, price
function CourseCard(props) {
  const history = useHistory()
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
        text={props?.price === 0 ? 'Free' : '$' + props?.price || 0}
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
              <p id="title">{props.cate?.toUpperCase()}</p>
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
