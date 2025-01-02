import React from 'react'
import visaIcon from '../../public/icon/payment_visa_icon.svg'
import masterCardIcon from '../../public/icon/payment_mastercard_icon.svg'
import paypalIcon from '../../public/icon/payment_paypal_icon.svg'
import InstagramIcon  from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useLocation } from 'react-router-dom'
import { Copyright } from 'lucide-react'
import '../App.css'


const Footer = () => {
  const active = useLocation().pathname;

  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-address'>
          <img
            src='/logo/Logo ROASTAR-white.webp'
            height={80}
            width={180}
          />
          <ul className='address'>
            <li>8 EAST ST</li>
            <li>BROMLEY</li>
            <li>BR1 1QX</li>
          </ul>
          <div className='phone-no'>
            <p>020 4559 2984</p>
          </div>
        </div>
        <div className='socials'>
          <p>
            <Link to='https://www.instagram.com/roastar.coffee/'>
              <InstagramIcon
                className='insta'
                style={{fontSize: '2rem'}}
              />
           </Link>
          </p>
          <p>
            <Link to='https://www.facebook.com/roastarcoffeeuk'>
              <FacebookIcon
                className='facebook'
                style={{
                  fontSize: '2.2rem',
                  position: 'relative',
                  top: '-0.05em'
                }}
            />
            </Link>
          </p>
        </div>
        <div className='footer-nav'>
          <div className={`footer-links ${active === '/AboutUs' ? 'active-footer' : ''}`}>
            <Link
              reloadDocument 
              to={'/AboutUs'}
            >
              ABOUT US
            </Link>
          </div>
          <div className={`footer-links ${active === '/ContactUs' ? 'active-footer' : ''}`}>
            <Link 
              reloadDocument 
              to={'/ContactUs'} 
            >
              CONTACT US
            </Link>
          </div>
          <div className={`footer-links ${active === '/Careers' ? 'active-footer' : ''}`}>
            <Link 
              reloadDocument 
              to={'/Careers'} 
            >
              CAREERS
            </Link>
          </div>
          <div className={`footer-links ${active === '/Shop' ? 'active-footer' : ''}`}>
            <Link 
              reloadDocument 
              to={'/Shop'} 
            >
              SHOP
            </Link>
          </div>
          <div className={`footer-links ${active === '/PrivacyNotice' ? 'active-footer' : ''}`}>
            <Link 
              reloadDocument 
              to={'/PrivacyNotice'} 
            >
              PRIVACY NOTICE
            </Link>
          </div>
          <div style={{textAlign: 'center'}}>
            <span 
              style={{
                color: 'white', 
                position: 'relative',
                left: '5px',
                fontSize: '12px'
              }}>
              <Copyright 
                size={12}
                style={{
                  position: 'relative',
                  top: '1.5px',
                  left: '-5px'
                }}
              />
                Copyright 2025. Roastar Coffee. All Rights Reserved
            </span>
          </div>
          <div className='payment-icons'>
            <img src={visaIcon} alt="Visa" width="60" />
            <img src={masterCardIcon} alt="Visa" width="60" />
            <img src={paypalIcon} alt="Visa" width="60" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
