import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          {/* Main pages */}
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
