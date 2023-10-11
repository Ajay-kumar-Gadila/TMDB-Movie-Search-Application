import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import MovieDetailCard from "./components/MovieDetailCard";
// import NewMovieDetailCard from "./components/NewMovieDetailCard";
import ActorDetails from "./components/ActorDetails"; // Correct the import path
import Home from "./components/Home";


ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}> </Route>
      <Route path="/search/:query" element={<App />} />
      <Route path="/movie/:id" element={<MovieDetailCard />} />
      {/* <Route path="/new-movie/:id" element={<NewMovieDetailCard />} /> */}
      <Route path="/actor/:actorId" element={<ActorDetails />} /> {/* Correct the parameter name */}
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
