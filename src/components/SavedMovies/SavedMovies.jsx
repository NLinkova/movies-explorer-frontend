import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies(props) {
    return (
        <section className="saved-movies">
            <SearchForm page={'saved-movies'} />
            <MoviesCardList page={'saved-movies'} saved={true}/>
        </section>
    )
}

export default SavedMovies;