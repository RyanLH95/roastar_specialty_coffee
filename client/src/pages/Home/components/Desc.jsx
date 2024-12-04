import React from 'react'
import { Link } from 'react-router-dom'

const Desc = () => {
  return (
      <div className='desc-container'>
        <div className='desc-content'>
          <div className='desc-text'>
            <h3>VIETNAMESE STYLE COFFEE</h3>
            <p>
              Discover and learn about our coffee and what makes it so great by visiting our
              'About Us' page. Learn about what makes our coffee so great and stands out.
              <br></br><br></br>
            </p>
            <h4 className='link-to'>
              <Link to='/AboutUs' reloadDocument>
                CLICK FOR MORE
              </Link>
            </h4>
          </div>
          <img 
            src='../../../images/roastar_social_image.png'
            width={500}
          />
        </div>
      </div>
  )
}

export default Desc