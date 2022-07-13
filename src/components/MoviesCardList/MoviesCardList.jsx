import './MoviesCardList.css';
import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const [initialCardsNumber, setInitialCardsNumber] = useState(() => {
    const windowSize = window.innerWidth;
    if(windowSize < 480) {
      return 5
    } else if(windowSize < 768) {
      return 8
    } else if(windowSize < 1279) {
      return 12
    } else if(windowSize > 1279) {
      return 12
    }
  });

  const [moreCardsNumber, setMoreCardsNumber] = useState(() => {
    const windowSize = window.innerWidth;
    if(windowSize < 480) {
      return 2;
    } else if(windowSize < 768) {
      return 2
    } else if(windowSize < 1279) {
      return 3
    } else if(windowSize > 1279) {
      return 4
    }
  });

  function handleScreenWidth () {
    const windowSize = window.innerWidth;
    if(windowSize < 480) {
      setInitialCardsNumber(5)
    } else if(windowSize < 768) {
      setInitialCardsNumber(8)
    } else if(windowSize < 1279) {
      setInitialCardsNumber(12)
    } else if(windowSize > 1279) {
      setInitialCardsNumber(12)
    }
  }

  const displayedMovies = props.movies?.slice(0, initialCardsNumber);

  function handleMoviesIncrease() {
    setInitialCardsNumber(prevState => {return prevState + moreCardsNumber});
  }

  useEffect(() => {
    window.addEventListener('resize', handleScreenWidth);
  }, []);

  return (
    <section className="movies__card-list">
      {props.isLoading ? (
        <Preloader />
      ) : props.isErrorActive ? (
        <span className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>
      ) : props.notFound ? (
          <span className="movies__not-found">Ничего не найдено</span>
      ) : props.saved && props.movies.length === 0 ? (
          <span className="movies__no-saved ">Вы пока что ничего не добавили в избранное</span>
      ) : ("")}
      <ul className="movies__list">
        {displayedMovies?.map(movie => {
          return (
            <MoviesCard movie={movie} key={props.saved ? movie.movieId : movie.id} saved={props.saved}
            onMovieSave={props.onMovieSave} onDeleteMovie={props.onDeleteMovie} savedMovies={props.savedMovies}/>
          )})
        }
      </ul>
      <button className={props.saved ? 'movies__more-button movies__more-button_invisible' :
        `movies__more-button ${props.movies?.length === displayedMovies?.length ? 'movies__more-button_invisible' : ''}`}
        onClick={handleMoviesIncrease}>Еще
      </button>
    </section>
  );
}

export default MoviesCardList;