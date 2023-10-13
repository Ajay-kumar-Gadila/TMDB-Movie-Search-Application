import React, { useEffect, useState } from "react";
import { getRecommendations } from "../Services/fetchService";

function Recommendation({ movieId, onRecommendationsReceived }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, [movieId]);

  async function fetchRecommendations() {
    try {
      const data = await getRecommendations(movieId);
      setRecommendations(data.results);
      onRecommendationsReceived(data.results); // Call the callback function
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  }

  return (
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
  );
}

export default Recommendation;
