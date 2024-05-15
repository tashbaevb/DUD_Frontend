import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../navbar/Navbar";
import Modal from "../ResultModal";
import "./Reading.css";

function LessonDetailsReading() {
  const { lessonId } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonResponse, profileResponse] = await Promise.all([
          axios.get(`http://localhost:8086/lesson/get/${lessonId}/reading`),
          axios.get("http://localhost:8086/user/my-profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }),
        ]);

        const { data: lessonData } = lessonResponse;
        const { data: profileData } = profileResponse;

        setLesson(lessonData);
        setEmail(profileData.email);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
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
      setShowModal(true);
    } catch (error) {
      console.error("Error checking result:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <Navbar email={email} />

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

        {showModal && (
          <Modal
            result={result}
            onClose={handleCloseModal}
            onNext={() => {
              window.location.href = `/lesson/${lessonId}/listening`;
            }}
          />
        )}
      </main>
    </div>
  );
}

export default LessonDetailsReading;
