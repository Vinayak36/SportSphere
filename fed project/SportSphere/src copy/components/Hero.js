import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Check if a JWT token exists in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Navigate to the challenges page
      navigate('/challenges');
    } else {
      // Redirect to the login page
      navigate('/login');
    }
  };

  return (
    <section className="bg-primaryBlack text-primaryWhite text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Connect, Compete, Conquer</h1>
      <p className="text-lg mb-8">Join the ultimate platform for sports enthusiasts to challenge and be challenged.</p>
      <button
        onClick={handleGetStarted}
        className="bg-primaryWhite text-primaryBlack px-6 py-3 rounded-full hover:bg-gray-200"
      >
        Get Started
      </button>
    </section>
  );
};

export default Hero;
