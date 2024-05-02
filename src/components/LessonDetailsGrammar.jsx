import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function LessonDetailsGrammar() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  const handleReadingLessonClick = () => {
    window.location.href = `/lesson/${lessonId}/reading`;
  };


  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/lesson/get/${lessonId}/grammar`);
        setLesson(response.data);
      } catch (error) {
        console.error('Error fetching grammar lesson details:', error);
      }
    };

    fetchLessonDetails();
  }, [lessonId]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Grammar Lesson Details</h2>
      <h3>{lesson.title}</h3>
      <p>{lesson.description}</p>
      <button onClick={handleReadingLessonClick}>Continue to Reading Lesson</button>
    </div>
  );
}

export default LessonDetailsGrammar;
