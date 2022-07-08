import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import poster from '../../images/movies/movie-1.jpg';

function MoviesCardList({
  movies,
  visibilityMoviesList,
  renderedFilms,
  setRenderedFilms,
  handleMoreRenderFilms,
  countInitCards,
  postMovie,
  removeMovie,
  savedMovies,
  setVisibilityMoviesList,
  visibilityBtnYet,
  setVisibilityBtnYet,
}) {
  const { pathname } = useLocation();
  const [visibilityNotFound, setVisibilityNotFound] = useState("");

  React.useEffect(() => {
    const cards = countInitCards();

    if (pathname === "/saved-movies") {
      setVisibilityBtnYet("movies__more-button_invisible");
      setVisibilityNotFound("movies__not-found_invisible");
    } else {
      setVisibilityNotFound("");
    }

    if (
      localStorage.getItem("foundFilms") &&
      JSON.parse(localStorage.getItem("foundFilms")).length > 0
    ) {
      setVisibilityMoviesList("movies_visibility");
    }

    if (localStorage.getItem("foundFilms")) {
      setRenderedFilms(
        JSON.parse(localStorage.getItem("foundFilms")).slice(0, cards)
      );
    }
  }, [movies, setRenderedFilms, pathname, countInitCards, setVisibilityBtnYet]);

  return (
      <section className={`movies__card-list ${visibilityMoviesList}`}>
        {pathname === "/movies" ? (
        renderedFilms.length > 0 ? (
          ""
        ) : (
          <p className={`movies__not-found ${visibilityNotFound}`}>
            Ничего не найдено
          </p>
        )
      ) : savedMovies.length > 0 ? (
        ""
      ) : (
        <p className={`movies__not-found ${visibilityNotFound}`}>
          Ничего не найдено
        </p>
      )}
        <ul className="movies__list">
        {pathname === "/movies"
          ? renderedFilms.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id}
                cardName={movie.nameRU}
                cardDuration={movie.duration}
                imageLink={
                  movie.image
                    ? `https://api.nomoreparties.co${movie.image.url}`
                    : poster
                }
                trailerLink={movie.trailerLink}
                postMovie={postMovie}
                removeMovie={removeMovie}
                savedMovies={savedMovies}
              />
            ))
          : savedMovies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie._id}
                cardName={movie.nameRU}
                cardDuration={movie.duration}
                imageLink={
                  movie.image
                    ? movie.image
                    : poster
                }
                trailerLink={movie.trailerLink}
                postMovie={postMovie}
                removeMovie={removeMovie}
                savedMovies={savedMovies}
              />
            ))}
      </ul>
      {movies.length > renderedFilms.length || pathname !== "/saved-movies" ? (
        <button
          className={`movies__more-button ${visibilityBtnYet}`}
          type="button"
          onClick={handleMoreRenderFilms}
        >
          Ещё
        </button>
      ) : (
        ""
      )}
      </section>
  )
}

export default MoviesCardList;