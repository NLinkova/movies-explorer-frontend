import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import searchFilter from '../../utils/searchFilter';
import { MOVVIES_MESSAGE, NOT_FOUND_MESSAGE } from '../../constants/constants';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const filter = (query, shorts) => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    const filtered = searchFilter(storedMovies, query, shorts);
    if (filtered.length === 0) {
      setErrorMessage(NOT_FOUND_MESSAGE);
    }
    setMovies(filtered);
    setLoading(false);
  };

  const handleSearch = (query, shorts) => {
    setLoading(true);
    setErrorMessage('');

    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (!storedMovies) {
      moviesApi.getAllMovies()
        .then((films) => {
          localStorage.setItem('movies', JSON.stringify(films));
          filter(query, shorts);
        })
        .catch(() => {
          setErrorMessage(MOVVIES_MESSAGE);
        });
    } else {
      filter(query, shorts);
    }
  };

  useEffect(() => {
    const savedMovies = localStorage.getItem('savedMovies');
    if (!savedMovies) {
      setLoading(true);
      mainApi.getUserMovies()
        .then((films) => {
          if (films.length > 0) {
            localStorage.setItem('savedMovies', JSON.stringify(films));
          }
          setLoading(false);
        })
        .catch(() => {
          setErrorMessage(MOVVIES_MESSAGE);
        });
    }
  }, []);

  return (
    <div className="movies">
      <div className="movies__container">
      <SearchForm handleSearch={handleSearch} />
      {loading
        ? <Preloader />
        : <MoviesCardList movies={movies} errorMessage={errorMessage} />}
      </div>
    </div>
  );
}

export default Movies;
