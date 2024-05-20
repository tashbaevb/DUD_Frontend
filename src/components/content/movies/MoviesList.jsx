import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import "./MoviesList.css";
import closeIcon from "../../../assets/close.png";
import Footer from "../../footer/Footer";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieResponse, profileResponse] = await Promise.all([
          axios.get("http://localhost:8086/movie/getAll"),
          axios.get("http://localhost:8086/user/my-profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }),
        ]);

        const { data: movieData } = movieResponse;
        const { data: profileData } = profileResponse;

        setMovies(movieData);
        setEmail(profileData.email);
      } catch (error) {
        console.error("Error fetching movies or email:", error);
      }
    };

    fetchData();
  }, []);

  const handleMovieClick = async (movieId) => {
    if (selectedMovie && selectedMovie.id === movieId) {
      setSelectedMovie(null);
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8086/movie/getById/${movieId}`
        );
        setSelectedMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <Navbar email={email} />
      <div
        className={`movies-container ${selectedMovie ? "blur-background" : ""}`}
      >
        <h1>Filmen</h1>
        <ul className="movies-list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <div
                onClick={() => handleMovieClick(movie.id)}
                className="movie-link"
              >
                <img
                  src={`http://localhost:8086/${movie.imgPath}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-title">{movie.title}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedMovie && (
        <div className="movie-modal">
          <div className="movie-modal-content">
            <img
              src={closeIcon}
              alt="Clos"
              className="close-sidebar-icon"
              onClick={handleClose}
            />
            <img
              src={`http://localhost:8086/${selectedMovie.imgPath}`}
              alt={selectedMovie.title}
              className="movie-modal-poster"
            />
            <div className="movie-modal-details">
              <h2 id="titleLevel">
                {selectedMovie.title} - {selectedMovie.level.levelName}
              </h2>
              <p className="movie-country">Country: {selectedMovie.country}</p>
              <p className="movie-level">
                Level: {selectedMovie.level.levelName}
              </p>
              <p className="movie-description">{selectedMovie.description}</p>

              <Link
                to={`/movie/${selectedMovie.id}`}
                className="play-button-modal"
              >
                Play
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MoviesList;
