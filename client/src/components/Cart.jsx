import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearCart, removeFromCart } from '../store/state'
import { motion } from 'framer-motion'
import Backdrop from '../assets/popups/cart/Backdrop'
import { Minus, Plus, X } from 'lucide-react'
import DeleteIcon from '@mui/icons-material/Delete';
import { cartAnimate } from '../assets/popups/cart/animation'

const Cart = ({ handleClose }) => {
  // State to increase or decrease quantity of product
  const [counter, setCounter] = useState(1);

  // Cart state and dispatch() here
  const cart = useSelector((state) => state.cart);
  console.log(cart)
  const dispatch = useDispatch();

  // Removes product from cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  }

  // Clears whole cart
  const handleClearCart = () => {
    dispatch(clearCart());
  }

  // Increase amount
  const handleClickPlus = () => {
    setCounter(counter + 1);
  };

  // Decrease amount
  const handleClickMinus = () => {
    setCounter(counter => Math.max(counter - 1, 1))
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {/* BACKDROP AND CART DISPLAY/ANIMATION */}
      <Backdrop> 
        <motion.div 
          onClick={(e) => e.stopPropagation()}
          className='cart-card'
          variants={cartAnimate}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          {/* CART CONTAINER */}
          <div className='cart-container'>
            <div className='cart-head'>
              <button 
                className='cart-close-btn' 
                onClick={handleClose}
              >
                <X size={30} strokeWidth={1.5}/>
              </button>
              <h3 className='cart-header'>SHOPPING CART {`(${cart.length})`}</h3>
            </div>
            {/* CART CONTENT */}
            <div className='cart-content'>
              {cart.length === 0 ? (
                <div className='cart-is-empty'>
                  <p className=''>YOUR CART IS EMPTY</p>
                </div>
              ) : (
                <>
                  <div className='cart-item-container'>
                    {cart.map((item) => (
                      <div className='cart-item' key={item.id}>
                        <div className='cart-details' >
                          <Link to={`/product/${item.handle}`} className='cart-image-link' reloadDocument>
                            <img src={item.image} alt={item.title} width={100}/>
                          </Link>
                          <div className='cart-details-two'>
                            <Link to={`/product/${item.handle}`} style={{textDecoration: 'none', color: 'black'}} reloadDocument>
                              <h5>{item.title}</h5>
                            </Link>
                            {/*<p>£{item.price.toFixed(2)}</p>*/}
                            <div className='cart-details-three'>
                              <div className='cart-quantity-handle'>
                                <button  onClick={handleClickMinus} className='cart-button-minus'><Minus size={10}/></button>
                                  <p className='cart-quantity'>{counter}</p>
                                <button onClick={handleClickPlus} className='cart-button-plus'><Plus size={10}/></button>
                              </div>
                              <h5>{item.variant.toUpperCase()}</h5>
                            </div>
                          </div>
                          <div className='cart-handle'>
                            <h5 className='cart-price'>£{(item.quantity * item.price).toFixed(2)}</h5>
                            <button className='cart-delete' onClick={() => handleRemove(item.id)}><DeleteIcon /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* BOTTOM SECTION OF CART */}
                    <button className='clear' onClick={handleClearCart}>CLEAR CART</button>
                  </div>
                  <div className='cart-bottom-section'>
                    <p className='tax-and-shipping'>Tax and shipping is calculated at checkout</p>
                    <p className='cart-subtotal'>SUBTOTAL<span>£{(counter * subtotal).toFixed(2)} GBP</span></p>
                    <button className='checkout'>CHECKOUT</button>
                    <Link to='/Shop'><button className='continue'>CONTINUE SHOPPING</button></Link>
                  </div>
                </>
              )} 
            </div>
          </div>
        </motion.div>
      </Backdrop>
    </>
  )
}

export default Cart