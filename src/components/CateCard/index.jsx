import '../CourseCard/card.css'
import React from 'react'

//img, title
function CateCard(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
