import React, { useState, useEffect, useContext } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import searchFilter from '../../utils/searchFilter';
import TooltipContext from '../../contexts/TooltipContext';
import { NO_CONNECTION_MESSAGE, NOT_FOUND_MESSAGE, EMPTY_LIST_MESSAGE } from '../../constants/constants';
import './SavedMovies.css';

function SavedMovies() {
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setTooltipMessage } = useContext(TooltipContext);

  const handleSearch = (query, isShort) => {
    setLoading(true);
    setErrorMessage('');
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const filtered = searchFilter(savedMovies, query, isShort);

    if (filtered.length === 0) {
      setErrorMessage(NOT_FOUND_MESSAGE);
    }
    setMovies(filtered);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    mainApi.getUserMovies()
      .then((savedMovies) => {
        const user = localStorage.getItem('userId');
        const ownMovies = savedMovies.filter((film) => film.owner === user);
        localStorage.setItem('savedMovies', JSON.stringify(ownMovies));
        setLoading(false);
        if (savedMovies.length === 0) {
          setErrorMessage(EMPTY_LIST_MESSAGE);
        }
      })
      .catch(() => setTooltipMessage(NO_CONNECTION_MESSAGE));
  }, []);

  return (
    <section className="saved-movies">
      <SearchForm
        handleSearch={handleSearch}
      />
      {loading
        ? <Preloader />
        : <MoviesCardList movies={movies} errorMessage={errorMessage} />}
    </section>
  )
}

export default SavedMovies;