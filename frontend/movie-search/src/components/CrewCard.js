import React from "react";

function CrewCard({ crewMember, job }) {
  return (
    <div className="card">
      <img
        src={`https://image.tmdb.org/t/p/w200${crewMember.profile_path}`}
        alt={crewMember.name}
        className="actor-image"
      />
      <p className="actor-name">{crewMember.name}</p>
      <p className="actor-job">{job}</p>
    </div>
  );
}

export default CrewCard;
