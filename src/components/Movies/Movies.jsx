import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Movies.css';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { screenSize, cardsCount } from "../../utils/definitionScreen";


function Movies({ isLogin }) {
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [movies, setMoviesList] = useState([]);
  const [renderedFilms, setRenderedFilms] = useState([]);
  const [countClickMoreFilms, setCountClickMoreFilms] = useState(1);
  const [visibilityMoviesList, setVisibilityMoviesList] = useState("");
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [visibilityBtnYet, setVisibilityBtnYet] = React.useState(
    "movies__more-button_invisible"
  );
  const [isShortFilms, setIsShortFilms] = React.useState(false);

  React.useEffect(() => {
      mainApi
        .getUserMovies()
        .then((savedMoviesData) => {
          if (savedMoviesData) {
            setSavedMovies(savedMoviesData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

  function filterMovies(films) {
    if (isShortFilms) {
      return films.filter((movie) => movie.duration <= 40);
    }
    return films.filter((movie) => movie.duration >= 40);
  }

  const filteredMovies = React.useMemo(
    () => filterMovies(movies),
    [isShortFilms, movies]
  );
  const filteredRenderedMovies = React.useMemo(
    () => filterMovies(renderedFilms),
    [isShortFilms, renderedFilms]
  );
  const filteredSavedMovies = React.useMemo(
    () => filterMovies(savedMovies),
    [isShortFilms, savedMovies]
  );

  React.useEffect(() => {
    if (filteredRenderedMovies.length > filteredMovies.length) {
      setVisibilityBtnYet("movies__button_hidden");
    }
  }, [filteredMovies, filteredRenderedMovies]);

  function countInitCards() {
    const width = screenSize();
    if (width >= 1280) {
      return 12;
    }
    if (width >= 757) {
      return 8;
    }
    return 5;
  }

  function handleMoreRenderFilms() {
    const cards = countInitCards();
    setRenderedFilms(
      filteredMovies.slice(0, cards + countClickMoreFilms * cardsCount())
    );
    setCountClickMoreFilms(countClickMoreFilms + 1);
  }

  function filterMoviesFromLS(moviesList) {
    const films = moviesList.filter((movie) =>
      movie.nameRU.includes(searchValue)
    );
    setMoviesList(() => {
      localStorage.setItem("foundFilms", JSON.stringify(films));
      return films;
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    if (searchValue === "") {
      setInputError("Нужно ввести ключевое слово");
      return;
    }
    setVisibilityMoviesList("");
    if (pathname === "/movies") {
      if (!localStorage.getItem("moviesList")) {
        moviesApi.getAllMovies()
          .then((moviesList) => {
            localStorage.setItem("moviesList", JSON.stringify(moviesList));
            filterMoviesFromLS(JSON.parse(localStorage.moviesList));
            setVisibilityMoviesList("movies_visibility");
            setVisibilityBtnYet("");
          })
          .catch((err) => console.log(err));
        return;
      }

      filterMoviesFromLS(
        localStorage.getItem("moviesList")
          ? JSON.parse(localStorage.moviesList)
          : []
      );
      setVisibilityMoviesList("movies_visibility");
      setVisibilityBtnYet("");
    } else {
      setSavedMovies(
        savedMovies.filter((movie) => movie.nameRU.includes(searchValue))
      );
      setVisibilityMoviesList("movies_visibility");
    }
  }

  function saveMovie(movie) {
      mainApi
        .saveMovie(movie)
        .then((dataMovie) => {
          setSavedMovies([dataMovie.data, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  function deleteMovie(movieId) {
      mainApi
        .deleteMovie(movieId)
        .then(() => {
          const newMovies = savedMovies.filter(
            (movie) => movie._id !== movieId
          );
          setSavedMovies(newMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }

return (
  <div className="movies">
    <div className="movies__container">
      <SearchForm
        page={'movies'}
        onSubmit={handleSearch}
        inputError={inputError}
        setInputError={setInputError}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isShortFilms={isShortFilms}
        setIsShortFilms={setIsShortFilms}
      />
      <MoviesCardList
        page={'movies'}
        visibilityMoviesList={visibilityMoviesList}
        renderedFilms={filteredRenderedMovies}
        setRenderedFilms={setRenderedFilms}
        handleMoreRenderFilms={handleMoreRenderFilms}
        countInitCards={countInitCards}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        savedMovies={filteredSavedMovies}
        setVisibilityMoviesList={setVisibilityMoviesList}
        visibilityBtnYet={visibilityBtnYet}
        setVisibilityBtnYet={setVisibilityBtnYet}
        // shortMoviesHandle={shortMoviesHandle}
        isShortFilms={isShortFilms}   />
    </div>
  </div>
);
}

export default Movies;
