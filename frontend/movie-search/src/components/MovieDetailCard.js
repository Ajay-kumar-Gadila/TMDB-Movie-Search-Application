import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../Services/fetchService";
import CastCard from "./CastCard";
import CrewCard from "./CrewCard";
import axios from 'axios';

const API_KEY = '31033d6c2cb5a93143ae48b27101f91d'; // Replace with your API key

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
      setImages(imagesResponse.data.posters); // You can change this to "backdrops" if you want to fetch backdrops
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
        <div className="main-movie-details-card">
          <div className="image-container">
            <img
              src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`}
              alt={movieData.title}
            />
          </div>
          <div className="image-text-related">
            <h3 className="movie-title">
              {movieData.original_title} (
              {new Date(movieData.release_date).toLocaleDateString("us-EN", {
                year: "numeric",
              })}
              )
            </h3>
            <p> Released: {movieData.release_date} Ratings: PG-13 </p>
            <p className="genre">
              <b>Genre:</b>{" "}
              {movieData.genres &&
                movieData.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="user-score">
              <p> Score: {`${Math.floor(Math.abs(movieData.vote_average) * 10)}%`}</p>
              <p>
                <i className="fa-solid fa-list"></i>
              </p>
              <p>
                <i className="fa-solid fa-heart"></i>
              </p>
              <p>
                <i className="fa-regular fa-bookmark"></i>
              </p>
              <p>
                <i className="fa-solid fa-star"></i>
              </p>
            </p>
            <p className="plot">
              <b>overview:</b> {movieData.overview}
            </p>
            <p className="language">
              <b>Revenue </b> {movieData.revenue}
            </p>
            <p className="user-score">
              <b>Director: </b> {getJobName("Director")}
              <b> Characters: </b> {getJobName("Characters")}
              <b> Writer: </b> {getJobName("Writer")}
              <b> Screenplay:</b> {getJobName("Screenplay")}
            </p>
          </div>
        </div>
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
      
      {/* Display movie recommendations */}
      <div className="cast">
        <h3>Recommendations</h3>
        <div className="cast-cards">
          {recommendations.slice(0,6).map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="recommendation-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>
                  <span className="property-label">Title:</span> {movie.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Display videos */}
      <div className="cast">
        <h3>Videos</h3>
        <div className="cast-cardss">
          {videos.slice(0,2).map((video) => (
            <div key={video.id}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p>
                <span className="property-label">Title:</span> {video.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Display images */}
      <div className="casts">
  <h3>Images</h3>
  <div className="image-cards-container" style={{ display: 'flex', gap: '60px', justifyContent: 'center' }}>
    {images.slice(0, 4).map((image) => (
      <img
        key={image.file_path}
        src={`https://image.tmdb.org/t/p/original${image.file_path}`}
        alt="Movie"
      />
    ))}
  </div>
</div>



      <div className="reviews">
        <h3>Reviews</h3>
        <div className="review-cards">
          {reviews.slice(0,1).map((review) => (
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
