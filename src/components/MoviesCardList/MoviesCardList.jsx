import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import React from "react";


function MoviesCardList({
  cards,
  userCards,
  saveMovie,
  deleteUserMovie,
  isLoading,
  onSearch,
  countMoviesToPage,
  handleCountMovies,
  page,
  textError,
}) {
  // const [initialCardsNumber, setInitialCardsNumber] = React.useState(() => {
  //   const windowSize = window.innerWidth;
  //   if(windowSize < 720) {
  //       return 5
  //   } else if(windowSize < 920) {
  //       return 8
  //   } else if(windowSize < 1279) {
  //       return 12 }
  //   else if(windowSize > 1279) {
  //       return 12
  //   }
  // } );
  // const [moreCardsNumber, setMoreCardsNumber] = React.useState(() => {
  //     const windowSize = window.innerWidth;
  //     if(windowSize < 720) {
  //         return 2;
  //     } else if(windowSize < 920) {
  //         return 2
  //     } else if(windowSize < 1279) {
  //         return 3
  //     } else if(windowSize > 1279) {
  //         return 4
  //     }
  // });

  // function handleScreenWidth () {
  //     const windowSize = window.innerWidth;
  //     if(windowSize < 720) {
  //         setInitialCardsNumber(5)
  //     } else if(windowSize < 920) {
  //         setInitialCardsNumber(8)
  //     } else if(windowSize < 1279) {
  //         setInitialCardsNumber(12)
  //     } else if(windowSize > 1279) {
  //         setInitialCardsNumber(12)
  //     }
  // }

  // const displayedMovies = cards?.slice(0, initialCardsNumber);

  // function handleMoviesIncrease() {
  //     setInitialCardsNumber(prevState => {return prevState + moreCardsNumber});
  // }

  // React.useEffect(() => {
  //     window.addEventListener('resize', handleScreenWidth);
  // }, []);

  function handleClick() {
    handleCountMovies(countMoviesToPage.current + countMoviesToPage.add);
  }

  return (
      <section className="movies__card-list">
        {isLoading ? (
        <Preloader />
        ) : textError ? (
          <div className="movies__empty">{textError}</div>
        ) : !cards.length ? (
          <div className="movies__empty">
            {onSearch
              ? 'Ничего не найдено'
              : page === 'saved-movies'
              ? 'Добавьте сюда фильмы'
              : 'Здесь появятся фильмы после поиска'}
          </div>
        ) : (
        <ul className="movies__list">
                      {cards.map((card, index, arr) => {
              const limit =
                page === 'movies' ? countMoviesToPage.current : arr.length;
                return (
                  index < limit && (
                    <MoviesCard
                      key={card.id ? card.id : card.movieId}
                      card={card}
                      userCards={userCards}
                      saveMovie={saveMovie}
                      deleteUserMovie={deleteUserMovie}
                    />
                  )
                );
            })
          }
        </ul>
        )}
            {page !== 'saved-movies' &&
        !isLoading &&
        !textError &&
        countMoviesToPage.current < cards.length && (
        <button className="movies__more-button" onClick={handleClick}>Еще</button>
        )}
      </section>
  )
}

export default MoviesCardList;