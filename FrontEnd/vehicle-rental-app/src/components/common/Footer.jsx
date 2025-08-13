import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer text-center mt-5 py-4 border-top">
      <div className="container">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} <span>VehicleRental</span>. All rights reserved.
        </p>
        <div className="footer-links d-flex justify-content-center gap-3">
          <Link to="/about" className="text-decoration-none text-secondary">About</Link>
          <Link to="/contact" className="text-decoration-none text-secondary">Contact</Link>
          <Link to="/terms" className="text-decoration-none text-secondary">Terms</Link>
          <Link to="/privacy" className="text-decoration-none text-secondary">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
