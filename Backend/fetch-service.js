const fetch = require("node-fetch");

https: module.exports = {
  fetchMovies: async function (movieName, page) {
    try {
      const url = `${process.env.THE_TMDB_URL}?api_key=${process.env.API_KEY}&query=${movieName}&page=${page}`;
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      const response = await fetch(url, options);
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Could not talk to data provider.");
    }
  },
  fetchMoviesDetails: async function (movieId) {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`;
    const fullInfoUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${process.env.API_KEY}`;
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    const allDetails = await Promise.all([
      await fetch(creditsUrl, options),
      await fetch(fullInfoUrl, options),
    ]);

    const cast_crew = await allDetails[0].json();
    const movieInfo = await allDetails[1].json();

    return { ...movieInfo, ...cast_crew };
  },
  fetchActorDetails: async function (actorId) {
    const personUrl = `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.API_KEY}`;
    const personInfoUrl = `https://api.themoviedb.org/3/movie/${actorId}?language=en-US&api_key=${process.env.API_KEY}`;
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    const allDetails = await Promise.all([
      await fetch(personUrl, options),
      await fetch(personInfoUrl, options),
    ]);

    const cast_details = await allDetails[0].json();
    const cast_info = await allDetails[1].json();
    return { ...cast_details, ...cast_info };
  },
  fetchTrendingMovies: async  function (dayId){
    const apiKey = `31033d6c2cb5a93143ae48b27101f91d`;
    const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    const fetchResponse = await fetch(apiUrl, options);

    if (fetchResponse.ok) {
      const responseJson = await fetchResponse.json();
      const trendingMovies = responseJson.results;
      return trendingMovies;
    } else {
      throw new Error('Failed to fetch data');
    }
  },
  
  fetchTrendingWeekMovies: async  function (dayId){
    const apiKey = `31033d6c2cb5a93143ae48b27101f91d`;
    const apiUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    const fetchResponse = await fetch(apiUrl, options);

    if (fetchResponse.ok) {
      const responseJson = await fetchResponse.json();
      const trendingMovies = responseJson.results;
      return trendingMovies;
    } else {
      throw new Error('Failed to fetch data');
    }
  }
 
};



