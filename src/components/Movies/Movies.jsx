import React, { useState, useEffect } from "react";
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { IMAGE_URL, IMAGE_DEFAULT } from "../../constants/constants";

function Movies({
  cards,
  userCards,
  runSearch,
  saveMovie,
  deleteUserMovie,
  isLoading,
  countMoviesToPage,
  handleCountMovies,
  searchTrigger,
  onSearch,
  onFilter,
  isShortMovie,
  textError,
  clearTextError,
}) {
  const newMoviesList = cards.map((movie) => {
    return {
      movieId: String(movie.id),
      nameRU: movie.nameRU ? movie.nameRU : 'Не указано название',
      nameEN: movie.nameEN ? movie.nameEN : 'Не указано название',
      country: movie.country ? movie.country : 'Не указана страна',
      director: movie.director ? movie.director : 'Не указан режиссер',
      year: movie.year ? movie.year : 'Не указан год',
      description: movie.description
        ? movie.description
        : 'Не указано описание',
      duration: movie.duration ? movie.duration : 'Не указано время',
      image: movie.image ? IMAGE_URL + movie.image.url : IMAGE_DEFAULT,
      trailer:
        movie.trailerLink
          ? movie.trailerLink
          : IMAGE_DEFAULT,
      thumbnail: movie.image
        ? IMAGE_URL + movie.image.formats.thumbnail.url
        : IMAGE_DEFAULT,
    };
  });
  return (
    <div className="movies">
      <div className="movies__container">
        <SearchForm
          page={'movies'}
          runSearch={runSearch}
          searchTrigger={searchTrigger}
          isShortMovie={isShortMovie}
          onFilter={onFilter}
        />
        <MoviesCardList
          page={'movies'}
          cards={newMoviesList}
          userCards={userCards}
          saveMovie={saveMovie}
          deleteUserMovie={deleteUserMovie}
          isLoading={isLoading}
          onSearch={onSearch}
          searchTrigger={searchTrigger}
          countMoviesToPage={countMoviesToPage}
          handleCountMovies={handleCountMovies}
          textError={textError}
          clearTextError={clearTextError}   />
      </div>
    </div>
  );
}

export default Movies;
