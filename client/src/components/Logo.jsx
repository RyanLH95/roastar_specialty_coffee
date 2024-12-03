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
          {/* :HOVER LOGO EFFECT */}
          <img 
            src={logo ? "/logo/Logo ROASTAR-green.PNG" : "/logo/Logo ROASTAR-white.PNG"}
            alt="roastar-logo green"
            className='roastar-logo green'
            height={50}
            width={150}  
          />
          {/* DAYTIME LOGO */}
          <img 
            src={logo ? "/logo/Logo ROASTAR-black.PNG" : "/logo/Logo ROASTAR-beige.PNG"}
            alt="roastar-logo-black/beige"
            className='roastar-logo beige'
            height={50}
            width={150}  
          />
          {/* NIGHTIME LOGO / prefers-colors-scheme: dark */}
           <img 
            src={logo ? "/logo/Logo ROASTAR-white.PNG" : "/logo/Logo ROASTAR-beige.PNG"}
            alt="roastar-logo-black/beige"
            className='roastar-logo white'
            height={50}
            width={150}  
          />
        </NavLink>
      </div>
    </>
  )
}

export default Logo