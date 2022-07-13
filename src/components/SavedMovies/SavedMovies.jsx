import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <section className="saved-movies">
      <SearchForm onSearchSavedMovies={props.onSearchSavedMovies} saved={true} onShortMoviesCheck={props.onShortMoviesCheck}
        isChecked={props.isShortMoviesChecked}/>
      <MoviesCardList saved={true} movies={props.movies} onDeleteMovie={props.onDeleteMovie}/>
    </section>
  )
}

export default SavedMovies;