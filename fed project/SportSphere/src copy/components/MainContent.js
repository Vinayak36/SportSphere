// MainContent.js
import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Hero from './Hero';
import Montage from './Montage';
import Features from './Features';
import Footer from './Footer';
import Login from './Login';
import Messages from './Messages';
import SignUp from './SignUp';
import Challenges from './Challenges';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';

const MainContent = () => {
  const location = useLocation();

  // List of paths where Montage, Features, and Footer should not be rendered
  const noExtras = ['/profile', '/challenges', '/messages'];

  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/challenges" element={<PrivateRoute element={Challenges} />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/messages" element={<PrivateRoute element={Messages} />} />
      </Routes>
      {/* Conditionally render Montage, Features, and Footer */}
      {!noExtras.includes(location.pathname) && (
        <>
          <Montage />
          <Features />
          <Footer />
        </>
      )}
    </>
  );
};

export default MainContent;
