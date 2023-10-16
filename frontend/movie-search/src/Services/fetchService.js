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

export async function getRecommendations(recomId) {
  try {
    if (!recomId) {
      throw new Error("Movie id is invalid ");
    }
    const url = `http://localhost:3000/Recommedations/${recomId}`;
    const response = await fetch(url);
    const res = await response.json();
    if(res.succes === false) {
      throw new Error("Nothing found with query");
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

export async function getMovieReview(reviewId) {
  try {
    if (!reviewId) {
      throw new Error("Review id is invalid");
    
    }
    const url = `http://localhost:3000/actor-details/${reviewId}`;
    const response = await fetch(url);
    const res = await response.json();
    if (res.success ===  false) {
      throw new Error("Nothing found with that query ");

    } 
    return res;

  }
  catch (error) {
    throw Error(error.message);
  }
}

export async function getTrendingMovies() {
  try {
    const url = "http://localhost:3000/day";
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    if (!data.trendingMovies || data.trendingMovies.length === 0) {
      throw new Error("No trending movies found");
    }

    return data.trendingMovies;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getTrendingWeekMovies() {
  try {
    const url = "http://localhost:3000/week"; // Replace with your API key
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    if (!data.trendingWeekMovies || data.trendingWeekMovies.length === 0) {
      throw new Error("No trending week movies found");
    }

    return data.trendingWeekMovies;
  } catch (error) {
    throw new Error(error.message);
  }
}