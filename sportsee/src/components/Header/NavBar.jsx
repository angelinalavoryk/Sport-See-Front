import './_NavBar.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import icon1 from '../../assets/icon1.svg';
import icon2 from '../../assets/icon2.svg';
import icon3 from '../../assets/icon3.svg';
import icon4 from '../../assets/icon4.svg';

const NavBar = () => {
return (
    <div className="navigation-bar">
      <nav className="horizontal-nav">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
          <Link to="/" className='link'>Accueil</Link>
          <Link to="/profil" className='link'>Profil</Link>
          <Link to="/reglages" className='link'>Réglages</Link>
          <Link to="/communaute" className='link'>Communauté</Link>
      </nav>
      <nav className="vertical-nav">
        <div className="buttons-section">
        <button className="nav-button">
           <img src={icon1} alt="icon yoga" className='nav-button-icon'/>
        </button>
        <button className="nav-button">
          <img src={icon2} alt="icon swim" className='nav-button-icon'/>
        </button>
        <button className="nav-button">
           <img src={icon3} alt="icon bike" className='nav-button-icon'/>
         </button>
          <button className="nav-button">
            <img src={icon4} alt="icon fitness" className='nav-button-icon'/>
          </button>
        </div>
        <div className="copyright-section">
          <p className='copyright-text'>Copiryght, SportSee 2020</p>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
