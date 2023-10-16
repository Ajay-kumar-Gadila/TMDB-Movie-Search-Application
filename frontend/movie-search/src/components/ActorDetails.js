import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_KEY = '31033d6c2cb5a93143ae48b27101f91d';

const ActorDetails = () => {
  const { actorId } = useParams();
  const [actorData, setActorData] = useState({});
  const [credits, setCredits] = useState([]);
  const [externalIds, setExternalIds] = useState({});
  const [imageId, setImageId] = useState({});
  const navigate = useNavigate(); // Get the navigate function

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

    const fetchExternalIds = async () => {
      try {
        const externalIdsResponse = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}/external_ids?api_key=${API_KEY}`
        );
        setExternalIds(externalIdsResponse.data);
      } catch (error) {
        console.error('Error fetching external IDs:', error);
      }
    };
    const fetchImages = async () => {
      try {
        const ImagesId = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}/person_id/images`
        );
        setImageId(ImagesId.data);
      }catch (error) {
        console.error('Error fetching external IDs:', error);
      }
    }

    fetchImages();

    fetchActorDetails();
    fetchCombinedCredits();
    fetchExternalIds();
  }, [actorId]);

  const top4Credits = credits.slice(0, 8);

  const handleCreditClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="actor-details">
      <div className="actor-card">
        <h2>Actor Details</h2>
        <img
          src={`https://image.tmdb.org/t/p/w200${actorData.profile_path}`}
          alt={`${actorData.name}'s profile`}
          className="actor-image"
        />
        <p>
          <span className="property-label">Name:</span> {actorData.name}
        </p>
        <p>
          <span className="property-label">Biography:</span> {actorData.biography}
        </p>
        <p>
          <span className="property-label">Birthday:</span> {actorData.birthday}
        </p>
        <p>
          <span className="property-label">Gender:</span> {actorData.gender}
        </p>
        <p>
          <span className="property-label">Popularity:</span> {actorData.popularity}
        </p>
        <p>
          <span className="property-label">Department : {actorData.known_for_department}</span>
        </p>
        <p>
          <span className="property-label">FullName:</span> {actorData.also_known_as}
        </p>
        <p>
          <span> <b>TMDB : {externalIds.imdb_id} </b>  </span>
        </p>
      </div>

      <h3>Also Acted in Movies</h3>
      <div className="credits">
        {top4Credits.map((credit) => (
          <div
            key={credit.id}
            className="credit-card"
            onClick={() => handleCreditClick(credit.id)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${credit.poster_path}`}
              alt={credit.title}
              className="credit-image"
            />
            <p>
              <span className="property-label">Title:</span> {credit.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorDetails;
