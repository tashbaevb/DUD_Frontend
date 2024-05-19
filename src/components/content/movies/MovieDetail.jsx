import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './MovieDetail.css';  // Import the CSS file

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
{/* типа локально задал */}
  // useEffect(() => {
    // const fetchMovie = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:8086/movie/getById/${movieId}`);
    //     setMovie(response.data);
    //     if (response.data.filePath) {
    //       setVideoSrc(`http://localhost:8086${response.data.filePath}`);
    //     } else {
    //       setVideoSrc("https://media.w3.org/2010/05/sintel/trailer_hd.mp4");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching movie details:", error);
    //     setVideoSrc("https://media.w3.org/2010/05/sintel/trailer_hd.mp4");
    //   }
    // };

  //   fetchMovie();

  //   const fallbackTimer = setTimeout(() => {
  //     if (!videoSrc) {
  //       setVideoSrc("https://media.w3.org/2010/05/sintel/trailer_hd.mp4");
  //     }
  //   }, 5 * 60 * 1000); // 5 minutes in milliseconds

  //   return () => clearTimeout(fallbackTimer);
  // }, [movieId]);

  // if (!movie) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="video-container">
      <video controls className="video-player">
        <source
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default MovieDetail;
