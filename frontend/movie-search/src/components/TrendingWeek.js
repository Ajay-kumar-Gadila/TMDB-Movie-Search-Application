import { useEffect, useState } from "react";
import { getTrendingWeekMovies } from "../Services/fetchService";
import TrendingWeekMovieCard from './TrendingWeekMovieCard';


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
    <div className="card-container custom-trending-cards">
  {trendingWeekMovies.map((movie) => (
    <TrendingWeekMovieCard movie={movie} key={movie.id} />
  ))}
</div>

  );
}

export default TrendingWeek;
