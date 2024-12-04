import React from 'react'
import AboutUsHeader from './components/AboutUsHeader'
import AboutUsContent from './components/AboutUsContent'
import '../../App.css'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className='about-us-container'>
      <AboutUsHeader />
      <AboutUsContent />
    </div>
  )
}

export default AboutUs