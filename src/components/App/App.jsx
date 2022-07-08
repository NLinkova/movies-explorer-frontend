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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(pathname);
  const [loginError, setLoginError] = useState(false);
  const [registeredError, setRegisteredError] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditDone, setIsEditDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //запрос инфо при успешном токене
  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.getUserInfoFromServer(jwt)
        .then((userInfo) => {
          if (userInfo) {
            // setCurrentUser(userInfo.data);
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

  //выход из учетной записи и удаление токена из локального хранилища
  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem('foundFilms');
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
        })
        .catch((err) => {
          console.log(err);
          setIsEditError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
            <Route exact path="/" element={<><Header /> <Main loggedIn={false} /><Footer /></>}></Route>
            <Route exact path="/signin" element={<Login authLogin={handleAuthLogin}
                />}></Route>
            <Route exact path="/signup" element={<Register authRegister={handleAuthRegister}
                />}></Route>
            <Route
            exact
            path="/movies"
            element={<><HeaderAuth /> <Movies isLogin={isLogin} /> <Footer /></>}
            />
            <Route
              exact
              path="/saved-movies"
              element={<><HeaderAuth /><SavedMovies loggedIn={true}/><Footer /></>} />

            <Route
              path="/profile"
              exact
              element={<><HeaderAuth /> <Profile loggedIn={true} handleLogout={handleLogout}
              editProfile={editProfile}
              currentUser={currentUser}
              isEditError={isEditError}
              isEditDone={isEditDone}/> </>}></Route>
            <Route exact path="*" element={<NotFoundPage />}></Route>
          </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
