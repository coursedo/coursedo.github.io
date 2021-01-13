import CateCard from 'components/CateCard'
import CourseCard from 'components/CourseCard'
import 'pages/Home/home.css'
import React from 'react'
import Slider from 'react-slick'

//src, title, teacher, rating, category, price
function SwipeList(props) {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    centerMode: true,
    centerPadding: 10,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div>
      {props.type === 'courses' ? (
        <Slider {...settings}>
          {props.list?.length > 0 ? (
            props.list.map(item => {
              return (
                  <CourseCard
                  id={item.id}
                  img={item.thumbnail}
                  title={item.name}
                  teacher={item.teacherName}
                  cate={item.category}
                  price={item.price}
                  rating={item.rating}
                  total={item.ratingCount}
                />

              )
            })
          ) : (
            <div />
          )}
        </Slider>
      ) : (
        <Slider {...settings}>
          {props.list?.length > 0 ? (
            props.list.map(item => {
              return <CateCard img={item.img} title={item.title} />
            })
          ) : (
            <div />
          )}
        </Slider>
      )}
    </div>
  )
}

export default SwipeList
