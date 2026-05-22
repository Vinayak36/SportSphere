// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primaryBlack text-primaryWhite p-6 text-center">
      <div className="mb-4">
        <a href="#privacy" className="hover:text-gray-300 mx-2">Privacy Policy</a> | 
        <a href="#terms" className="hover:text-gray-300 mx-2">Terms & Conditions</a>
      </div>
      <div>
        <p>&copy; 2024 Sportify. All rights reserved.</p>
        <p>Follow us on: 
          <a href="#twitter" className="hover:text-gray-300 mx-2">Twitter</a> | 
          <a href="#facebook" className="hover:text-gray-300 mx-2">Facebook</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
