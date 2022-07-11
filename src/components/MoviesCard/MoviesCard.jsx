import './MoviesCard.css';
import React from "react";
import poster from "../../images/movies/default-movie.jpg"
import {useLocation} from 'react-router-dom';

function MoviesCard(props) {
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const movie = {
      country : props.movie.country || 'Не указано',
      director: props.movie.director || 'Не указано',
      duration: props.movie.duration || 0,
      year: props.movie.year || 'Не указано',
      description: props.movie.description || 'Не указано',
      image: `${props.movie.image === null ? `${poster}` : `https://api.nomoreparties.co${props.movie.image?.url}`}`,
      trailer: props.movie?.trailerLink,
      nameRU: props.movie.nameRU || 'Не указано',
      nameEN: props.movie.nameEN || 'Не указано',
      thumbnail: `${props.movie.image === null ? `${poster}` : `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`}`,
      movieId: props.movie.id,
  }

  const editedDuration = `${Math.trunc(movie.duration/60)}ч${movie.duration % 60}м`;
  const image = `${props.movie.image === null ? `${poster}` : `https://api.nomoreparties.co${props.movie.image?.url}`}`;
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const currentMovie = savedMovies.find((movie) => movie.nameRU === props.movie.nameRU);

  const location = useLocation();

  function handleCardMouseOver() {
      setIsDeleteButtonVisible(true);
  }

  function handleCardMouseOut() {
      setIsDeleteButtonVisible(false);
  }

  function handleLikeButtonCLick() {
          props.onMovieSave(movie);
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

  React.useEffect(() => {
      if(currentMovie) {
          setIsSaved(true)
      }

  }, [currentMovie, location])

  return (
      <li className="movies__list-item">
        <a href={props.saved ? props.movie.trailer : props.movie.trailerLink}  className="movies__trailer-link">
          <img alt={props.movie.nameRU} src={props.saved ? props.movie.image: poster} className="movies__list-poster"/>
        </a>
        <div className="movies__list-description">
          <p className="movies__list-title">{props.movie.nameRU}</p>
          <button
          className={`movies__list-like-button
          ${
            props.movie._id
              ? 'movies__list-like-button_clicked '
              : props.saved
              ? 'movies__list-delete-button'
              : ''
          }`}
            onClick={() =>
              props.saved || props.movie._id
                ? handleDeleteMovie(props.movie._id ? props.movie._id : props.saved)
                : handleLikeButtonCLick(props.movie._id)
            }
        />
        </div>
        <p className="movies__list-duration">{`${Math.floor(props.movie.duration / 60)}ч ${props.movie.duration % 60}м`}</p>
      </li>
      )

}

export default MoviesCard;