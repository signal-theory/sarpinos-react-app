import { Link } from 'react-router-dom';
import './Nav.css';

function Navigation() {
  return (
    <nav className="main-navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><span>About</span>
          <ul>
            <li><Link to="/about/company">Company Info</Link></li>
            <li><Link to="/about/why-sarpinos">Why Sarpino's?</Link></li>
            <li><Link to="/about/blog">Sarpino's Blog</Link></li>
          </ul>
        </li>
        <li><span>Menu</span>
          <ul>
            <li><Link to="/menu/national-specials">National Specials</Link></li>
            <li><Link to="/menu/build-your-own">Build Your Own</Link></li>
            <li><Link to="/menu/sarpinos-specialty-pizza">Specialty Pizza</Link></li>
            <li><Link to="/menu/calzones">Calzones</Link></li>
          </ul>
        </li>
        <li><Link to="/locations">Find Locations</Link></li>
        {/* Add other navigation links here */}
      </ul>
    </nav>
  );
}

export default Navigation;