import './MoviesCard.css';
import React, { useContext, useState, useEffect } from "react";
import poster from "../../images/movies/default-movie.jpg"
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import TooltipContext from '../../contexts/TooltipContext';
import { DEFAULT_MESSAGE, NO_CONNECTION_MESSAGE, MINUTS_IN_HOUR } from '../../constants/constants';

function MoviesCard({ movie }) {
  const [savedId, setSavedId] = useState('');
  const [saved, setSaved] = useState(false);
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);
  const location = useLocation();

  const { setTooltipMessage } = useContext(TooltipContext);
  function handleCardMouseOver() {
    setIsDeleteButtonVisible(true);
  }

  function handleCardMouseOut() {
    setIsDeleteButtonVisible(false);
  }

  const handleSetSaved = (evt) => {
    if (!saved) {
      const newMovie = {};
      const { image, id } = movie;
      Object.assign(newMovie, movie);
      delete newMovie.id;
      delete newMovie.created_at;
      delete newMovie.updated_at;

      //  Фильтр для заполнения отсутствующих значений в ответе от сервера фильмов
      Object.entries(newMovie).forEach((key) => {
        if (!key[1]) {
          newMovie[key[0]] = '...';
        }
      });
      mainApi.saveMovie({
        ...newMovie,
        image: `https://api.nomoreparties.co/${image.url}`,
        thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
        movieId: id,
      })
        .then((savedMovie) => {
          setSaved(true);
          setSavedId(savedMovie._id);
          let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
          if (!savedMovies) {
            savedMovies = [];
          }
          savedMovies.push(savedMovie);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        })
        .catch((err) => {
          if (err.status === 400) {
            setTooltipMessage(DEFAULT_MESSAGE);
          } else {
            setTooltipMessage(NO_CONNECTION_MESSAGE);
          }
        });
    } else {
      mainApi.deleteMovie(savedId)
        .then(() => {
          setSaved(false);
          const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
          // Поиск и удаление сохраненного фильма из массива в localStorage
          let index = 0;
          for (let i = 0; i < savedMovies.length; i += 1) {
            const film = savedMovies[i];
            if (film._id === movie._id) {
              index = i;
            }
          }
          savedMovies.splice(index, 1);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
          if (location.pathname === '/saved-movies') {
            evt.target.closest('.movies__list-item').remove();
          }
        })
        .catch(() => setTooltipMessage(NO_CONNECTION_MESSAGE));
    }
  };

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMovies) {
      savedMovies.forEach((savedMovie) => {
        if (savedMovie.movieId === movie.id || savedMovie._id === movie._id) {
          setSaved(true);
          setSavedId(savedMovie._id);
        }
      });
    }
  }, []);

   return (
    <li className="movies__list-item">
      <a href={movie.trailerLink}  className="movies__trailer-link" target="_blank" rel="noopener noreferrer">
        <img alt={movie.image.name} src={location.pathname === '/movies'
            ? `https://api.nomoreparties.co/${movie.image.url}`
            : movie.image} className="movies__list-poster"/>
      </a>
      <div className="movies__list-description" onMouseEnter={handleCardMouseOver} onMouseLeave={handleCardMouseOut}>
        <p className="movies__list-title">{movie.nameRU}</p>
        {location.pathname === '/saved-movies' ? (
        <button className={`movies__list-delete-button ${isDeleteButtonVisible ? 'movies__list-delete-button_visible' : ''}`}
          onClick={handleSetSaved}>
        </button>
         ) : (
        <button className={`movies__list-like-button ${saved ? 'movies__list-like-button_clicked' : '`movies__list-like-button'}`} onClick={handleSetSaved}>
        </button>
      )}
      </div>
      <p className="movies__list-duration">{`${Math.floor(movie.duration / MINUTS_IN_HOUR)}ч${movie.duration % MINUTS_IN_HOUR}м`}</p>
    </li>
  )
}

export default MoviesCard;