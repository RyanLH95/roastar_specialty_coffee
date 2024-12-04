import React from 'react'
import ContactUsContainer from './components/ContactUsContainer'
import ContactUsHeader from './components/ContactUsHeader'
import '../../App.css'
import './ContactUs.css'

const ContactUs = () => {
  return (
    <div className='contact-us-container'>
      <ContactUsHeader />
      <ContactUsContainer />
    </div>
  )
}

export default ContactUs