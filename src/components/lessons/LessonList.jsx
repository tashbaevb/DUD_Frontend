import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./LessonList.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const levelIndexes = {
  1: "A1",
  2: "A2",
  3: "B1",
};

function LessonList() {
  const { levelId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [email, setEmail] = useState("");
  const [levelName, setLevelName] = useState("");

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
        setEmail(profileData.email);
        setLevelName(levelIndexes[levelId]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [levelId]);

  return (
    <div className="mainLessonList">
      <Navbar email={email} />
      <div className="main-lessonList">
        <h2 className="h2">Lektionen für das Niveau - {levelName}</h2>
        <div
          className="container2"
          style={{ maxWidth: "90%", margin: "0 auto" }}
        >
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
                      style={{ width: "100%" }}
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
    </div>
  );
}

export default LessonList;
