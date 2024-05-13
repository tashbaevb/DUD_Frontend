import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/Navbar";

function MoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8086/movie/getAll");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Movies List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <h3>{movie.title}</h3>
            </Link>
            <p>Country: {movie.country}</p>
            <p>{movie.description}</p>
            {movie.level && <p>Level: {movie.level.levelName}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;
