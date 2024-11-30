// src/components/Footer/Footer.js
import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react"; // Import icons
import "./Footer.css"; // For custom styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Cinema Booking System. All rights reserved.</p>
        <p>Follow us on:</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="social-icon" />
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="social-icon" />
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="social-icon" />
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
