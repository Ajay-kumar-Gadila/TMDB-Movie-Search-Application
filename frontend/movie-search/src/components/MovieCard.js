import { NavLink } from "react-router-dom";

export default function MovieCard({ movie }) {
  const publicImageURL = "https://www.themoviedb.org/t/p/w440_and_h660_face/";

  return (
    <>
      <NavLink to={`/movie/${movie.id}`}>
       
        <div className="col-md-4 mb-3">
        <div className="movieCard">
          <img
            src={`${publicImageURL}${movie.backdrop_path}`}
            className="card-img-top"
            alt="..."
          />
          <div className="movie-info">
            <p className="title">{movie.original_title}</p>
            <p className="rating">
              Rating <span>{movie.vote_average}</span>
            </p>
            <p className="release">
              {new Date(movie.release_date).toLocaleDateString("us-EN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
      </NavLink>
    </>
  );
}