import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store error message
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/challenges'; // Default to '/challenges'

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await fetch('http://localhost:8000/users-login-api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies with the request
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to log in');
      }
  
      const data = await response.json();
      // Navigate to the intended URL or '/challenges'
      console.log("navigating to " + from);
      navigate(from, { replace: true });
      console.log("if this is printed there is some problem");
    } catch (error) {
      setError(error.message); // Display error message
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-primaryWhite text-primaryBlack">
      <form onSubmit={handleLogin} className="bg-primaryWhite text-primaryBlack p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Welcome Back :)</h2>

        {error && (
          <div className="bg-red-200 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )} {/* Display error message */}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email:
          </label>
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
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-black rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primaryBlack text-primaryWhite px-4 py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?
            <a href="/signup" className="text-blue-500 underline ml-1">
              Create a new account
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
