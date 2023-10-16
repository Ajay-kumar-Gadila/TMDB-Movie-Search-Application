import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import MovieDetailCard from "./components/MovieDetailCard";
import ActorDetails from "./components/ActorDetails"; 
import Home from "./components/Home";



ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}> </Route>
      <Route path="/search/:query" element={<App />} />
      <Route path="/movie/:id" element={<MovieDetailCard />} />
      <Route path="/actor/:actorId" element={<ActorDetails />} /> 
      <Route path="/trending-week/:id" element={<MovieDetailCard />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);