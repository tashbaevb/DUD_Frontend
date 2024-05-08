import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./UserProfile.css";
import photo from "../assets/photo.jpg";
import movie from "../assets/movie.png";
import library from "../assets/library.png";

const levelIndexes = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
};

function UserProfile() {
  const { email } = useParams();
  const [levelNames, setLevelNames] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8086/user/my-profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        const { levelNames } = response.data;
        setLevelNames(levelNames.sort());
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLevelClick = (levelName) => {
    const levelId = levelIndexes[levelName];
    window.location.href = `/lessons/${levelId}`;
  };

  return (
    <div className="main">
      <Navbar />

      <div className="container mt-4 text-center">
        <h2>Learn German - Start Your Journey</h2>
        <p>
          Welcome to your German learning journey! Choose a proficiency level to
          start with the lessons tailored for you.
        </p>
      </div>

      <div className="container">
        <div className="card greeting-card">
          <div>
            <h3>Hi {email}, Good Afternoon!</h3>
          </div>
          <div>
            <img src={photo} alt="User Photo" />
          </div>
        </div>
      </div>

      <div className="containerEnd">
        {levelNames.map((levelName, index) => (
          <div className="card level-card" key={index}>
            <div className="card-body progress-card">
              <button
                onClick={() => handleLevelClick(levelName)}
                className="btn btn-primary"
              >
                {levelName}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="containerEND mt-4">
        <div className="card text-center additional">
          <img src={movie} className="card-img-top mx-auto" alt="Movie" />
          <div className="card-body d-flex flex-column justify-content-center cont">
            <h5 className="card-title">Movies</h5>
            <p className="card-text">
              Explore our collection of German movies to practice your language
              skills.
            </p>
            <a
              href="/movies"
              className="btn btn-primary mx-auto "
              style={{ marginTop: "20px !important" }}
            >
              Explore
            </a>
          </div>
        </div>
        <div className="card text-center additional">
          <img src={library} className="card-img-top mx-auto" alt="Library" />
          <div className="card-body d-flex flex-column justify-content-center cont">
            <h5 className="card-title">Library</h5>
            <p className="card-text">
              Visit our library for a wide range of German books and resources.
            </p>
            <Link to="/books" className="btn btn-primary mx-auto">
              Visit
            </Link>
          </div>
        </div>
      </div>

      <div className="user-sidebar" id="userSidebar">
        <h5>User Profile</h5>
      </div>

      <footer className="bg-body-tertiary text-center text-lg-start mt-4">
        <div className="container p-4 pb-0">
          <form action="">
            <div className="row">
              <div className="col-auto mb-4 mb-md-0">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div className="col-md-5 col-12 mb-4 mb-md-0">
                <div data-mdb-input-init className="form-outline ">
                  <input
                    type="email"
                    id="form5Example22"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="form5Example22">
                    Email address
                  </label>
                </div>
              </div>

              <div className="col-auto mb-4 mb-md-0">
                <button
                  data-mdb-ripple-init
                  type="button"
                  className="btn btn-primary mb-4"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(112, 111, 111, 0.05 " }}
        >
          © 2020 Copyright:
          <a className="text-body" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default UserProfile;
