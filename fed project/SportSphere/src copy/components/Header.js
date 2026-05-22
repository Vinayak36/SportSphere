import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
  return (
    <nav className="bg-primaryBlack text-primaryWhite p-4 flex justify-center items-center transition-colors duration-300 hover:bg-primaryWhite hover:text-primaryBlack">
      <Link to="/" className="text-2xl font-bold"> {/* Use Link for navigation */}
        Sportify
      </Link>
      <ul className="flex space-x-8 ml-8">
        <li className="group">
          <Link to="/profile" className="relative transition-colors duration-100"> {/* Update to Link */}
            Profile
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li className="group">
          <Link to="/challenges" className="relative transition-colors duration-100"> {/* Update to Link */}
            Challenges
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li className="group">
          <Link to="/messages" className="relative transition-colors duration-100"> {/* Update to Link */}
            Messages
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li className="group">
          <Link to="/contact" className="relative transition-colors duration-100"> {/* Update to Link */}
            Contact Us
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
