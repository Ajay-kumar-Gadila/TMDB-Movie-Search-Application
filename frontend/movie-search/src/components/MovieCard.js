import { NavLink } from "react-router-dom";

export default function MovieCard({ movie }) {
  const publicImageURL = "https://www.themoviedb.org/t/p/w440_and_h660_face/";

  return (
    <>
      <NavLink to={`/movie/${movie.id}`}>
        <div class="card float-right">
          <div class="row">
            <div class="col-sm-5">
              <img
                src={`${publicImageURL}${movie.backdrop_path}`}
                class="card-img-top"
                alt="..."
              />
            </div>
            <div class="col-sm-7">
              <div class="row">
                <p class="title">{movie.original_title}</p>
                <p class="rating">
                  Rating <span>{movie.overview}</span>
                </p>
                <p class="release">
                  {new Date(movie.release_date).toLocaleDateString("us-EN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
}
