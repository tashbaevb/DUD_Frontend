import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./LessonList.css";

function LessonList() {
  const { levelId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8086/lesson/getAllByLevel/${levelId}`
        );
        setLessons(response.data);
        sessionStorage.setItem("selectedLevelId", levelId);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [levelId]);

  return (
    <div className="main-lessonList">
      <h2>Lessons for Level {levelId}</h2>

      <div className="container mt-4">
        <div className="row">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="col-md-4">
              <div className="card topic-card">
                <div className="card-body">
                  <h5 className="card-title">{lesson.title}</h5>
                  <p className="card-text">{lesson.description}</p>
                  <Link
                    to={`/lesson/${lesson.id}/grammar`}
                    className="btn btn-primary"
                  >
                    Start
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LessonList;
