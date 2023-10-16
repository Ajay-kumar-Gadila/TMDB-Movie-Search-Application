import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TrendingMovieCard = ({ movie }) => {
  const publicImageURL = 'https://www.themoviedb.org/t/p/w440_and_h660_face/';
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="card custom-trending" onClick={() => handleMovieClick(movie.id)}>
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>Release Date: {movie.release_date}</p>
    </div>
  );
};

export default TrendingMovieCard;