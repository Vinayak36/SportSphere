// PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // If the token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If token exists, render the requested component
  return <Component {...rest} />;
};

export default PrivateRoute;
