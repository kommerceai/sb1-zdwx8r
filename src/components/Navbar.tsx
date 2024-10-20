import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Kommerce</Link></li>
        <li><Link to="/affiliate">Affiliate Market</Link></li>
        <li><Link to="/kommerce/landing-page-builder">Landing Page Builder</Link></li>
        <li><Link to="/kommerce/demo-landing-page-builder">Demo Landing Page Builder</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;