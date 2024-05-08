import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import "./Listening.css";

function LessonDetailsListening() {
  const { lessonId } = useParams();
  const levelId = sessionStorage.getItem("selectedLevelId");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState(null);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8086/lesson/get/${lessonId}/listening`
        );
        setLesson(response.data);
      } catch (error) {
        console.error("Error fetching lesson:", error);
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
      const optionsArray = Object.values(selectedOptions).map((optionId) => ({
        selectedOption: optionId,
      }));
      const response = await axios.post(
        `http://localhost:8086/listen/check/${lessonId}`,
        optionsArray
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error checking result:", error);
    }
  };

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div class="main-content">
      <Navbar />

      <main>
        <div class="main_container">
          <h1 id="big_title">{lesson.title}</h1>
        </div>
        <div id="big_tetx">
          <p>{lesson.description}</p>
        </div>
        <div class="audioDiv">
          <audio id="audioPlayer" controls>
            <source
              src={`http://localhost:8086/${lesson.mp3FilePath}`}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="test-questions">
          {lesson.questions.map((question) => (
            <div key={question.id} className="question">
              <h2>{question.question}</h2>
              <div className="selector-test">
                <span
                  className={
                    selectedOptions[question.id] === 1
                      ? "variant selected"
                      : "variant notselected"
                  }
                  onClick={() => handleOptionClick(question.id, 1)}
                >
                  A
                </span>
                <span>{question.option1}</span>
              </div>

              <div className="selector-test">
                <span
                  className={
                    selectedOptions[question.id] === 2
                      ? "variant selected"
                      : "variant notselected"
                  }
                  onClick={() => handleOptionClick(question.id, 2)}
                >
                  B
                </span>
                <span>{question.option2}</span>
              </div>

              <div className="selector-test">
                <span
                  className={
                    selectedOptions[question.id] === 3
                      ? "variant selected"
                      : "variant notselected"
                  }
                  onClick={() => handleOptionClick(question.id, 3)}
                >
                  C
                </span>
                <span>{question.option3}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button className="button-79" onClick={handleCheckResult}>
            Submit
          </button>
        </div>
        {result !== null && <p>Number of correct answers: {result}</p>}
        <Link to={`/lessons/${levelId}`}>
          <button className="button-79">Back to Lesson List</button>
        </Link>
      </main>

      <div class="footer-container">
        <footer class="footer-content">
          <div class="footer-content">
            <form action="" class="email-form">
              <input
                type="email"
                id="emailInput"
                class="email-input-field"
                placeholder="Enter your email"
              />
              <button type="button" class="subscribe-button">
                Subscribe
              </button>
            </form>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LessonDetailsListening;
