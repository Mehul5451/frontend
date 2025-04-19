import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <Link to="/aboutus"><h4>About Us</h4></Link>
          <p>We provide top-quality services and ensure customer satisfaction.</p>
        </div>
        <div className="footer-section">
          <Link to="/contactus"><h4>Contact</h4></Link>
          <p>Email: djbooki123@gmail.com</p>
          <p>Phone: +91 7698545512</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://www.instagram.com/mehulo_020?igsh=MWE5YjZxOWw4bmw4bw==" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 My ONLINE DJ BOOKING All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
