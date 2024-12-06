import React from 'react'
import Header from './components/Header'
import Products from './components/Products'
import '../../App.css'
import './Shop.css'

const Shop = () => {
  return (
    <div className='shop-container'>
      <Header />
      <Products />
    </div>
  )
}

export default Shop