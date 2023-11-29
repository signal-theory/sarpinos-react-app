import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/pizza">Pizza</Link></li>
        {/* Add other Footer links here */}
      </ul>
    </footer>
  );
}

export default Footer;