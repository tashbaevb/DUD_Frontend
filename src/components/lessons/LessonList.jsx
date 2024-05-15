import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./LessonList.css";
import Navbar from "../navbar/Navbar"; // Import Navbar
import Footer from "../footer/Footer";

const levelIndexes = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
};

function LessonList() {
  const { levelId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [levelNames, setLevelNames] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonsResponse, profileResponse] = await Promise.all([
          axios.get(`http://localhost:8086/lesson/getAllByLevel/${levelId}`),
          axios.get("http://localhost:8086/user/my-profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }),
        ]);

        const { data: lessonsData } = lessonsResponse;
        const { data: profileData } = profileResponse;

        setLessons(lessonsData);
        setLevelNames(profileData.levelNames.sort());
        setEmail(profileData.email); // Set the email in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [levelId]);

  return (
    <>
      <Navbar
        email={email}
        levelNames={levelNames}
        levelIndexes={levelIndexes}
      />{" "}
      {/* Include Navbar component */}
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
      <Footer />
    </>
  );
}

export default LessonList;
