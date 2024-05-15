import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/Navbar";

function MoviesList() {
  const [movies, setMovies] = useState([]);
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

  return (
    <div>
      <Navbar email={email} />
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
