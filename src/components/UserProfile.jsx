import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";
import "./UserProfile.css";
import logo from "./media/logo.png";
import user from "./media/user-icon.png";
import photo from "./media/photo.jpg";
import movie from "./media/movie.png";
import library from "./media/library.png";
import Navbar from "./slideBar/Navbar";

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
        
        // Move the code to set styles inside this useEffect
        if (levelNames.includes(1)) {
          let vare = document.querySelector('#A1');
          vare.style.color = "white";
          vare.style.backgroundColor = "rgb(134, 231, 100)";
          vare.addEventListener("click", function(event){
            window.location.href = `/lessons/1`})
        }
        if (levelNames.includes(2)) {
          let vare = document.querySelector('#A2');
          vare.style.color = "white";
          vare.style.backgroundColor = "rgb(134, 231, 100)";
          vare.addEventListener("click", function(event){
            window.location.href = `/lessons/2`})
        }
        if (levelNames.includes(3)) {
          let vare = document.querySelector('#B1');
          vare.style.color = "white";
          vare.style.backgroundColor = "rgb(134, 231, 100)";
          vare.addEventListener("click", function(event){
            window.location.href = `/lessons/3`})
        }
        if (levelNames.includes(4)) {
          let vare = document.querySelector('#B2');
          vare.style.color = "white";
          vare.style.backgroundColor = "rgb(134, 231, 100)";
          vare.addEventListener("click", function(event){
            window.location.href = `/lessons/4`})
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  // для проверки
  async function delayedFunction() {
    await new Promise(resolve => setTimeout(resolve, 200)); // Ждем 2 милисекнуды вроде
    let vare = document.querySelector('#A2');
    vare.style.color = "rgb(255, 255, 255)";
    vare.style.backgroundColor = "rgb(134, 231, 100)";
    vare.addEventListener("click", function(event){
      window.location.href = `/lessons/2`;
    });
  }
  delayedFunction().then(() => {
    console.log("Функция запущена после 5 секунд");
  });
  
  const handleLevelClick = (levelName) => {
    const levelId = levelIndexes[levelName];
    window.location.href = `/lessons/${levelId}`;
  };

  return (
    <div className="main_for_main_page">
      <Navbar email={email} levelNames={levelNames} />
      <div className="container mt-4 text-center">
        <h2>Learn German - Start Your Journey</h2>
        <p>
          Welcome to your German learning journey! Choose a proficiency level to
          start with the lessons tailored for you.
        </p>
      </div>
      <div id="wrapper_for_main_page">
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
        <div id="levels">
          <div id="A1">A1</div>
          <div id="A2">A2</div>
          <div id="B1">B1</div>
          <div id="B2">B2</div>
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
        <div className="card text-center additional" id="moviesMain">
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
        <div className="card text-center additional" id="libraryMain">
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
