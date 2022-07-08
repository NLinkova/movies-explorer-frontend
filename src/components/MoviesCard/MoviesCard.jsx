import './MoviesCard.css';
import poster from '../../images/movies/movie-1.jpg';
import React from "react";
import {useLocation} from 'react-router-dom';

function MoviesCard({ card, userCards, saveMovie, deleteUserMovie }) {

//   const [isDeleteButton, setIsDeleteButton] = React.useState(false);
//   const [isSaved, setIsSaved] = React.useState(false);

//   const movie = {
//     country : props.movie.country || 'Не указано',
//     director: props.movie.director || 'Не указано',
//     duration: props.movie.duration || 0,
//     year: props.movie.year || 'Не указано',
//     description: props.movie.description || 'Не указано',
//     image: `${props.movie.image === null ? `${poster}` : `https://api.nomoreparties.co/beatfilm-movies${props.movie.image?.url}`}`,
//     trailer: props.movie?.trailerLink,
//     nameRU: props.movie.nameRU || 'Не указано',
//     nameEN: props.movie.nameEN || 'Не указано',
//     thumbnail: `${props.movie.image === null ? `${poster}` : `https://api.nomoreparties.co/beatfilm-movies${props.movie.image?.formats?.thumbnail?.url}`}`,
//     movieId: props.movie.id,
// }

// const image = `${props.movie.image === null ? `${poster}` : `https://api.nomoreparties.co/beatfilm-movies${props.movie.image?.url}`}`;
// const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
// const currentMovie = savedMovies.find((movie) => movie.nameRU === props.movie.nameRU);

// const location = useLocation();
//   function handleCardMouseOver() {
//     setIsDeleteButton(true);
//   }

//   function handleCardMouseOut() {
//     setIsDeleteButton(false);
//   }

//   function handleLikeButtonCLick() {
//     props.onMovieSave(movie);
//     setIsSaved(true);
//   }
//   function handleDisLike() {
//     setIsSaved(false);
//     props.onDeleteMovie(currentMovie._id);
// }

// function handleDeleteMovie() {
//     props.onDeleteMovie(props.movie._id);
//     setIsSaved(false);
// }

// React.useEffect(() => {
//   if(currentMovie) {
//     setIsSaved(true)
//   }

// }, [currentMovie, location])

let isUserMovie = false;
let userMovieId;

if (userCards) {
  isUserMovie = userCards.some((userCard) => {
    if (userCard.movieId === card.movieId) {
      userMovieId = userCard._id;
      return true;
    }
  });
}


  return (
      <li className="movies__list-item">
        <a href={card.trailer} className="movies__trailer-link">
          <img alt={card.nameRU} src={card.image ? card.image : poster} className="movies__list-poster"/>
        </a>
        <div className="movies__list-description">
          <p className="movies__list-title">{card.nameRU}</p>
          <button className={`movies__list-like-button
          ${
            card._id
              ? 'movies__list-delete-button_visible'
              : isUserMovie
              ? 'movies__list-like-button_clicked'
              : ''
          }`}
          onClick={() =>
            isUserMovie || card._id
              ? deleteUserMovie(card._id ? card._id : userMovieId)
              : saveMovie(card)
          } />
        </div>
        <p className="movies__list-duration">{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</p>
      </li>
      )

}

export default MoviesCard;