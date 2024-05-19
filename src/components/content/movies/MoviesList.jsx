import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import './MoviesList.css';  // Import the CSS file

function MoviesList() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      country: "USA",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterUrl: "https://example.com/inception.jpg",
      level: { levelName: "Advanced" }
    }
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [email, setEmail] = useState("example@example.com");

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

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie.id === selectedMovie?.id ? null : movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <Navbar email={email} />
      <div className={`movies-container ${selectedMovie ? 'blur-background' : ''}`}>
        <h2>Movies List</h2>
        <ul className="movies-list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <div onClick={() => handleMovieClick(movie)} className="movie-link">
                <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
                <div className="movie-details">
                  <h3 className="movie-title">{movie.title}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedMovie && (
        <div className="movie-modal">
          <div className="movie-modal-content">
            <button className="close-button" onClick={handleClose}>×</button>
            <img src={selectedMovie.posterUrl} alt={selectedMovie.title} className="movie-modal-poster" />
            <div className="movie-modal-details">
              <h2>{selectedMovie.title}</h2>
              <p className="movie-country">Country: {selectedMovie.country}</p>
              <p className="movie-description">{selectedMovie.description}</p>
              {selectedMovie.level && <p className="movie-level">Level: {selectedMovie.level.levelName}</p>}
              <Link to={`/movie/play/${selectedMovie.id}`} className="play-button-modal">▶ Play</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoviesList;
