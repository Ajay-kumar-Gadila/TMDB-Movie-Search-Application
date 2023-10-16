import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '31033d6c2cb5a93143ae48b27101f91d';

const ActorDetails = () => {
  const { actorId } = useParams();
  const [actorData, setActorData] = useState({});
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const actorResponse = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`
        );
        setActorData(actorResponse.data);
      } catch (error) {
        console.error('Error fetching actor details:', error);
      }
    };

    const fetchCombinedCredits = async () => {
      try {
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${API_KEY}&language=en-US`
        );
        setCredits(creditsResponse.data.cast);
      } catch (error) {
        console.error('Error fetching combined credits:', error);
      }
    };

    fetchActorDetails();
    fetchCombinedCredits();
  }, [actorId]);


  const top4Credits = credits.slice(0, 4);

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
        <span class="property-label">Department : {actorData.known_for_department}</span> 
      </p>
      <p>
        <span class="property-label">Character: {actorData.character}</span> 
      </p>
      <p>
        <span class="property-label">FullName:</span>{" "}
        {actorData.also_known_as}
      </p>
    </div>
  

      <div className="credits">
        <h2>Top 4 Credits</h2>
        {top4Credits.map((credit) => (
          <div key={credit.id} className="credit-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${credit.poster_path}`}
              alt={credit.title}
              className="credit-image"
            />
            <p>
              <span className="property-label">Title:</span> {credit.title}
            </p>
            {/* Add other details you want to display for each credit */}
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default ActorDetails;
