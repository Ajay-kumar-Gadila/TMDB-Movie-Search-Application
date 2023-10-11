export default async function searchMovie(movieName, page = 1) {
  const host = "http://localhost:3000/find-movie";
  try {
    const url = `${host}?query=${movieName}&page=${page}`;
    const response = await fetch(url);
    const res = await response.json();
    if (res.success === false) {
      throw new Error(res.error);
    }
    console.log(res);
    if (res.results.length === 0) {
      throw new Error("Nothing found with that query");
    }
    return res;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getMovieDetails(movieId) {
  try {
    if (!movieId) {
      throw new Error("Movie id is invalid");
    }
    const url = `http://localhost:3000/movie-details/${movieId}`;
    const response = await fetch(url);
    const res = await response.json();
    if (res.success === false) {
      throw new Error(res.error);
    }
    console.log(res);
    if (!res) {
      throw new Error("Nothing found with that query");
    }
    return res;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getActorDetails(actorId) {
  try {
    if (!actorId) {
      throw new Error("Actor id is invalid");
    }
    const url = `http://localhost:3000/actor-details/${actorId}`;
    const response = await fetch(url);
    const res = await response.json();
    if (res.success === false) {
      throw new Error(res.error);
    }
    console.log(res);
    if (!res) {
      throw new Error("Nothing found with that query");
    }
    return res;
  } catch (error) {
    throw Error(error.message);
  }
}
