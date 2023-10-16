
import React from 'react';

const RecommendationCard = ({ recommendation }) => {
  return (
    <div className="recommendation-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${recommendation.poster_path}`}
        alt={recommendation.title}
      />
      <h4>{recommendation.title}</h4>
      <p>{recommendation.release_date}</p>
    </div>
  );
};

export default RecommendationCard;
