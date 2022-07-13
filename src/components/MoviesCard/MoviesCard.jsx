import './MoviesCard.css';
import React, { useState, useEffect } from "react";
import poster from "../../images/movies/default-movie.jpg"
import { useLocation } from 'react-router-dom';
import { CurrentUserContext} from "../../contexts/CurrentUserContext";

function MoviesCard(props) {
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const movie = {
    country : props.movie.country || 'Не указано',
    director: props.movie.director || 'Не указано',
    duration: props.movie.duration || 0,
    year: props.movie.year || 'Не указано',
    description: props.movie.description || 'Не указано',
    image: props.movie.image ? `https://api.nomoreparties.co${props.movie.image?.url}` : poster,
    trailerLink: props.movie?.trailerLink,
    nameRU: props.movie.nameRU || 'Не указано',
    nameEN: props.movie.nameEN || 'Не указано',
    thumbnail: props.movie.image ? `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}` : poster,
    movieId: props.movie.id,
  }


  const image = props.movie.image ? `https://api.nomoreparties.co${props.movie.image?.url}` : poster;
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const currentMovie = savedMovies.find((movie) => movie.movieId  === props.movie.movieId );

  const location = useLocation();

  function handleCardMouseOver() {
    setIsDeleteButtonVisible(true);
  }

  function handleCardMouseOut() {
    setIsDeleteButtonVisible(false);
  }

  function handleLikeButtonCLick() {
    props.onMovieSave(movie);
    console.log(movie)
    setIsSaved(true);
  }

  function handleDisLike() {
    setIsSaved(false);
    console.log(currentMovie)
    props.onDeleteMovie(currentMovie._id);
  }

  function handleDeleteMovie() {
    props.onDeleteMovie(props.movie._id);
    setIsSaved(false);
  }

  useEffect(() => {
    if(currentMovie) {
      setIsSaved(true)
    } else {
      setIsSaved(false)
    }
  }, [currentMovie, location])


  return (
    <li className="movies__list-item">
      <a href={props.saved ? props.movie.trailer : props.movie.trailerLink}  className="movies__trailer-link" target="_blank"
            rel="noopener noreferrer">
        <img alt={props.movie.nameRU} src={props.saved ? props.movie.image : image} className="movies__list-poster"/>
      </a>
      <div className="movies__list-description" onMouseEnter={handleCardMouseOver} onMouseLeave={handleCardMouseOut}>
        <p className="movies__list-title">{props.movie.nameRU}</p>
        {props.saved ?
        <button className={`movies__list-delete-button ${isDeleteButtonVisible ? 'movies__list-delete-button_visible' : ''}`}
          onClick={handleDeleteMovie}>
        </button> :
        <button className={`movies__list-like-button ${isSaved ? 'movies__list-like-button_clicked' : ''}`} onClick={isSaved ? handleDisLike : handleLikeButtonCLick}></button>}
      </div>
      <p className="movies__list-duration">{`${Math.floor(props.movie.duration / 60)}ч ${props.movie.duration % 60}м`}</p>
    </li>
  )
}

export default MoviesCard;