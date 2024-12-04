import React from 'react'
import ContactForm from './ContactForm'
import GoogleMaps from './GoogleMaps'

const ContactUsContainer = () => {
  return (
    <div className='cu-container'>
      <h2>Have any enquiries? Please fill in form below. We would love to get in contact with you.</h2>
      <ContactForm />
      <GoogleMaps />
    </div>
  )
}

export default ContactUsContainer