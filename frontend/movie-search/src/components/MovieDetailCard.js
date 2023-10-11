import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useParams, Link } from "react-router-dom"; 
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
                <Link to={`/actor/${actor.id}`} key={actor.id}>
                  <CastCard actor={actor} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
