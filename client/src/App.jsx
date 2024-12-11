import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import AboutUs from './pages/AboutUs/AboutUs'
import ContactUs from './pages/ContactUs/ContactUs'
import Careers from './pages/Careers/Careers'
import Submit from './pages/Careers/Submit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import Shop from './pages/Shop/Shop'
import ProductPage from './pages/ProductPage/ProductPage'

function App() {
 
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Routes>
          {/* Main pages */}
          <Route path='/' element={<Home/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
          <Route path='/ContactUs' element={<ContactUs/>}/>
          <Route path='/Careers' element={<Careers/>}/>
          <Route path='/Shop' element={<Shop />}/>
          {/* Other Pages */}
          <Route path='/product/:handle' element={<ProductPage />}/>
          <Route path='submit' element={<Submit />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
