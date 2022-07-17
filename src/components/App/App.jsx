import { useEffect, useMemo, useState } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
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
import TooltipContext from '../../contexts/TooltipContext';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CONFLICT_ERROR_CODE, UNAUTH_ERROR_CODE } from '../../constants/constants';
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
  const [tooltipMessage, setTooltipMessage] = useState('');
  const loggedIn = localStorage.getItem("jwt") || false;
  const location = useLocation();


  const tooltipContext = useMemo(() => ({ tooltipMessage, setTooltipMessage }), [tooltipMessage]);

  //проверка токена и установка login true
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.getUserInfoFromServer(jwt)
        .then((user) => {
          if (user) {
            setIsLogin(true);
            localStorage.setItem('userId', user._id);
            setCurrentUser(user);
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
      .catch((err) => {
        if (err.status === CONFLICT_ERROR_CODE) {
          setRegisteredError(true);
        } else {
          console.log(err)
        }
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
      .catch((err) => {
        if (err.status === UNAUTH_ERROR_CODE) {
          setLoginError(true);
        } else {
          console.log(err)
          setLoginError(true);
        }
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


  //выход из учетной записи и удаление токена из локального хранилища
  function handleLogout() {
    setCurrentUser({});
    localStorage.clear();
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <TooltipContext.Provider value={tooltipContext}>
          <InfoTooltip message={tooltipMessage} />
      <div className="page">
        <Routes>
          <Route exact path="/" element={<>{isLogin ? <HeaderAuth/> : <Header />} <Main isLogin={isLogin} /><Footer /></>}></Route>
          <Route exact path="/signin" element={loggedIn ? <Navigate to="/" /> : <Login authLogin={handleAuthLogin} loginError={loginError}
            isLoading={isLoading}/>}></Route>
          <Route exact path="/signup" element={loggedIn ? <Navigate to="/" /> :<Register authRegister={handleAuthRegister} registeredError={registeredError} setRegisteredError={setRegisteredError}
            isLoading={isLoading}/>}></Route>
          <Route exact path="/movies" element={<ProtectedRoute allowed={loggedIn} ><HeaderAuth /> <Movies isLogin={isLogin} /><Footer /></ProtectedRoute>}></Route>
          <Route exact path="/saved-movies" element={<ProtectedRoute allowed={loggedIn} ><HeaderAuth /><SavedMovies isLogin={isLogin}/><Footer /></ProtectedRoute>}></Route>
          <Route
            exact
            path="/profile"
            element={<ProtectedRoute allowed={loggedIn} ><HeaderAuth /> <Profile isLogin={isLogin} handleLogout={handleLogout}
            editProfile={editProfile} currentUser={currentUser} isEditError={isEditError} isEditDone={isEditDone}/>
            </ProtectedRoute>}></Route>
          <Route exact path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
      </TooltipContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;