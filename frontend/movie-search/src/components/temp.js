{/* <div className="card">
<h2>Movie Details</h2>
<p>Title: {movieData.title}</p>
<p>Release Date: {movieData.releaseDate}</p>

<div className="cast">
  <h3>Cast</h3>
  <div className="cast-cards">
    {movieData.cast &&
      movieData.cast.map((actor) => (
        <CastCard key={actor.id} actor={actor} />
      ))}
  </div>
</div>

<div className="crew">
  <h3>Crew</h3>
  <div className="crew-cards">
    {movieData.crew &&
      movieData.crew.map((crewMember) => (
        <CrewCard key={crewMember.id} crewMember={crewMember} />
      ))}
  </div>
</div>
</div> */}


import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../Services/fetchService";
import CastCard from "./CastCard";
import CrewCard from "./CrewCard";

export default function MovieDetailCard() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let data = await getMovieDetails(id);
    setMovieData(data);
  }

  return (
    <>
      <Nav />
      <div className="InnerCards">
      
      <div className="Info">
        <h2>Movie Details</h2>
        <p>Title: {movieData.title}</p>
        <p>Release Date: {movieData.releaseDate}</p>
        </div>
        <div className="cast">
          <h3>Cast</h3>
          <div className="cast-cards">
            {movieData.cast &&
              movieData.cast.slice(0, 3).map((actor) => (
                <CastCard key={actor.id} actor={actor} />
              ))}
          </div>
        </div>

        {/* <div className="crew">
          <h3>Crew</h3>
          <div className="crew-cards">
            {movieData.crew &&
              movieData.crew.map((crewMember) => (
                <CrewCard key={crewMember.id} crewMember={crewMember} />
              ))}
          </div>
        </div> */}
      </div>
    </>
  );
}
















































































import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../Services/fetchService";
import CastCard from "./CastCard";
import axios from 'axios';

const API_KEY = 'your_api_key'; // Replace with your API key

export default function MovieDetailCard() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchData();
    fetchRecommendations(id);
    fetchVideos(id);
    fetchImages(id);
    fetchReviews(id);
  }, [id]);

  async function fetchData() {
    let data = await getMovieDetails(id);
    setMovieData(data);
  }

  async function fetchRecommendations(movieId) {
    try {
      const recommendationsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );
      setRecommendations(recommendationsResponse.data.results);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  }

  async function fetchVideos(movieId) {
    try {
      const videosResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
      );
      setVideos(videosResponse.data.results);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  async function fetchImages(movieId) {
    try {
      const imagesResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`
      );
      setImages(imagesResponse.data.posters);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  async function fetchReviews(movieId) {
    try {
      const reviewsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );
      setReviews(reviewsResponse.data.results);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  function getJobName(job) {
    if (movieData.crew && movieData.crew.length > 0) {
      const crewMember = movieData.crew.find((member) => member.job === job);
      return crewMember ? crewMember.name : "Not available";
    } else {
      return "Crew information not available";
    }
  }

  return (
    <>
      <Nav />
      <div className="container-fluid">
        {/* ... Other movie details ... */}
      </div>

      <div className="cast">
        <h3>Top Billed Cast</h3>
        <div className="cast-cards">
          {movieData.cast &&
            movieData.cast.slice(0, 6).map((actor) => (
              <Link to={`/actor/${actor.id}`} key={actor.id}>
                <CastCard actor={actor} />
              </Link>
            ))}
        </div>
      </div>
      
      <div className="recommendations">
        <h3>Recommended Movies</h3>
        <div className="recommendation-cards">
          {recommendations.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="recommendation-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="videos">
        <h3>Videos</h3>
        <div className="video-cards">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              <p>
                <span className="property-label">Name:</span> {video.name}
              </p>
              <p>
                <span className="property-label">Type:</span> {video.type}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="images">
        <h3>Images</h3>
        <div className="image-cards">
          {images.map((image, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w200${image.file_path}`}
              alt={`Image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="reviews">
        <h3>Reviews</h3>
        <div className="review-cards">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p>
                <span className="property-label">Author:</span> {review.author}
              </p>
              <p>
                <span className="property-label">Content:</span> {review.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
