import React, { useState, useEffect } from 'react';
import './Nav.css';
import NavMobile from './NavMobile.jsx';
import NavDesktop from './NavDesktop.jsx';

function Navigation() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1199);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="main-navigation">
      {isMobile ? <NavMobile /> : <NavDesktop />}
    </nav>
  );
}

export default Navigation;