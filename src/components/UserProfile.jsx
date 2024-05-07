import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // Add this import
import axios from "axios";
import "./UserProfile.css";
import logo from "./media/logo.png";
import user from "./media/user-icon.png";
import photo from "./media/photo.jpg";
import movie from "./media/movie.png";
import library from "./media/library.png";

const levelIndexes = {
  A1: 1,
  A2: 2,
  B1: 3,
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
      <div className="profile-sidebar">
        <div className="text-center mb-4">
          <img src={logo} alt="Company Logo" height="50" />
          <h5>Lern-App</h5>
        </div>
        <div className="account">
          <h6>Account</h6>
          <ul className="list-unstyled">
            <li>
              <Link to="/notes">
                <i className="fas fa-envelope"></i> Messages
              </Link>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-cog"></i> Settings
              </a>
            </li>
          </ul>
        </div>
      </div>

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
              <h5 className="card-title">{levelName}</h5>
              <button
                onClick={() => handleLevelClick(levelName)}
                className="btn btn-primary"
              >
                Start Learning
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
