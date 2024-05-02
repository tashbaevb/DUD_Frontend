import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function LessonDetailsReading() {
  const { lessonId } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({}); // Объект для хранения выбранных вариантов ответов
  const [result, setResult] = useState(null);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/lesson/get/${lessonId}/reading`);
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
      [questionId]: optionId, // Связываем вопрос с выбранным вариантом ответа
    });
  };

  const handleCheckResult = async () => {
    try {
      const optionsArray = Object.values(selectedOptions).map((optionId) => ({ selectedOption: optionId }));
      const response = await axios.post(`http://localhost:8086/reading/check/${lessonId}`, optionsArray);
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
      <h2>Lesson Details Reading</h2>
      <h3>{lesson.title}</h3>
      <p>{lesson.description}</p>
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
      <Link to={`/lesson/${lessonId}/listening`}>
        <button>Go to Listening Lesson</button>
      </Link>
    </div>
  );
}

export default LessonDetailsReading;
