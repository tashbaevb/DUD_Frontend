import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function LessonDetailsListening() {
  const { lessonId } = useParams();
  const levelId = sessionStorage.getItem('selectedLevelId');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState(null);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/lesson/get/${lessonId}/listening`);
        setLesson(response.data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleOptionClick = (questionId, optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId,
    });
  };

  const handleCheckResult = async () => {
    try {
      const optionsArray = Object.values(selectedOptions).map((optionId) => ({ selectedOption: optionId }));
      const response = await axios.post(`http://localhost:8086/listen/check/${lessonId}`, optionsArray);
      setResult(response.data);
    } catch (error) {
      console.error('Error checking result:', error);
    }
  };

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Listening Lesson Details</h2>
      <h3>{lesson.title}</h3>
      <p>{lesson.description}</p>
      <audio controls>
        <source src={`http://localhost:8086/${lesson.mp3FilePath}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <h3>Questions</h3>
      <ul>
        {lesson.questions.map((question) => (
          <li key={question.id}>
            <h4>{question.question}</h4>
            <ul>
              <li onClick={() => handleOptionClick(question.id, 1)}>{question.option1}</li>
              <li onClick={() => handleOptionClick(question.id, 2)}>{question.option2}</li>
              <li onClick={() => handleOptionClick(question.id, 3)}>{question.option3}</li>
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckResult}>Check Result</button>
      {result !== null && <p>Number of correct answers: {result}</p>}
      <Link to={`/lessons/${levelId}`}>Back to Lesson List</Link>
    </div>
  );
}

export default LessonDetailsListening;
