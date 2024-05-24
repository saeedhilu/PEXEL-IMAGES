import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="data:image/png;base64,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" alt="" />
          </div>
          <div className="footer-links">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="/login">SignIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-info">
          <p>&copy; 2024 Pexel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
