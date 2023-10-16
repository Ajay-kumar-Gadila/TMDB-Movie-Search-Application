import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from "../Services/fetchService";
import TrendingMovieCard from './TrendingMovieCard'; // Import the TrendingMovieCard component

function TrendingToday() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <div className="card-container custom-trending-cards">
        {trendingMovies.map((movie) => (
          <TrendingMovieCard movie={movie} key={movie.id} /> 
        ))}
      </div>
    </div>
  );
}

export default TrendingToday;
