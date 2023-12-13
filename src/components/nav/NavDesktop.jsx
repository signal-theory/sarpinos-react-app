import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/sarpinos-logo.svg';
import './NavDesktop.css';

function NavDesktop() {
  const [activeMenus, setActiveMenus] = useState({});
  const myRef1 = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);
  const handleSubmenu = (menu) => {
    setActiveMenus(prevState => {
      // Create a new state object with all menus inactive
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // If the clicked menu was already active, keep it inactive
      // Otherwise, set it to active
      newState[menu] = !prevState[menu];

      return newState;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((myRef1.current && !myRef1.current.contains(event.target)) &&
        (myRef2.current && !myRef2.current.contains(event.target)) &&
        (myRef3.current && !myRef3.current.contains(event.target))) {
        setActiveMenus(prevState => {
          const newState = Object.keys(prevState).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {});
          return newState;
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navbar">
        <Link to="/" className="logo" title="Go to Sarpino's Home page">
          <img src={logo} alt="Sarpino's Pizzeria Logo" />
        </Link>
        <ul className="desktopmenu">
          <li className="item has-submenu">
            <a
              className={`${activeMenus['About'] ? 'active' : ''}`}
              onClick={() => handleSubmenu('About')}>About</a>
          </li>
          <li className="item has-submenu">
            <a
              className={`${activeMenus['Menu'] ? 'active' : ''}`}
              onClick={() => handleSubmenu('Menu')}>Menu</a>
          </li>
          <li className="item"><Link to="/catering">Catering</Link></li>
          <li className="item has-submenu">
            <a
              className={`${activeMenus['Locations'] ? 'active' : ''}`}
              onClick={() => handleSubmenu('Locations')}>Find Locations</a>
          </li>
        </ul>
        <ul className="desktoplinks">
          <li className="item button heart">
            <a href="/loyalty">Loyalty Sign-In</a>
          </li>
          <li className="item button primary-btn">
            <a href="">Order Now</a>
          </li>
        </ul>
      </div>
      <div className="navbar-dropdowns">
        <ul ref={myRef1} className={`item submenu ${activeMenus['About'] ? 'active' : ''}`}>
          <li className="subitem"><Link to="/about/company" onClick={() => handleSubmenu('About')}>Company Info</Link></li>
          <li className="subitem"><Link to="/about/why-sarpinos" onClick={() => handleSubmenu('About')}>Why Sarpino's?</Link></li>
          <li className="subitem"><Link to="/about/blog" onClick={() => handleSubmenu('About')}>Sarpino's Blog</Link></li>
        </ul>
        <ul ref={myRef2} className={`item submenu ${activeMenus['Menu'] ? 'active' : ''}`}>
          <li className="subitem"><Link to="/menu/national-specials" onClick={() => handleSubmenu('Menu')}>National Specials</Link></li>
          <li className="subitem"><Link to="/menu/build-your-own" onClick={() => handleSubmenu('Menu')}>Build Your Own</Link></li>
          <li className="subitem"><Link to="/menu/sarpinos-specialty-pizza" onClick={() => handleSubmenu('Menu')}>Specialty Pizza</Link></li>
          <li className="subitem"><Link to="/menu/calzones" onClick={() => handleSubmenu('Menu')}>Calzones</Link></li>
        </ul>
        <ul ref={myRef3} className={`item submenu ${activeMenus['Locations'] ? 'active' : ''}`}>
          <li className="subitem"><Link to="/locations" onClick={() => handleSubmenu('Locations')}>Search Sarpino's Locations</Link></li>
        </ul>
      </div>
    </>
  );
}

export default NavDesktop;