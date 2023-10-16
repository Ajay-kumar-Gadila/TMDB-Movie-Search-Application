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


  const top4Credits = credits.slice(0, 6);

  return (
    <>
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
  
      <h3>Also Acted in Movies</h3>
      <div className="credits">
        
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
};

export default ActorDetails;
