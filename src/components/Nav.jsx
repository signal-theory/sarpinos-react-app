import { Link } from 'react-router-dom';
import './Nav.css';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/pizza">Pizza</Link></li>
        {/* Add other navigation links here */}
      </ul>
    </nav>
  );
}

export default Navigation;