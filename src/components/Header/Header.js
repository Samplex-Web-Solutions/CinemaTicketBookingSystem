import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file
import logo from "../../img/logo.png";
const Header = () => {
  return (
    <header>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold"> <img src={logo} alt="magic Movies cinema logo"></img></Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/movies" className="hover:underline">Movies</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
