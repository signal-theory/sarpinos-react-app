import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/sarpinos-logo.svg';
import './NavDesktop.css';

function NavDesktop() {
  const [activeMenus, setActiveMenus] = useState({});

  const handleSubmenu = (menu) => {
    setActiveMenus(prevState => {
      // Create a new state object with all menus inactive
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // Set the clicked menu to active
      newState[menu] = true;

      return newState;
    });
  };
  return (
    <>
      <div className="navbar">
        <Link to="/" className="logo" title="Go to Sarpino's Home page">
          <img src={logo} alt="Sarpino's Pizzeria Logo" />
        </Link>
        <ul className="desktopmenu">
          <li className="item has-submenu"><a tabIndex="0" className={`${activeMenus['About'] ? 'active' : ''}`} onClick={() => handleSubmenu('About')}>About</a>

          </li>
          <li className="item has-submenu"><a tabIndex="0" className={`${activeMenus['Menu'] ? 'active' : ''}`} onClick={() => handleSubmenu('Menu')}>Menu</a>

          </li>
          <li className="item"><Link to="/catering">Catering</Link></li>
          <li className="item"><Link to="/locations">Find Locations</Link></li>
        </ul>
        <ul className="desktoplinks">
          <li className="item button heart"><a href="/loyalty">Loyalty Sign-In</a></li>
          <li className="item button primary-btn"><a href="">Order Now</a></li>
        </ul>
      </div>
      <div className="navbar-dropdowns">
        <ul className={`item submenu ${activeMenus['About'] ? 'active' : ''}`}>
          <li className="subitem"><Link to="/about/company">Company Info</Link></li>
          <li className="subitem"><Link to="/about/why-sarpinos">Why Sarpino's?</Link></li>
          <li className="subitem"><Link to="/about/blog">Sarpino's Blog</Link></li>
        </ul>
        <ul className={`item submenu ${activeMenus['Menu'] ? 'active' : ''}`}>
          <li className="subitem"><Link to="/menu/national-specials">National Specials</Link></li>
          <li className="subitem"><Link to="/menu/build-your-own">Build Your Own</Link></li>
          <li className="subitem"><Link to="/menu/sarpinos-specialty-pizza">Specialty Pizza</Link></li>
          <li className="subitem"><Link to="/menu/calzones">Calzones</Link></li>
        </ul>
      </div>
    </>
  );
}

export default NavDesktop;