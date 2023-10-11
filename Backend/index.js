const express = require("express");
require("dotenv").config();
const cors = require("cors");
const fetchService = require("./fetch-service");
const app = express();
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
app.use(cors("http://localhost:3001/"));
// const fetchService = require('./fetch-service');

app.get("/find-movie", async (req, res) => {
  try {
    let query;
    let page = req.query.page ? req.query.page : 1;
    if (req.query.query == undefined) {
      throw new Error("No query found for the search.");
    }

    if (API_KEY == undefined) {
      throw new Error("<Local>: You must be granted a valid key.");
    }
    query = req.query.query;
    const response = await fetchService.fetchMovies(query, page);
    if (response.success == false) {
      throw new Error(response.status_message);
    }
    res.send(response);
  } catch (error) {
    res.statusCode = 422;
    res.send({ error: error.message, success: false });
  }
});

app.get("/movie-details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const response = await fetchService.fetchMoviesDetails(id);
    res.send(response);
  } catch (error) {
    res.statusCode = 422;
    res.send({ error: error.message, success: false });
  }
});

app.get("/actor-details/:id",async (req,res) => {
  try{
    let id = req.params.id;
    const response = await fetchService.fetchActorDetails(id);
    res.send(response);
  }
  catch (errro) {
    res.statuscode = 422;
    res.send({ error: error.message, success: false});
  }
});


// const port = 3000; // You can choose any available port
 // Import the fetch service

app.get('/day', async (req, res) => {
  try {
    const trendingMovies = await fetchService.fetchTrendingMovies();
    res.json({ trendingMovies });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/week', async (req, res) => {
  try {
    const trendingWeekMovies = await fetchService.fetchTrendingWeekMovies();
    res.json({ trendingWeekMovies });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


