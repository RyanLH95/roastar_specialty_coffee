import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import AboutUs from './pages/AboutUs/AboutUs'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <div className='app'>
    <Router>
      
        <Navbar />
        <Routes>
          {/* Main pages */}
          <Route path='/' element={<Home/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
        </Routes>
        <Footer />
      
    </Router>
    </div>
  )
}

export default App
