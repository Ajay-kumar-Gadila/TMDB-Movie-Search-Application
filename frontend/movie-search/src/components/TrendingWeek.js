import React from "react";
import { useEffect, useState } from "react";
import { getTrendingWeekMovies } from "../Services/fetchService";
const publicImageURL = "https://www.themoviedb.org/t/p/w440_and_h660_face/";

function TrendingWeek() {
  const [trendingWeekMovies, setTrendingWeekMovies] = useState([]);

  useEffect(() => {
     async function fetchTrendingWeekMovies() {
      try {
        const movies = await getTrendingWeekMovies();
        setTrendingWeekMovies(movies);
      } catch (error) {
        console.error("Error fetching trending week movies:", error);
      }
    }

    fetchTrendingWeekMovies();
  }, []);
  return (
    <div>
      <div className="card-container">
        {trendingWeekMovies.map((movie) => (
          <div className="card custom-trending" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h2 className="movie-title">{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingWeek;
