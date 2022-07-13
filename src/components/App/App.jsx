import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import './App.css';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [registeredError, setRegisteredError] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditDone, setIsEditDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isMoviesErrorActive, setIsMoviesErrorActive] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(localStorage.getItem('checkbox') === 'false')
  const [allMovies, setAllMovies] = useState([]);
  const loggedIn = localStorage.getItem("jwt") || false;
  const location = useLocation();

    //проверка токена и установка login true
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          mainApi.getUserInfoFromServer(jwt)
            .then((userInfo) => {
              if (userInfo) {
                setIsLogin(true);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setIsLogin(false);
        }

    }, []);

      /*Обработчик регистрации*/
  function handleAuthRegister(name, email, password) {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then((data) => {
        if (data) {
        handleAuthLogin(email, password);
        }
      })
      .catch(() => {
        setRegisteredError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setRegisteredError(false);
      });
  }
    /*Обработчик логина*/
    function handleAuthLogin(email, password) {
      setIsLoading(true);
      mainApi
        .authorize(email, password)
        .then(jwt => {
          if (jwt.token) {
            localStorage.setItem('jwt', jwt.token);
            setIsLogin(true);
            navigate("/movies")
        }})
        .catch(() => {
          setLoginError(true);
        })
        .finally(() => {
          setIsLoading(false);
          setLoginError(false);
        });
    }

  // Обработчик кнопки Редактировать на странице профиля
  function editProfile(name, email) {
    setIsLoading(true);
    mainApi
      .saveUserInfoToServer(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        setIsEditDone(true);
        setIsEditError(false);
      })
      .catch(() => {
        setIsEditError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  //save checkbox status to LS
  function handleShortMoviesCheck(e) {
    setIsShortMoviesChecked(e.target.checked);
 }

//  useEffect(() => {
//   setIsShortMoviesChecked(localStorage.getItem('checkbox'));
// }, []);

//поиск фильмов
  function handleSearchMovies(movies, keyWord) {
    // const shorts = localStorage.getItem('shorts');
    let filteredMovies = [];
    movies.forEach((movie) => {
      if(movie.nameRU.indexOf(keyWord) > -1) {
        // if(shorts === true) {
        //   movies.filter((movie) =>
        //     movie.duration <= 40);
        //   return filteredMovies.push(movie);
        // }
        return filteredMovies.push(movie);
      }
    })
    return filteredMovies;
  }

  //поиск по сохраненным фильмам
  function searchSavedMovies(keyWord) {
    const allSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const searchSavedResult = handleSearchMovies(allSavedMovies, keyWord);
    setSavedMovies(searchSavedResult);
  }
  //поиск всех фильмов
  function searchMovies(keyWord) {
    setIsLoading(true);
    setMovies([]);
    setNotFound(false);
    setIsMoviesErrorActive(false);
      if(allMovies.length === 0) {
        moviesApi.getAllMovies()
          .then((movies) => {
            setAllMovies(movies)
            const searchResult = handleSearchMovies(movies, keyWord);
            if(searchResult.length === 0) {
              setNotFound(true);
              setMovies([]);
            } else {
              localStorage.setItem('movies', JSON.stringify(searchResult))
              setMovies(JSON.parse(localStorage.getItem('movies')));
            }
          })
          .catch(() => {
            setIsMoviesErrorActive(true);
            setMovies([]);
          })
          .finally(() => {
            setIsLoading(false);
            setIsShortMoviesChecked(false);
          })
      } else {
        const searchResult = handleSearchMovies(allMovies, keyWord);
        if(searchResult.length === 0) {
          setNotFound(true);
          setMovies([]);
          setIsLoading(false);
          setIsShortMoviesChecked(false);
        } else if(searchResult.length !== 0) {
          localStorage.setItem('movies', JSON.stringify(searchResult));
          setMovies(JSON.parse(localStorage.getItem('movies')));
          setIsLoading(false);
          setIsShortMoviesChecked(false);
        } else {
          setIsMoviesErrorActive(true);
          setMovies([]);
          setIsShortMoviesChecked(false);
        }
      }
  }

  //добавление фильма в избранные
  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        const films = [...savedMovies, savedMovie];
        localStorage.setItem('savedMovies', JSON.stringify(films));
        setSavedMovies(films);
      })
      .catch((err) => {
       console.log(`Ошибка ${err}, попробуйте еще раз`);
      })
  }

  //удаление фильма из избранных
  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = savedMovies.filter((deletedMovie) => {return deletedMovie._id !== movieId})
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        // setSavedMovies(prevState => ([...prevState, savedMovies]));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      })
  }


  //выход из учетной записи и удаление токена из локального хранилища
  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('movies');
    localStorage.removeItem('query');
    localStorage.removeItem('shorts');
    setCurrentUser("");
    setIsLogin(false);
    navigate("/");
  }

  //запрос инфо при успешном токене
  useEffect(() => {
    setIsLoading(true);
    if (isLogin) {
      mainApi.getUserInfoFromServer()
        .then(user => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLogin]);

  //запрос movies при успешном токене
  useEffect(() => {
    setIsLoading(true);
    const searchedMovies = JSON.parse(localStorage.getItem('movies'));
    if (isLogin) {
    mainApi.getUserMovies()
        .then((movies) => {
          const films = [...savedMovies, movies];
            localStorage.setItem('savedMovies', JSON.stringify(films));
            setSavedMovies(prevState => ([...prevState, movies]));
            setMovies(searchedMovies);
            setSavedMovies(movies)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLogin]);

  useEffect(() => {
    mainApi.getUserMovies()
      .then((res) => {
        setSavedMovies(res);
      })
    }, [location]);

  //проверка short movie
  useEffect(() => {
    debugger
    const shorts = localStorage.getItem('shorts');
    if(shorts === true) {
      setIsLoading(true);
      if (pathname === '/movies') {
        const newShortMovies = movies.filter((movie) => {return movie.duration <= 40})
        setMovies(newShortMovies);
      }
      if (pathname === '/saved-movies') {
        const newShortMovies = savedMovies.filter((movie) => {return movie.duration <= 40})
        setSavedMovies(newShortMovies);
      }
      }
  }, [movies, savedMovies]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route exact path="/" element={<><Header /><Main isLogin={false} /><Footer /></>}></Route>
          <Route exact path="/signin" element={<Login authLogin={handleAuthLogin}
            isLoading={isLoading}/>}></Route>
          <Route exact path="/signup" element={<Register authRegister={handleAuthRegister}
            isLoading={isLoading} />}></Route>
          <Route exact path="/movies" element={<ProtectedRoute allowed={loggedIn} ><HeaderAuth /> <Movies isLogin={isLogin} movies={movies} onSearchMovies={searchMovies}
            isLoading={isLoading} notFound={notFound} isErrorActive={isMoviesErrorActive} onMovieSave={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie} savedMovies={savedMovies}
            isShortMoviesChecked={isShortMoviesChecked}  /><Footer /></ProtectedRoute>}></Route>
          <Route exact path="/saved-movies" element={<ProtectedRoute allowed={loggedIn} ><HeaderAuth /><SavedMovies isLogin={isLogin} movies={savedMovies}
            onDeleteMovie={handleDeleteMovie} onSearchSavedMovies={searchSavedMovies} onShortMoviesCheck={handleShortMoviesCheck} isLoading={isLoading}
            isShortMoviesChecked={isShortMoviesChecked}/><Footer /></ProtectedRoute>}></Route>
          <Route
            path="/profile"
            exact
            element={<ProtectedRoute allowed={loggedIn} ><HeaderAuth /> <Profile isLogin={isLogin} handleLogout={handleLogout}
            editProfile={editProfile} currentUser={currentUser} isEditError={isEditError} isEditDone={isEditDone}/>
            </ProtectedRoute>}></Route>
          <Route exact path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;