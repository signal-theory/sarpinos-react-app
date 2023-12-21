import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/sarpinos-logo.svg';
import './NavDesktop.css';

function NavDesktop() {
  // retrieve featured images for each page
  const [featuredImages, setFeaturedImages] = useState({});

  useEffect(() => {
    const pageIds = [91, 34, 170];

    pageIds.forEach(id => {
      axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages/${id}`) // replace with your actual API endpoint
        .then(response => {
          const post = response.data; // Get the post data

          // If there's a featured image, fetch its details
          if (post.featured_media) {
            axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${post.featured_media}`)
              .then(imageResponse => {
                if (imageResponse && imageResponse.data) {
                  setFeaturedImages(prevImages => ({
                    ...prevImages,
                    [id]: {
                      url: imageResponse.data.source_url,
                      alt: imageResponse.data.alt_text
                    }
                  }));
                }
              });
          }

        })
        .catch(error => {
          console.error(`Error fetching data for page ${id}:`, error);
        });
    });
  }, []);

  // handle menu dropdowns
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

  // close menu dropdowns when clicking outside of them
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
          <li className="item button">
            <a href="" className=" btn primary-btn glow"><span>Order Now</span></a>
          </li>
        </ul>
      </div>
      <div className={`navbar-dropdowns ${activeMenus['Locations'] ? 'locations-active' : ''}`}>
        <ul ref={myRef1} className={`item submenu about ${activeMenus['About'] ? 'active' : ''}`}>
          <li className="subitem"><Link to="/about/company" onClick={() => handleSubmenu('About')}>Company Info</Link></li>
          <li className="subitem"><Link to="/about/why-sarpinos" onClick={() => handleSubmenu('About')}>Why Sarpino's?</Link></li>
          <li className="subitem"><Link to="/about/blog" onClick={() => handleSubmenu('About')}>Sarpino's Blog</Link></li>
        </ul>
        <ul ref={myRef2} className={`item submenu menu ${activeMenus['Menu'] ? 'active' : ''}`}>
          <li className="subitem has-submenu with-thumbs">
            <ul>
              <li className="subitem">
                <Link to="/menu/build-your-own" onClick={() => handleSubmenu('Menu')}>
                  {featuredImages[91] && (
                    <img className="featured-image" src={featuredImages[91].url} alt={featuredImages[91].alt} />
                  )}
                  Build Your Own
                </Link>
              </li>
              <li className="subitem">
                <Link to="/menu/sarpinos-specialty-pizza" onClick={() => handleSubmenu('Menu')}>
                  {featuredImages[34] && (
                    <img className="featured-image" src={featuredImages[34].url} alt={featuredImages[34].alt} />
                  )}
                  Specialty Pizza
                </Link>
              </li>
              <li className="subitem">
                <Link to="/menu/sarpinos-specialty-pizza?selectedTerm=Vegan" onClick={() => handleSubmenu('Menu')}>
                  {featuredImages[170] && (
                    <img className="featured-image" src={featuredImages[170].url} alt={featuredImages[170].alt} />
                  )}
                  Vegan Pizza
                </Link>
              </li>
            </ul>
          </li>
          <li className="subitem has-submenu without-thumbs">
            <ul>
              <li className="subitem"><Link to="/menu/sarpinos-specialty-pizza" onClick={() => handleSubmenu('Menu')}>Full Menu</Link></li>
              <li className="subitem"><Link to="/menu/vegan-menu" onClick={() => handleSubmenu('Menu')}>Vegan Menu</Link></li>
              <li className="subitem"><Link to="/menu/sarpinos-specialty-pizza?selectedTerm=Gluten Free" onClick={() => handleSubmenu('Menu')}>Gluten-Free Menu</Link></li>
              <li className="subitem"><Link to="/menu/national-specials" onClick={() => handleSubmenu('Menu')}>Specials & Promotions</Link></li>
            </ul>
          </li>
        </ul>
        <ul ref={myRef3} className={`item submenu ${activeMenus['Locations'] ? 'active' : ''}`}>
          <li className="subitem"><Link to="/locations" onClick={() => handleSubmenu('Locations')}>Search Sarpino's Locations</Link></li>
        </ul>
      </div>
    </>
  );
}

export default NavDesktop;