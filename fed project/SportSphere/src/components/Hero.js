import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    try {
      // Check authentication by making a request to the backend
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        // User is authenticated, navigate to the challenges page
        navigate('/challenges');
      } else {
        // User is not authenticated, redirect to the login page
        navigate('/login');
      }
    } catch (error) {
      console.error('Error verifying authentication:', error);
      // Redirect to login if there's an error (e.g., network issues)
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
