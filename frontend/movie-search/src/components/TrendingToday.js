import React from 'react'
import  { useEffect, useState } from 'react';
import { getTrendingMovies } from "../Services/fetchService"; 
const publicImageURL = "https://www.themoviedb.org/t/p/w440_and_h660_face/";

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
        <div >
        <div className="card-container">
          {trendingMovies.map((movie) => (
            <div className="card custom-trending" key={movie.id}>
             <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
              <h2>{movie.title}</h2>
              <p>Release Date: {movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
      
      );
}

export default TrendingToday;