import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
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
        console.log(levelNames);
        setLevelNames(levelNames.sort());

        // Move the code to set styles inside this useEffect
        if (levelNames.includes("A1")) {
          let vare = document.querySelector("#A1");
          vare.style.color = "white";
          vare.style.backgroundColor = "rgb(134, 231, 100)";
          vare.addEventListener("click", function (event) {
            window.location.href = `/lessons/1`;
          });
        }
        if (levelNames.includes("A2")) {
          let vare = document.querySelector("#A2");
          vare.style.color = "white";
          vare.style.backgroundColor = "rgb(134, 231, 100)";
          vare.addEventListener("click", function (event) {
            window.location.href = `/lessons/2`;
          });
        }
        if (levelNames.includes("B1")) {
          let vare = document.querySelector("#B1");
          vare.style.color = "white";
          vare.style.backgroundColor = "rgb(134, 231, 100)";
          vare.addEventListener("click", function (event) {
            window.location.href = `/lessons/3`;
          });
        }
        if (levelNames.includes("B2")) {
          let vare = document.querySelector("#B2");
          vare.style.color = "white";
          vare.style.backgroundColor = "rgb(134, 231, 100)";
          vare.addEventListener("click", function (event) {
            window.location.href = `/lessons/4`;
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLevelSelect = (levelId) => {
    sessionStorage.setItem("selectedLevelId", levelId);
  };

  return (
    <div className="main_for_main_page">
      <Navbar
        email={email}
        levelNames={levelNames}
        levelIndexes={levelIndexes}
      />
      <div className="container cont2 mt-4 text-center">
        <h2>Deutsch lernen - Beginnen Sie Ihre Reise</h2>
        <p>
          Willkommen auf Ihrer Reise zum Deutschlernen! Wählen Sie ein
          Sprachniveau und um mit dem auf Sie zugeschnittenen Unterricht zu
          beginnen.
        </p>
      </div>
      <div id="wrapper_for_main_page">
        <div className="container cont3">
          <div className="card greeting-card">
            <div>
              <h3>Hallo {email}!</h3>
            </div>
            <div>
              <img src={photo} alt="User Photo" />
            </div>
          </div>
        </div>
        <div id="levels">
          <div
            id="A1"
            className="leveCardsMain"
            onClick={handleLevelSelect("1")}
          >
            A1
          </div>
          <div id="A2" className="leveCardsMain">
            A2
          </div>
          <div id="B1" className="leveCardsMain">
            B1
          </div>
          <div id="B2" className="leveCardsMain ">
            B2
          </div>
        </div>
      </div>
      <div className="containerEND mt-4">
        <div className="card text-center additional" id="moviesMain">
          <img src={movie} className="card-img-top mx-auto" alt="Movie" />
          <div className="card-body d-flex flex-column justify-content-center cont">
            <h5 className="card-title">Filme</h5>
            <p className="card-text">
              Entdecken Sie unsere Sammlung von deutschen Filmen zur
              Verbesserung Ihrer Sprachkenntnisse
            </p>
            <a
              href="/movies"
              className="btn btn-primary mx-auto "
              style={{ marginTop: "20px !important" }}
            >
              Erkunden
            </a>
          </div>
        </div>
        <div className="card text-center additional" id="libraryMain">
          <img src={library} className="card-img-top mx-auto" alt="Library" />
          <div className="card-body d-flex flex-column justify-content-center cont">
            <h5 className="card-title">Bibliothek</h5>
            <p className="card-text">
              In unserer Bibliothek finden Sie eine große Auswahl an deutschen
              Büchern und Ressourcen.
            </p>
            <Link to="/books" className="btn btn-primary mx-auto">
              Besuchen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
