import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import "./Grammar.css";

function LessonDetailsGrammar() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  const handleReadingLessonClick = () => {
    window.location.href = `/lesson/${lessonId}/reading`;
  };

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8086/lesson/get/${lessonId}/grammar`
        );
        setLesson(response.data);
      } catch (error) {
        console.error("Error fetching grammar lesson details:", error);
      }
    };

    fetchLessonDetails();
  }, [lessonId]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <Navbar />

      <main>
        <div className="main_container">
          <h2 id="big_title">{lesson.title}</h2>
        </div>
        <div id="big_text">
          <p>{lesson.description}</p>
        </div>
        {lesson.imgPath && (
          <img
            id="img-grammar"
            src={`http://localhost:8086/${lesson.imgPath}`}
            alt="Lesson Image"
            style={{ width: "300px", height: "auto" }}
          />
        )}
        <div className="button-container">
          <button
            className="button-79"
            role="button"
            onClick={handleReadingLessonClick}
          >
            Submit
          </button>
        </div>
      </main>

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

export default LessonDetailsGrammar;
