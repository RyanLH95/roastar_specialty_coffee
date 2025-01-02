import React, { useState, useEffect } from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import '../App.css'

const Logo = () => {
  const [logo, setLogo] = useState(false);
  const { pathname } = useLocation();

  const logoHome = matchPath("/", pathname);
  const logoAboutUs = matchPath("/AboutUs", pathname);
  const logoShop = matchPath("/Shop", pathname);
  const logoMenu = matchPath("/Menu", pathname);
  const logoContactUs = matchPath("/ContactUs", pathname);
  const logoCareers = matchPath("/Careers", pathname);
  const logoItemDetails = matchPath("product/:handle", pathname);

  
  useEffect(() => {
    const changeLogo = () => {
      if (logoHome && window.scrollY >= 650) {
        setLogo(true);
      } else if (logoAboutUs && window.scrollY >= 1){
        setLogo(true);
      } else if (logoShop && window.scrollY >= 1){
        setLogo(true);
      } else if (logoMenu && window.scrollY >= 0){
        setLogo(true);
      } else if (logoContactUs && window.scrollY >= 1){
        setLogo(true);
      } else if (logoCareers && window.scrollY >= 180){
        setLogo(true);
      } else if (logoItemDetails && window.scrollY >= 1){
        setLogo(true);
      } else {
        setLogo(false);
      }
    }

      changeLogo();
      window.addEventListener('scroll', changeLogo);

      return () => {
        window.removeEventListener('scroll', changeLogo)
      }
  }, [pathname])
  
  return (
    <>
      <div className="logo">
        <NavLink reloadDocument to='/'>
          {/* :hover LOGO EFFECT */}
          <img 
            src={logo ? "/logo/Logo ROASTAR-green.webp" : "/logo/Logo ROASTAR-beige.webp"}
            alt="Roastar Logo Hover"
            className='roastar-logo-hover'
            height={50}
            width={150}
            loading='lazy'
          />
          {/* DAYTIME LOGO */}
          <img 
            src="/logo/Logo ROASTAR-white.webp"
            alt="Roastar Logo Daytime"
            className={`roastar-logo-daytime ${logo ? 'logo-active' : ''}`}
            height={50}
            width={150} 
            loading='eager' 
          />
          {/* NIGHTTIME LOGO / prefers-colors-scheme: dark */}
           <img 
            src="/logo/Logo ROASTAR-white.webp"
            alt="Roastar Logo Nighttime"
            className={`roastar-logo-nighttime ${logo ? 'logo-active' : ''}`}
            height={50}
            width={150} 
            loading='eager' 
          />
        </NavLink>
      </div>
    </>
  )
}

export default Logo