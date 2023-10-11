import MovieCard from "./MovieCard";

export default function Movies({ movies }) {
  return movies.map((movie, index) => (
    <MovieCard key={index} movie={movie}></MovieCard>
  ));
}
