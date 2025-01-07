import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'b873ec9e'; // Replace with your actual API key

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
      console.log('Search response:', response.data); // Debugging log
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('An error occurred while fetching the data.');
      setMovies([]);
    }
  };

  const handleMovieClick = async (imdbID) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
      console.log('Movie details response:', response.data); // Debugging log
      setSelectedMovie(response.data);
    } catch (err) {
      console.error('Error fetching movie details:', err);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <div className="error">{error}</div>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card" onClick={() => handleMovieClick(movie.imdbID)}>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.Title}</h2>
          <img
            src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/300'}
            alt={selectedMovie.Title}
          />
          <p><strong>Released:</strong> {selectedMovie.Released}</p>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p><strong>Director:</strong> {selectedMovie.Director}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
        </div>
      )}
    </div>
  );
};

export default App;
