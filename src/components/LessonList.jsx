import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

function LessonList() {
  const { levelId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/lesson/getAllByLevel/${levelId}`);
        setLessons(response.data);
        sessionStorage.setItem('selectedLevelId', levelId);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, [levelId]);

  return (
    <div>
      <h2>Lessons for Level {levelId}</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            {/* Use Link to navigate to the lesson details page */}
            <Link to={`/lesson/${lesson.id}/grammar`}>{lesson.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LessonList;
