import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../assets/images/default.jpg'; // Adjust the path as needed
import lokiPic from '../assets/images/loki.jpg';
import hermionePic from '../assets/images/hermione.jpeg';
import rdjPic from '../assets/images/rdj.jpg';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();

  // Fetch challenges on component mount
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('http://localhost:8000/challenges-api', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }

        const data = await response.json();
        // Filter challenges based on availability
        setChallenges(
          data.filter(
            (challenge) => new Date(challenge.availableTo) >= new Date()
          )
        );
      } catch (error) {
        console.error('Error fetching challenges:', error.message);
      }

      try {
        const response = await fetch('http://localhost:8000/challenges-api/profile/for_challenge_accept_delete', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const { for_c_a_d_user } = await response.json();
        console.log("Returned " + for_c_a_d_user);
        console.log("returned user id " + for_c_a_d_user.id);
        localStorage.setItem("userId", for_c_a_d_user.id);

      } catch (error) {
        console.error("Error in Challenges.js component # useEffect()");
      }
    };

    fetchChallenges();
  }, [challenges]); // added challenges to dependency array 

  const handleAccept = async (challenge) => {
    try {

      const response = await fetch('http://localhost:8000/challenges-api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({
          text: 'I am interested in your challenge',
          recipientId: challenge.userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Navigate to Messages page
      navigate('/messages', { state: { recipientId: challenge.userId } });
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/challenges-api/${id}`, {
        method: 'DELETE',
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error('Failed to delete challenge');
      }

      alert('Challenge deleted successfully');
      setChallenges((prevChallenges) =>
        prevChallenges.filter((challenge) => challenge.id !== id)
      );


      // refetching challenges after deleting it:
      
    } catch (error) {
      console.error('Error deleting challenge:', error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Challenges</h2>
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <ChallengeItem
            key={challenge._id}
            challenge={challenge}
            onAccept={handleAccept}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

function iamgrootkrishna(username) {
  switch (username.toLowerCase()) {
    case 'loki':
      return lokiPic;
    case 'hermione':
      return hermionePic;
    case 'tony':
      return rdjPic;
    default:
      return defaultProfilePic;
  }
}

const ChallengeItem = ({ challenge, onAccept, onDelete }) => {
  const profilePicture = iamgrootkrishna(challenge.username);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-white"
        />
        <div>
          <p className="text-lg font-semibold">{challenge.username}</p>
          <p className="text-md text-gray-400">
            {new Date(challenge.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex-1 ml-8 text-lg">
        <p>Sport: {challenge.sport}</p>
        <p>From: {new Date(challenge.availableFrom).toLocaleDateString()}</p>
        <p>To: {new Date(challenge.availableTo).toLocaleDateString()}</p>
        <p>Timings: {challenge.timing}</p>
      </div>
      <div className="flex space-x-6">
        {localStorage.getItem('userId') !== challenge.userId.toString() && (
          <button
            onClick={() => onAccept(challenge)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 text-lg"
          >
            Accept
          </button>
        )}
        {localStorage.getItem('userId') === challenge.userId.toString() && (
          <button
            onClick={() => onDelete(challenge._id)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 text-lg"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Challenges;
