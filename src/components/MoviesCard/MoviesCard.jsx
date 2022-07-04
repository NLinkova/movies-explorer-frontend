import './MoviesCard.css';
import poster from '../../images/movies/movie-1.jpg';
import React from "react";

function MoviesCard(props) {

  const [isDeleteButton, setIsDeleteButton] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  function handleCardMouseOver() {
    setIsDeleteButton(true);
  }

  function handleCardMouseOut() {
    setIsDeleteButton(false);
  }

  function handleLikeButtonCLick() {
    setIsLiked(!isLiked);
  }
  return (
      <li className="movies__list-item">
        <img src={poster} alt="Обложка фильма" className="movies__list-poster"/>
        <div onMouseEnter={handleCardMouseOver} onMouseLeave={handleCardMouseOut} className="movies__list-description">
          <p className="movies__list-title">33 слова о дизайне</p>
          {props.saved ?
          <button className={`movies__list-delete-button ${isDeleteButton ? 'movies__list-delete-button_visible ' : ''}`}></button> :
          <button className={`movies__list-like-button ${isLiked ? 'movies__list-like-button_clicked' : ''}`} onClick={handleLikeButtonCLick}></button>}
        </div>
        <p className="movies__list-duration">1ч42м</p>
      </li>
      )

}

export default MoviesCard;