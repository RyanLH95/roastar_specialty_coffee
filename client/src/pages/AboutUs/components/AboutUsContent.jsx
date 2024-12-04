import React from 'react'

const AboutUsContent = () => {
  return (
    <div className='about-us-background'>
      <div className='about-us-content'>
        <div className='top-section'>
          <div className='text-container-one'>
            <h3>ROASTAR's GOAL</h3>
            <br/>
            <p>Roastar Coffee is a Vietnamese specialised coffee shop founded in 2019 where
             we have been trading online with specially imported Vietnamese coffee which 
             we sell as B2B and B2C, bringing awarness to Vietnamese-grown coffee. 
            </p>
            <br/>
            <p>Our goal is to bring a truly Vietnamese experience to our cafe and become one 
             of the leading Vietnames coffee brands in the UK, drawing a connection between 
             Vietnam and the rest of the world. 
            </p>
            <br/>
            <img 
              src='../../../../icon/Logo ROASTAR-lettermark.PNG'
              width={500}
            />
          </div>
          <div className='about-images'>
            <div className='about-image-one'>
              <img 
                src='../../../../images/imageTwo.png'
                width={400}
             />
            </div>
            <div className='about-image-two'>
              <img 
                src='../../../../images/delivery_link_image.png'
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
        <div className='bottom-section'>
          <div className='section'>
            <div className='bottom-section-img'>
              <img
                src='../../../../images/image-five.png'
                width={700}
              />
            </div>
            <div className='bottom-section-text'>
              <h3>WHAT WE BRING</h3>
              <p>Our coffee beans are roasted daily so that we can offer the highest quality and taste
               to our customers, which helps us stand out compared to other coffee chains.
              </p>
              <br/>
              <p>Our method of business is combining our knowledge of coffee beans and roastery to educate
               visitors of our website and customers the origins of the coffee we produce as well as the cultural
               aspects of our business and brand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsContent