import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { email } = useParams();
  const [levelNames, setLevelNames] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8086/user/my-profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
        const { levelNames } = response.data;
        setLevelNames(levelNames.sort()); // Sort the level names alphabetically
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLevelClick = (levelId) => {
    window.location.href = `/lessons/${levelId}`; // Redirect to the lessons page for the selected level
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {email}</p>
      <p>Level Names:</p>
      <ul>
        {levelNames.map((levelName, index) => (
          <li key={index}>
            <button onClick={() => handleLevelClick(index + 1)}>{levelName}</button>
          </li>
        ))}
      </ul>
      <Link to="/books">
        <button>Go to Library</button>
      </Link>
      <Link to="/movies">
        <button>Go to Movies</button>
      </Link>
    </div>
  );
}

export default UserProfile;
