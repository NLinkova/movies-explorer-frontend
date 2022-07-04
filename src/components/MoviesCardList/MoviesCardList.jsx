import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return (
        <section className="movies__card-list">
            <ul className="movies__list">
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
                <MoviesCard saved={props.saved}/>
            </ul>
            <button className={props.saved ? 'movies__more-button movies__more-button_invisible' : 'movies__more-button'}>Еще</button>
        </section>
    )
}

export default MoviesCardList;