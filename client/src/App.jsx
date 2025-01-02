import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home/Home'
import AboutUs from './pages/AboutUs/AboutUs'
import ContactUs from './pages/ContactUs/ContactUs'
import Careers from './pages/Careers/Careers'
import Submit from './pages/Careers/Submit'
import Navbar from './components/Navbar'
import Shop from './pages/Shop/Shop'
import ProductPage from './pages/ProductPage/ProductPage'
import './App.css'
import Menu from './pages/Menu/Menu'
import PrivacyNotice from './pages/PrivacyNotice/PrivacyNotice'

function App() {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Link to='/product/:handle' onClick={() => changeColour('var(--main-green)')}></Link>
        <Routes>
          {/* Main pages */}
          <Route path='/' element={<Home/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
          <Route path='/ContactUs' element={<ContactUs/>}/>
          <Route path='/Menu' element={<Menu />}/>
          <Route path='/Careers' element={<Careers/>}/>
          <Route path='/Shop' element={<Shop />}/>
          {/* Other Pages */}
          <Route path='/PrivacyNotice' element={<PrivacyNotice />}/>
          <Route path='/product/:handle' element={<ProductPage />}/>
          <Route path='submit' element={<Submit />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
