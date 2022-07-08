import './MoviesCard.css';
import React, { useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({   movie,
  cardName,
  cardDuration,
  postMovie,
  savedMovies,
  removeMovie,
  imageLink,
  trailerLink,}) {

    const { pathname } = useLocation();
    const currentUser = React.useContext(CurrentUserContext);

    const [favoriteMovie, setFavoriteMovie] = useState(false);
    const likeIcon = favoriteMovie
      ? "movies__list-like-button_clicked"
      : "movies__list-like-button";

    const cardIcon = pathname === "/movies" ? likeIcon : "movies__list-delete-button movies__list-delete-button_visible";

    function handleLikeMovie() {
      if (!favoriteMovie) {
        postMovie(movie);
        setFavoriteMovie(true);
      } else {
        const movieItem = savedMovies.filter(
          (savedMovie) => savedMovie.movieId === movie.id
        );
        removeMovie(movieItem[0]._id);
        setFavoriteMovie(false);
      }
    }

    function handleDeleteButton() {
      removeMovie(movie._id);
    }

    useEffect(() => {
      checkAddedCard();
    }, [savedMovies, pathname, currentUser]);

    function checkAddedCard() {
      if (savedMovies.length > 0) {
        if (savedMovies.length > 0) {
          if (!favoriteMovie) {
            setFavoriteMovie(
              savedMovies.some(
                (savedMovie) =>
                  savedMovie.movieId === movie.id &&
                  savedMovie.owner === currentUser._id
              )
            );
          }
        }
      }
    }

    const functionIcon =
      pathname === "/movies" ? handleLikeMovie : handleDeleteButton;


  return (
      <li className="movies__list-item">
        <a href={trailerLink || movie.trailer} className="movies__trailer-link">
          <img alt={cardName} src={imageLink} className="movies__list-poster"/>
        </a>
        <div className="movies__list-description">
          <p className="movies__list-title">{cardName}</p>
          <button
          className={cardIcon}
          type="button"
          onClick={() => {
            functionIcon();
          }}
        />
        </div>
        <p className="movies__list-duration">{`${Math.floor(cardDuration / 60)}ч ${cardDuration % 60}м`}</p>
      </li>
      )

}

export default MoviesCard;