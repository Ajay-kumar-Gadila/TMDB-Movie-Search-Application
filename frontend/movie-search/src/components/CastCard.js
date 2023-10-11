import React from "react";

function CastCard({ actor }) {
  return (
    <div className="cast-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
        alt={`${actor.name}'s profile`}
        className="actor-image"
      />
      <p>{actor.name}</p>
    </div>
  );
}

export default CastCard;
