import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQ0YjM3M2U2MmY2Yjc1N2I5NDdjZDhjZWQxN2Q0OCIsIm5iZiI6MTcyNjUzNjAxOS40MjY5MjgsInN1YiI6IjY2ZGZjMmE2YTljYTIwMzE0OWYxYmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GXJQ2-lqw2TVBb73qAPasG3PuF0kPVXwcZQExh2omp8' 
    }
  };

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
        options
      );
      setMovies(response.data.results);
      setShowResults(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleClickOutside = (event) => {
    if (resultsRef.current && !resultsRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-5 p-5 rounded-lg shadow-lg bg-gray-700/50">
      <form onSubmit={handleSubmit} className="flex justify-center mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="p-2 w-3/4 border border-gray-300 rounded-md text-base"
        />
        <button type="submit" className="p-2 ml-3 bg-green-600 text-white rounded-md hover:bg-green-700 text-base">
          Search
        </button>
      </form>
      {showResults && (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" ref={resultsRef}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                className="bg-white rounded-md overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                key={movie.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto"
                />
                <h3 className="text-black text-lg font-semibold my-2 px-2">{movie.title}</h3>
                <p className="text-gray-600 text-sm px-2 pb-2">{movie.overview}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
