import React, { useState } from 'react'
import { slideone, slidetwo, slidethree } from '../../../assets/slider/index.js'
import Slider from 'react-slick'

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    speed: 1000,
    beforeChange: (_prev, next) => {
      setDotActive(next)
    },
    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          top: "720px",
          left: "49.7vw",
          transform: "translate(-50%, 0)",
          zIndex: 200,
          textAlign: "center",
        }}
      >
        <ul
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            listStyleType: "none",
            gap: 10,
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={
          i === dotActive
            ? {
              width: "50px",
              height: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              background: "#6b8b55",
              cursor: "pointer"
            }
            : {
              width: "50px",
              height: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              background: "#f2ecd4",
              cursor: "pointer",
            }
        }
      ></div>
    ),
  };

  return (
    <div className='width'>
      <div className="slogan-content">
        <img
          src="../../../logo/Logo ROASTAR-beige.PNG"
          width={400}
          className='banner-logo'
        />
        <p>Vietnamese style café, brought to you!</p>
      </div>
          
      <div className="banner">
        <Slider {...settings}>
          <div className="slidertwo">
            <img 
              src={slidetwo}
              alt="slidetwo"
              height={720}
              width={1440}
              className="slides"
            />
          </div>
          <div className="sliderone">
            <img 
              src={slideone}
              alt="slideone"
              height={720}
              width={1440}
              className="slides slide-two"
            />
          </div>
          <div className="sliderthree">
            <img 
              src={slidethree}
              alt="slidethree"
              height={720}
              width={1440}
              className="slides"
            />
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default Banner