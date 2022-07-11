import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies({  userCards,
  deleteUserMovie,
  runSearchSavedMovies,
  inputFilterSearch,
  searchTrigger,
  onSearch,
  countMoviesToPage,
  handleCountMovies,
  isShortMovie,
  onFilter,
  textError,}) {
    return (
      <section className="saved-movies">
        <SearchForm userCards={userCards}
          runSearchSavedMovies={runSearchSavedMovies}
          page={'saved-movies'}
          inputFilterSearch={inputFilterSearch}
          searchTrigger={searchTrigger}
          isShortMovie={isShortMovie}
          onFilter={onFilter}/>
        <MoviesCardList           movies={userCards}
          deleteUserMovie={deleteUserMovie}
          onSearch={onSearch}
          countMoviesToPage={countMoviesToPage}
          handleCountMovies={handleCountMovies}
          searchTrigger={searchTrigger}
          page={'saved-movies'}
          textError={textError}/>
      </section>
    )
}

export default SavedMovies;