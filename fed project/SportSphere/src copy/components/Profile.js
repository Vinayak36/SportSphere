import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../assets/images/default.jpg';
import lokiPic from '../assets/images/loki.jpg';
import hermionePic from '../assets/images/hermione.jpeg';
import rdjPic from '../assets/images/rdj.jpg';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableTo, setAvailableTo] = useState('');
  const [timing, setTiming] = useState('');
  const [sport, setSport] = useState('');
  const [profilePicture, setProfilePicture] = useState(defaultProfilePic);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/profile-api/me', {
          headers: { token: token },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        setUsername(data.username || '');
        setEmail(data.email || '');
        setProfilePicture(data.profilePicture || defaultProfilePic);
        updateProfilePicture(data.username || '');
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [token, navigate]);

  const updateProfilePicture = (username) => {
    switch (username.toLowerCase()) {
      case 'loki':
        setProfilePicture(lokiPic);
        break;
      case 'hermione':
        setProfilePicture(hermionePic);
        break;
      case 'tony':
        setProfilePicture(rdjPic);
        break;
      default:
        setProfilePicture(defaultProfilePic);
        break;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfilePicture(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (newProfilePicture) {
      formData.append('profilePicture', newProfilePicture);
    }

    try {
      const response = await fetch('http://localhost:8000/profile-api/update', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();

    if (!sport || !availableFrom || !availableTo || !timing) {
      alert('Please fill out all fields before posting a challenge.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/challenges-api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sport,
          availableFrom,
          availableTo,
          timing,
          username,
          userId: userData._id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post challenge');
      }

      alert('Challenge posted successfully!');
      navigate('/challenges');
    } catch (error) {
      console.error('Error creating challenge:', error.message);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start h-screen bg-primaryBlack text-primaryWhite px-8 pt-20">
      {/* Profile Section */}
      <div className="w-full mb-8 bg-primaryWhite text-primaryBlack p-6 rounded">
        <h1 className="text-3xl font-bold mb-6">Hi, {username}</h1>
        <img
          src={profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 cursor-pointer"
          onClick={() => document.getElementById('profileImageInput').click()}
        />
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleProfileImageChange}
        />
        <form onSubmit={handleUpdateProfile} className="w-full mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border-b border-black bg-primaryWhite text-primaryBlack focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-b border-black bg-primaryWhite text-primaryBlack focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-primaryBlack text-primaryWhite px-4 py-2 rounded mt-4"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Challenge Section */}
      <form onSubmit={handleCreateChallenge} className="w-full">
        <fieldset className="border-b border-gray-600 pb-4 mb-4">
          <legend className="text-xl font-semibold mb-2">Create New Challenge</legend>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sport:</label>
            <input
              type="text"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full p-2 border-b border-white bg-primaryBlack text-primaryWhite focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Available from:</label>
            <input
              type="date"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
              className="w-full p-2 border-b border-white bg-primaryBlack text-primaryWhite focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">To:</label>
            <input
              type="date"
              value={availableTo}
              onChange={(e) => setAvailableTo(e.target.value)}
              className="w-full p-2 border-b border-white bg-primaryBlack text-primaryWhite focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Timing:</label>
            <select
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              className="w-full p-2 border-b border-white bg-primaryBlack text-primaryWhite focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-primaryWhite text-primaryBlack px-4 py-2 rounded mt-4"
          >
            Post Challenge
          </button>
        </fieldset>
      </form>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 text-primaryWhite px-4 py-2 rounded mt-6"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
