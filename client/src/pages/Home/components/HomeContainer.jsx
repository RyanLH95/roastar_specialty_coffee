import React from 'react'
import Links from './Links.jsx'
import Desc from './Desc.jsx'
import MenuAd from './MenuAd.jsx'
import Points from './Points.jsx'
import FeaturedShop from './FeaturedShop.jsx'
import Specialty from './Specialty.jsx'
import '../Home.css'
import Footer from '../../../components/Footer.jsx'

const HomeContainer = () => {
  return (
    <div className='home-container'>
      <Links />
      <Desc />
      <Specialty />
      <MenuAd />
      <Points />
      <FeaturedShop />
      <Footer />
    </div>
  )
}

export default HomeContainer