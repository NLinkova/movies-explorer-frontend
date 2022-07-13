import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
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
  const [editProfileMessage, setEditProfileMessage] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(true);
  const [movies, setMovies] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  // const [search, setSearch] = useState('');
  const [isMoviesErrorActive, setIsMoviesErrorActive] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(localStorage.getItem('checkbox') === 'false')
  const [allMovies, setAllMovies] = useState([]);
  const loggedIn = localStorage.getItem("jwt") || false;
  const location = useLocation();

  //проверка токена и установка login true
  function checkToken() {
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
  }

  useEffect(() => {
    checkToken();
  }, []);

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

  // useEffect(() => {
  //   mainApi.getUserMovies()
  //     .then((res) => {
  //       setSavedMovies(res);
  //     })
  //   }, [location]);

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
        setRegisterErrorMessage('Что-то пошло не так...');
      })
      .finally(() => {
        setIsLoading(false);
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
        .catch((err) => {
          setLoginErrorMessage('Что-то пошло не так...');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

  //выход из учетной записи и удаление токена из локального хранилища
  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('checkbox');
    setCurrentUser("");
    setIsLogin(false);
    navigate("/");
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
          setEditProfileMessage('Профиль обновлен успешно!');
        })
        .catch((err) => {
          console.log(err);
          setIsEditError(true);
          setEditProfileMessage('При обновлении профиля произошла ошибка');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }


    function clearAllErrorMessages() {
      setRegisterErrorMessage('');
      setLoginErrorMessage('');
      setEditProfileMessage('');
  }

  //save checkbox status to LS
  function handleShortMoviesCheck(e) {
    setIsShortMoviesChecked(e.target.checked);
    localStorage.setItem("checkbox", `${e.target.checked}`);
 }

 useEffect(() => {
  setIsShortMoviesChecked(localStorage.getItem('checkbox'));
}, []);

//поиск фильмов
  function handleSearchMovies(movies, keyWord) {
    let filteredMovies = [];
    movies.forEach((movie) => {
      if(movie.nameRU.indexOf(keyWord) > -1) {
        if(isShortMoviesChecked) {
          if(movie.duration <= 40) {
            return filteredMovies.push(movie);
          }
          return
        }
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
              localStorage.setItem('searchKeyword', JSON.stringify(keyWord))
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
        setSavedMovies(prevState => ([...prevState, savedMovie]));
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



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route exact path="/" element={<><Header /><Main isLogin={false} /><Footer /></>}></Route>
          <Route exact path="/signin" element={<Login authLogin={handleAuthLogin} errorMessage={loginErrorMessage} onClear={clearAllErrorMessages}
            isLoading={isLoading}/>}></Route>
          <Route exact path="/signup" element={<Register authRegister={handleAuthRegister} errorMessage={registerErrorMessage} onClear={clearAllErrorMessages}
            isLoading={isLoading} />}></Route>
          <Route exact path="/movies" element={<ProtectedRoute allowed={loggedIn} ><HeaderAuth /> <Movies isLogin={isLogin} movies={movies} onSearchMovies={searchMovies}
            isLoading={isLoading} notFound={notFound} isErrorActive={isMoviesErrorActive} onMovieSave={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie} savedMovies={savedMovies} onShortMoviesCheck={handleShortMoviesCheck}
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