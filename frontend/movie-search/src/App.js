import { useState } from "react";
import "./App.css";
import searchMovie from "./Services/fetchService";

import Pagination from "./components/Pagination";
import Movies from "./components/Movies";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import TrendingToday from './components/TrendingToday';
import TrendingWeek from './components/TrendingWeek';
import ToggleButton from './components/ToggleButton';

function App() {
  const [totalResult, setTotalResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    submitSearch(query);
  }, []);
  async function submitSearch(searchString) {
    try {
      const response = await searchMovie(searchString);
      handleResponse(response);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handlePagination(event, pageNum) {
    try {
      event.preventDefault();
      const response = await searchMovie(query, pageNum);
      handleResponse(response);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleResponse(response) {
    const movies = response.results.filter(
      (movie) => movie.backdrop_path !== null
    );
    setMovies(movies);
    setTotalResult(response.total_results);
    setCurrentPage(response.page);
    setPagination(generatePagination(response.total_pages));
  }

  function generatePagination(N) {
    return Array.from({ length: N }, (_, index) => index + 1);
  }
  

  return (
    <div>
      <Nav></Nav>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Movies
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
          </div>
          <div className="col-9">
            <div className="row">
              {movies.length > 0 ? (
                <Movies movies={movies} />
              ) : (
                <span>No result</span>
              )}
            </div>

            <div className="row">
              <Pagination
                handlePagination={handlePagination}
                currentPage={currentPage}
                pagination={pagination}
              ></Pagination>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;