import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Reading.css";
import logo from "../media/logo.png";
import user from "../media/user-icon.png";

function LessonDetailsReading() {
  const { lessonId } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState(null);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8086/lesson/get/${lessonId}/reading`
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
        `http://localhost:8086/reading/check/${lessonId}`,
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
    <div className="main-content">
      {/* Navbar Container */}
      <div className="navbar-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" height="30" />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link message-icon" href="#">
                  <i className="fas fa-envelope"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" data-toggle="sidebar">
                  <img src={user} alt="User" height="30" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main>
        <div className="main_container">
          <h1 id="big_title">{lesson.title}</h1>
        </div>
        <div id="big_text">
          <p>{lesson.description}</p>
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
        <Link to={`/lesson/${lessonId}/listening`}>
          <button className="button-79">Go to Listening Lesson</button>
        </Link>
      </main>

      {/* Footer Container */}
      <div className="footer-container">
        <footer className="footer-content">
          <div className="footer-content">
            <form action="" className="email-form">
              <input
                type="email"
                id="emailInput"
                className="email-input-field"
                placeholder="Enter your email"
              />
              <button type="button" className="subscribe-button">
                Subscribe
              </button>
            </form>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LessonDetailsReading;
