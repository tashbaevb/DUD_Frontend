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

      <div class="container mt-4">
        <div class="row">
          {lessons.map((lesson) => (
            <div key={lesson.id} class="col-md-4">
              <div class="card topic-card">
                <div class="card-body">
                  <h5 class="card-title">{lesson.title}</h5>
                  <p class="card-text">{lesson.description}</p>
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
