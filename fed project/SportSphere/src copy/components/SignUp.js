import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../assets/images/default.jpg'; // Adjust the path as needed

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users-signup-api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
          profilePicture: defaultProfilePic,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error creating account. Please try again.');
        return;
      }

      navigate('/login');
    } catch (error) {
      console.error('Error creating account:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primaryWhite text-primaryBlack">
      <form onSubmit={handleSignUp} className="bg-primaryWhite text-primaryBlack p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Get Burdurned With Glorious Purpose!</h2>

        {error && <div className="bg-red-200 text-red-700 p-2 rounded mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">Username:</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-black rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-black rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-black rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="bg-primaryBlack text-primaryWhite px-4 py-2 rounded hover:bg-gray-800">
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p>
            Already have an account? 
            <a href="/login" className="text-blue-500 underline ml-1">Log In</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
