import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/sarpinos-logo.svg';
import './NavMobile.css';

function NavMobile() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeMenus, setActiveMenus] = useState({});

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };
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
        <Link to="/" title="Go to Sarpino's Home page" onClick={toggleMenu === true ? handleToggle : null}>
          <img className="logo" src={logo} alt="Sarpino's Pizzeria Logo" />
        </Link>
        <button
          aria-expanded={toggleMenu}
          aria-haspopup="true"
          aria-controls="mobilemenu"
          onClick={handleToggle}>
          <span aria-hidden="true">&#x2630;</span>
        </button>
      </div>
      <ul className={`mobilemenu ${toggleMenu ? 'active' : ''}`}>
        <li className="item has-submenu"><a tabIndex="0" className={`${activeMenus['About'] ? 'active' : ''}`} onClick={() => handleSubmenu('About')}>About</a>
          <ul className={`item submenu ${activeMenus['About'] ? 'active' : ''}`}>
            <li className="subitem"><Link to="/about/company" onClick={handleToggle}>Company Info</Link></li>
            <li className="subitem"><Link to="/about/why-sarpinos" onClick={handleToggle}>Why Sarpino's?</Link></li>
            <li className="subitem"><Link to="/about/blog" onClick={handleToggle}>Sarpino's Blog</Link></li>
          </ul>
        </li>
        <li className="item has-submenu"><a tabIndex="0" className={`${activeMenus['Menu'] ? 'active' : ''}`} onClick={() => handleSubmenu('Menu')}>Menu</a>
          <ul className={`item submenu ${activeMenus['Menu'] ? 'active' : ''}`}>
            <li className="subitem"><Link to="/menu/national-specials" onClick={handleToggle}>National Specials</Link></li>
            <li className="subitem"><Link to="/menu/build-your-own" onClick={handleToggle}>Build Your Own</Link></li>
            <li className="subitem"><Link to="/menu/sarpinos-specialty-pizza" onClick={handleToggle}>Specialty Pizza</Link></li>
            <li className="subitem"><Link to="/menu/calzones" onClick={handleToggle}>Calzones</Link></li>
          </ul>
        </li>
        <li className="item"><Link to="/catering" onClick={handleToggle}>Catering</Link></li>
        <li className="item"><Link to="/locations" onClick={handleToggle}>Find Locations</Link></li>
        <li className="item button heart"><a href="/loyalty" onClick={handleToggle}>Loyalty Sign-In</a></li>
      </ul>
    </>
  );
}

export default NavMobile;