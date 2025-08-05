import React from 'react'
import Logo from '../assets/Pokédex_logo.png';
import '../Css/Header.css'
const Header = () => {
  return (
    <header className='Nav'>
        <img src={Logo} style={{width:'8%'}} />
    </header>
)
}

export default Header