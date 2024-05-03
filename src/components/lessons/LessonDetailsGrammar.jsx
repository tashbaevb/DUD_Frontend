import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GrammarStyle.scss';

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
    <div className="grammar">
      <div className="frame-title">
        <h2>{lesson.title}</h2>
      </div>
      <div className="frame-description">
        <p>{lesson.description}</p>
      </div>
      {lesson.imgPath && (
        <div className="frame-img">
          <img src={`http://localhost:8086/${lesson.imgPath}`} alt="Lesson Image" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
      <div className="frame-button">
        <button onClick={handleReadingLessonClick}>Continue to Reading Lesson</button>
      </div>
    </div>
  );
}

export default LessonDetailsGrammar;
