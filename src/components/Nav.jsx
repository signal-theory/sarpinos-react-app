import { Link } from 'react-router-dom';
import './Nav.css';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><span>About</span>
          <ul>
            <li><Link to="/about/company">Company Info</Link></li>
            <li><Link to="/about/why-sarpinos">Why Sarpino's?</Link></li>
            <li><Link to="/about/blog">Sarpino's Blog</Link></li>
          </ul>
        </li>
        <li><Link to="/menu/pizza">Menu</Link></li>
        <li><Link to="/locations">Find Locations</Link></li>
        {/* Add other navigation links here */}
      </ul>
    </nav>
  );
}

export default Navigation;