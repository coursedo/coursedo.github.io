import '../CourseCard/card.css'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UpdateCurCate } from 'pages/Courses/redux/actions'

//img, title
function CateCard(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={() => {
        dispatch(UpdateCurCate.get(props.title))
        history.push(`/categories/${props.id}`)
      }}
    >
      <div
        className="container blur"
        style={{
          backgroundImage: `url(${
            props.img ? props.img : 'https://source.unsplash.com/random'
          })`,
          width: 200,
          height: 130
        }}
      ></div>
      <div id="card" style={{ width: 200, height: 70 }}>
        <p id="title">{props.title}</p>
      </div>
    </div>
  )
}

export default CateCard
