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

