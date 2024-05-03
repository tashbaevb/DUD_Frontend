import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const levelIndexes = {
  "A1": 1,
  "A2": 2,
  "B1": 3
};

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
        setLevelNames(levelNames.sort());
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLevelClick = (levelName) => {
    const levelId = levelIndexes[levelName];
    window.location.href = `/lessons/${levelId}`;
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {email}</p>
      <p>Level Names:</p>
      <ul>
        {levelNames.map((levelName, index) => (
          <li key={index}>
            <button onClick={() => handleLevelClick(levelName)}>{levelName}</button>
          </li>
        ))}
      </ul>
      <Link to="/books">
        <button>Go to Library</button>
      </Link>
      <Link to="/movies">
        <button>Go to Movies</button>
      </Link>
      <Link to="/notes">
        <button>Open Note Chat</button>
      </Link>
    </div>
  );
}

export default UserProfile;
