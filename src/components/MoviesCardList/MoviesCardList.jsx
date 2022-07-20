import "./MoviesCardList.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import {
  MAX_MOVIES_1280,
  MAX_MOVIES_768,
  MAX_MOVIES_1000,
  MAX_MOVIES_DEFAULT,
  MAX_MOVIES_STEP_1280,
  MAX_MOVIES_STEP_1000,
  MAX_MOVIES_STEP_DEFAULT,
} from "../../constants/constants";

function MoviesCardList({ movies, errorMessage }) {
  const [maxMovies, setMaxMovies] = useState(0);
  const [step, setStep] = useState(0);
  const location = useLocation();

  const showMoreMovies = () => {
    setMaxMovies(maxMovies + step);
  };

  const setCardsTemplate = () => {
    const width = window.innerWidth;
    if (location.pathname === "/saved-movies") {
      setMaxMovies(movies.length);
    }

    if (width <= 720) {
      setMaxMovies(MAX_MOVIES_DEFAULT);
      setStep(MAX_MOVIES_STEP_DEFAULT);
    } else if (width <= 1000) {
      setMaxMovies(MAX_MOVIES_768);
      setStep(MAX_MOVIES_STEP_DEFAULT);
    } else if (width <= 1279) {
      setMaxMovies(MAX_MOVIES_1280);
      setStep(MAX_MOVIES_STEP_1000);
    } else {
      setMaxMovies(MAX_MOVIES_1280);
      setStep(MAX_MOVIES_STEP_1280);
    }
  };

  useEffect(() => {
    setCardsTemplate();
    window.addEventListener("resize", () => {
      setTimeout(() => {
        setCardsTemplate();
      }, 500);
    });
  }, []);

  return (
    <section className="movies__card-list">
      {errorMessage ? (
        <span className="movies__error">{errorMessage}</span>
      ) : (
        <ul className="movies__list">
          {movies.map((movie, index) => {
            if (index < maxMovies) {
              return (
                <MoviesCard key={movie.id || movie.movieId} movie={movie} />
              );
            }
            return null;
          })}
        </ul>
      )}
      {movies.length > maxMovies && location.pathname !== "/saved-movies" && (
        <button className="movies__more-button" onClick={showMoreMovies}>
          More
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
