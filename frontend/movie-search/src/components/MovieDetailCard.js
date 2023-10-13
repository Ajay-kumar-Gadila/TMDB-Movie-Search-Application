import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../Services/fetchService";
import CastCard from "./CastCard";
import CrewCard from "./CrewCard";
// import Recommendation from "./Recommendation";
import Recommendation from "./Recommendation";


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
            <h3 class="movie-title">
              {movieData.original_title} (
              {new Date(movieData.release_date).toLocaleDateString("us-EN", {
                year: "numeric",
              })}
              )
            </h3>
            <p> Released: {movieData.release_date} Ratings: PG-13 </p>
            <p class="genre">
              <b>Genre:</b>{" "}
              {movieData.genres &&
                movieData.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p>
            {`${Math.floor(Math.abs(movieData.vote_average) * 10)}%`}
            <i class="fa-solid fa-list"></i>
            <i class="fa-solid fa-heart" ></i>
            <i class="fa-regular fa-bookmark"></i>
            <i class="fa-solid fa-star"></i>

            </p>

            <p class="writer">
              <b>Vote Count:</b> {movieData.vote_count}
            </p>
           
            <p class="plot">
              <b>Plot:</b> {movieData.overview}
            </p>
            <p class="language">
              <b>Revenue </b> {movieData.revenue}
              <b> Vote Average </b> {`${Math.floor(Math.abs(movieData.vote_average) * 10)}%`}
            </p>
            <p class="language">
           
            </p>
            <p>
          <b>Director: </b> {getJobName("Director")}
          <b> Characters: </b> {getJobName("Characters")}
          <b> Writer: </b> {getJobName("Writer")}
          <b> Screenplay:</b> {getJobName("Screenplay")}
        </p>                                                             
          </div>
        </div>
      </div>
    
      <div className="cast">
        <h3>Top Billed Cast </h3>
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
      <h3>Recommendations</h3>
      <div className="recommendation-cards">
        {recommendations.map((recommendation) => (
          <div className="recommendation-card" key={recommendation.id}>
           
           <img
              src={`https://image.tmdb.org/t/p/w200${recommendation.poster_path}`}
              alt={recommendation.title}
            />
            <h4>{recommendation.title}</h4>
            
          </div>
        ))}
      </div>
    </div>

      <div class="container-fluid my-5 custom-footer">
        <footer class="bg-dark text-center text-white pb-3">
          <div class="container p-4 pb-0">
            <div class="container p-4 pb-0">
              <section class="mb-4">
                <a
                  class="btn btn-outline-light btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>

                <a
                  class="btn btn-outline-light btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i class="fab fa-twitter"></i>
                </a>

                <a
                  class="btn btn-outline-light btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i class="fab fa-google"></i>
                </a>

                <a
                  class="btn btn-outline-light btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i class="fab fa-instagram"></i>
                </a>

                <a
                  class="btn btn-outline-light btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i class="fab fa-linkedin-in"></i>
                </a>

                <a
                  class="btn btn-outline-light btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i class="fab fa-github"></i>
                </a>
              </section>
            </div>
          </div>

          <div class="text-center p-3 custom-copyright">
            © 2020 Copyright:
            <a class="text-white" href="https://mdbootstrap.com/">
              MDBootstrap.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
