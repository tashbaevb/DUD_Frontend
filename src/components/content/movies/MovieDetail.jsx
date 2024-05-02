import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/movie/getById/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Description: {movie.description}</p>
      <p>Country: {movie.country}</p>
      <p>Level: {movie.level.levelName}</p>
      <video controls>
        <source src={`http://localhost:8086${movie.filePath}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default MovieDetail;
