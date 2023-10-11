import { useState } from "react";
import "./App.css";
import searchMovie from "./Services/fetchService";
import Nav from "./components/Nav";
import SearchPanel from "./components/SearchPanel";
import Pagination from "./components/Pagination";
import Movies from "./components/Movies";

function App() {
  const [totalResult, setTotalResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [query, setQuery] = useState(null);
  async function submitSearch(event) {
    try {
      event.preventDefault();

      const searchString = event.target.elements.search.value;
      setQuery(searchString);
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
      <SearchPanel
        totalResult={totalResult}
        submitSearch={submitSearch}
      ></SearchPanel>

      <div className="container">
        <div className="row">
          {movies.length > 0 ? (
            <Movies movies={movies} />
          ) : (
            <span>No result</span>
          )}
        </div>
      </div>
      <Pagination
        handlePagination={handlePagination}
        currentPage={currentPage}
        pagination={pagination}
      ></Pagination>
    </div>
  );
}

export default App;