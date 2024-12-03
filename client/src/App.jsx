import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'

function App() {

  return (
    <Router>
      <div className='app'>
        <Navbar />
      </div>
    </Router>
  )
}

export default App
