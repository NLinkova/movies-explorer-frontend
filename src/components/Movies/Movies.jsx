import React, { useState, useEffect } from "react";
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import poster from "../../images/movies/default-movie.jpg"
const IMAGE_URL = 'https://api.nomoreparties.co';


function Movies(props) {

return (
  <div className="movies">
    <div className="movies__container">
    <SearchForm onSearchMovies={props.onSearchMovies} onShortMoviesCheck={props.onShortMoviesCheck} saved={false}
                   isChecked={props.isShortMoviesChecked} />
       <MoviesCardList movies={props.movies} isLoading={props.isLoading} notFound={props.notFound}
                       isErrorActive={props.isErrorActive} onMovieSave={props.onMovieSave}
                       onDeleteMovie={props.onDeleteMovie} saved={false} savedMovies={props.savedMovies}
                       isMobile={props.isMobile} isTablet={props.isTablet}/>
    </div>
  </div>
);
}

export default Movies;
