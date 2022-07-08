import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';
import './App.css';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  DURATION_SHORTFILM,
  COUNT_LOAD_MOVIES_3,
  COUNT_LOAD_MOVIES_2,
  COUNT_START_MOVIES_12,
  COUNT_START_MOVIES_8,
  COUNT_START_MOVIES_5,
  DISPLAY_850,
  DISPLAY_450,
} from '../../constants/constants';

function App() {

  // const [currentUser, setCurrentUser] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [notFound, setNotFound] = useState(false);
//   const [isMoviesErrorActive, setIsMoviesErrorActive] = useState(false);
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);
//   const [allMovies, setAllMovies] = useState([]);
//   const [isSaving, setIsSaving] = useState(false);

//   function handleShortMoviesCheck(e) {
//     setIsShortMoviesChecked(e.target.checked);
//   }
//   function handleSearchMovies(movies, strSearch) {
//     let filteredMovies = [];
//     movies.forEach((movie) => {
//         if(movie.nameRU.indexOf(strSearch) > -1) {
//             if(isShortMoviesChecked) {
//                 if(movie.duration <= 40) {
//                     return filteredMovies.push(movie);
//                 }
//                 return
//             }
//             return filteredMovies.push(movie);
//         }
//     })
//     return filteredMovies;
// }

// function searchSavedMovies(strSearch) {
//     const allSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
//     const searchSavedResult = handleSearchMovies(allSavedMovies, strSearch);
//     setSavedMovies(searchSavedResult);
// }

// function searchMovies(strSearch) {
//     setIsSearching(true);
//     setMovies([]);
//     setNotFound(false);
//     setIsMoviesErrorActive(false);
//         if(allMovies.length === 0) {
//             moviesApi.getAllMovies()
//                 .then((movies) => {
//                     setAllMovies(movies)
//                     const searchResult = handleSearchMovies(movies, strSearch);
//                     if(searchResult.length === 0) {
//                         setNotFound(true);
//                         setMovies([]);
//                     } else {
//                         localStorage.setItem('movies', JSON.stringify(searchResult))
//                         setMovies(JSON.parse(localStorage.getItem('movies')));
//                     }
//                 })
//                 .catch(() => {
//                     setIsMoviesErrorActive(true);
//                     setMovies([]);
//                 })
//                 .finally(() => {
//                     setIsSearching(false);
//                     setIsShortMoviesChecked(false);
//                 })
//         } else {
//             const searchResult = handleSearchMovies(allMovies, strSearch);

//             if(searchResult.length === 0) {
//                 setNotFound(true);
//                 setMovies([]);
//                 setIsSearching(false);
//                 setIsShortMoviesChecked(false);
//             } else if(searchResult.length !== 0) {
//                 localStorage.setItem('movies', JSON.stringify(searchResult));
//                 setMovies(JSON.parse(localStorage.getItem('movies')));
//                 setIsSearching(false);
//                 setIsShortMoviesChecked(false);
//             } else {
//                 setIsMoviesErrorActive(true);
//                 setMovies([]);
//                 setIsShortMoviesChecked(false);
//             }
//         }
// }

// function handleSaveMovie(movie) {
//     mainApi.saveMovie(movie)
//         .then((savedMovie) => {
//             const films = [...savedMovies, savedMovie];
//             localStorage.setItem('savedMovies', JSON.stringify(films));
//             setSavedMovies(prevState => ([...prevState, savedMovie]));
//         })
//         .catch((err) => {
//             console.log(`Ошибка ${err}, попробуйте еще раз`);
//         })
// }

// function handleDeleteMovie(movieId) {
//     mainApi.deleteMovie(movieId)
//         .then(() => {
//             const newSavedMovies = savedMovies.filter((deletedMovie) => {return deletedMovie._id !== movieId})
//             setSavedMovies(newSavedMovies);
//             localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
//         })
//         .catch((err) => {
//             console.log(`Ошибка ${err}, попробуйте еще раз`);
//         })
// }

const navigate = useNavigate();
const location = useLocation();
const [currentUser, setCurrentUser] = useState({});
const [allCardsBeat, setAllCardsBeat] = useState([]);
const [cards, setCards] = useState([]);
const [userCards, setUserCards] = useState([]);
const [shortCards, setShortCards] = useState([]);

// стейт для сохранения последнего запроса на странице сохраненных фильмов
const [inputFilterSearch, setInputFilterSearch] = useState('');
// стейт для определения нажали ли кнопку поиска
const [onSearch, setOnSearch] = useState(false);

// Чтобы до проверки токена не рисовалась страница авторизации использую этот стейт:
const [isTokenChecked, setIsTokenChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [textError, setTextError] = useState('');

// стейт для режима короткометражек
const [isShortMovie, setIsShortMovie] = useState(false);
// стейт для установки кол-ва фильмов в зависимости от разрешения экрана
const [countMoviesToPage, setCountMoviesToPage] = useState({
  current: 0,
  add: 0,
});
  /*Отображение ошибки*/
  function showError(err) {
    if (err.message === 'Failed to fetch') {
      err.message = 'Нет соединения. Попробуйте позже';
    }
    setTextError(err.message);
  }

  function showMessage(msg) {
    setTextError(msg);
  }

  /*Был ли поиск. Нужно для определения что ставить на страницу: карточки или текст*/
  function handleSearchTrigger(onSearch) {
    setOnSearch(onSearch);
  }

  /*Обработчик кнопки Еще (добавляет фильмы)*/
  function handleCountMovies(currentCount) {
    setCountMoviesToPage({ ...countMoviesToPage, current: currentCount });
  }
  /*фильтрация по запросу*/
  function filtrationQuery(cards, inputSearch) {
    return cards.filter((card) => {
      if (card.nameRU.toLowerCase().includes(inputSearch)) {
        return card;
      }
      return card;
    });
  }

    /*фильтрация по времени */
    function filtrationShort(cards) {
      return cards.filter((card) =>
        card.duration < DURATION_SHORTFILM ? card : false
      );
    }

  /*Обработчик включения-выключения фильтра (короткометражки)*/
  function handleOnFilter() {
    isShortMovie ? setIsShortMovie(false) : setIsShortMovie(true);
  }
  /*Берем из localStorage, если там что то есть, иначе делаем запрос*/
  function initialMovies() {
    if (localStorage.getItem('localAllMovies')) {
      const localAllCards = JSON.parse(localStorage.getItem('localAllMovies'));
      let localUsersCards = [];
      if (localStorage.getItem('localUsersMovies')) {
        localUsersCards = JSON.parse(localStorage.getItem('localUsersMovies'));
      } else {
        localStorage.setItem('localUsersMovies', JSON.stringify([]));
      }
      setAllCardsBeat(localAllCards);
      setCards(localUsersCards);
      const filterShortCards = filtrationShort(localUsersCards);
      setShortCards(filterShortCards);
    } else {
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((allCards) => {
          setAllCardsBeat(allCards);
          localStorage.setItem('localAllMovies', JSON.stringify(allCards));
          localStorage.setItem('localUsersMovies', JSON.stringify([]));
        })
        .catch((err) => {
          showError(err);
        })
        .finally(() => setIsLoading(false));
    }
  }

  /*Поиск по всем фильмам*/
  function runSearch(inputSearch) {
    const filterCards = filtrationQuery(allCardsBeat, inputSearch);
    setCards(filterCards);
    const filterShortCards = filtrationShort(filterCards);
    setShortCards(filterShortCards);
    localStorage.setItem('localUsersMovies', JSON.stringify(filterCards));
  }

  /*Поиск среди сохраненных фильмов*/
  function runSearchSavedMovies(inputSearch) {
    setInputFilterSearch(inputSearch);
  }

  /*Очищение текста ошибки*/
  useEffect(() => {
    clearTextError();
  }, [cards]);

  /*Очищение текста*/
  useEffect(() => {
    setOnSearch(false);
  }, []);

  function clearTextError() {
    setTextError('');
  }
// Сохранение юзером фильмов
function handleSaveMovie(newMovie) {
  mainApi
    .saveMovieToServer(newMovie)
    .then((userMovie) => {
      const newUserCards = [userMovie, ...userCards];
      setUserCards(newUserCards);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
}

// Удаление сохраненных юзером фильмов
function handleDeleteUserMovie(movieDelId) {
  mainApi
    .deleteMovieToServer(movieDelId)
    .then(() => {
      const newUserMovies = userCards.filter(
        (card) => card._id !== movieDelId && card
      );
      setUserCards(newUserMovies);
      setOnSearch(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

  // Получение сохраненных юзером фильмов
  function handleGetUserMovies() {
    mainApi
      .getUserMovies()
      .then((userSavedMovies) => {
        setUserCards(userSavedMovies);
      })
      .catch((err) => {
        showError(err);
      });
  }


  /*Обработчик регистрации*/
  function handleAuthRegister(nameUser, email, password) {
    setIsLoading(true);
    mainApi
      .register(nameUser, email, password)
      .then(() => {
        handleAuthLogin(email, password);
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
    /*Обработчик логина*/
    function handleAuthLogin(email, password) {
      setIsLoading(true);
      return mainApi
        .authorize(email, password)
        .then(jwt => {
          if (jwt.token) {
            localStorage.setItem('jwt', jwt.token);
            setLoggedIn(true);
            navigate("/movies")
        }})
        .catch((err) => {
          showError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

  //     /*Обработчик авторизации*/
  // function tokenCheck() {
  //   setIsTokenChecked(true);
  //   mainApi
  //     .getUserInfoFromServer()
  //     .then((res) => {
  //       setLoggedIn(true);
  //       setCurrentUser(res);
  //       initialMovies();
  //       handleGetUserMovies();
  //       // location.pathname === '/signin' || location.pathname === '/signup'
  //       //   ? navigate('/movies')
  //       //   : navigate(location);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => {
  //       setIsTokenChecked(false);
  //     });
  // }

  // useEffect(() => {
  //   tokenCheck();
  // }, []);


  //проверка токена
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUserToken(jwt)
        .then(user => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
            initialMovies();
            handleGetUserMovies();
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

    //запрос карточек и инфо при успешном токене
    useEffect(() => {
      if (loggedIn) {
        setIsLoading(true);
         return Promise.all([mainApi.getUserInfoFromServer(), mainApi.getUserMovies()])
          .then(([user, cards]) => {
            setCurrentUser(user);
            // setCards(cards);
          })
          .catch((err) => {
            console.log(err);
            // setIsRegisterSuccess(false);
            // setIsInfoTooltipOpen(true);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, [loggedIn]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <Routes>
            <Route exact path="/" element={<><Header /> <Main loggedIn={false} /><Footer /></>}></Route>
            <Route exact path="/signin" element={<Login authLogin={handleAuthLogin}
                textError={textError}
                clearTextError={clearTextError} />}></Route>
            <Route exact path="/signup" element={<Register authRegister={handleAuthRegister}
                textError={textError}
                clearTextError={clearTextError}/>}></Route>
            <Route
            exact
            path="/movies"
            element={<><HeaderAuth /> <Movies loggedIn={true} cards={isShortMovie ? shortCards : cards}
            userCards={userCards}
            isLoading={isLoading}
            countMoviesToPage={countMoviesToPage}
            isShortMovie={isShortMovie}
            onSearch={onSearch}
            runSearch={runSearch}
            saveMovie={handleSaveMovie}
            deleteUserMovie={handleDeleteUserMovie}
            handleCountMovies={handleCountMovies}
            onFilter={handleOnFilter}
            searchTrigger={handleSearchTrigger}
            textError={textError}
            clearTextError={clearTextError}/> <Footer /></>}
            />
            <Route
              exact
              path="/saved-movies"
              element={<><HeaderAuth /><SavedMovies loggedIn={true} onSearch={onSearch}
              countMoviesToPage={countMoviesToPage}
              isShortMovie={isShortMovie}
              deleteUserMovie={handleDeleteUserMovie}
              runSearchSavedMovies={runSearchSavedMovies}
              searchTrigger={handleSearchTrigger}
              handleCountMovies={handleCountMovies}
              onFilter={handleOnFilter}
              textError={textError}/><Footer /></>}
              currentUser={currentUser}/>
            <Route
              path="/profile"
              exact
              element={<><HeaderAuth /> <Profile loggedIn={true} /> </>}></Route>
            <Route exact path="*" element={<NotFoundPage />}></Route>
          </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
