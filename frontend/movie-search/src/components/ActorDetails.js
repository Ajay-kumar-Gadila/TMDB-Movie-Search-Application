import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActorDetails = () => {
  const { actorId } = useParams();
  const [actorData, setActorData] = useState({});

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/actor-details/${actorId}`
        );
        setActorData(response.data);
      } catch (error) {
        console.error("Error fetching actor details:", error);
      }
    };

    fetchActorDetails();
  }, [actorId]);

  return (
    <div className="actor-details">
      <div class="actor-card">
        <h2>Actor Details</h2>
        <img
          src={`https://image.tmdb.org/t/p/w200${actorData.profile_path}`}
          alt={`${actorData.name}'s profile`}
          className="actor-image"
        />
        <p>
          <span class="property-label">Name:</span> {actorData.name}
        </p>
        <p>
          <span class="property-label">Biography:</span> {actorData.biography}
        </p>
        <p>
          <span class="property-label">Birthday:</span> {actorData.birthday}
        </p>
        <p>
          <span class="property-label">Gender:</span> {actorData.gender}
        </p>
        <p>
          <span class="property-label">Popularity:</span> {actorData.popularity}
        </p>
        <p>
          <span class="property-label">FullName:</span>{" "}
          {actorData.also_known_as}
        </p>
      </div>
    </div>
  );
};

export default ActorDetails;
