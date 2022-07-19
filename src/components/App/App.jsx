import { useEffect, useMemo, useState } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom';
import './App.css';

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
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [textError, setTextError] = useState('');
  const [isEditError, setIsEditError] = useState(false);
  const [isEditDone, setIsEditDone] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const loggedIn = localStorage.getItem("jwt") || false;

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
    mainApi
      .register(name, email, password)
      .then((data) => {
        if (data) {
        handleAuthLogin(email, password);
        }
      })
      .catch((err) => {
        if (err.status === CONFLICT_ERROR_CODE) {
          setTextError('Данный email уже зарегистрирован');
        } else {
          console.log(err)
          setTextError('Нет соединения с сервером');
        }
      })
      .finally(() => {
        setTextError('');
      });
  }

  /*Обработчик логина*/
  function handleAuthLogin(email, password) {
    mainApi
      .authorize(email, password)
      .then(jwt => {
        if (jwt.token) {
          localStorage.setItem('jwt', jwt.token);
          setIsLogin(true);
          navigate("/movies")
      }})
      .catch((err) => {
        if (err.status=== UNAUTH_ERROR_CODE) {
          setTextError("Неправильные почта или пароль");
        } else {
          console.log(err)
          setTextError('Нет соединения с сервером');
        }
        console.log(err)
      })
      .finally(() => {
        setTextError('')
      });
  }

  // Обработчик кнопки Редактировать на странице профиля
  function editProfile(name, email) {
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
        setIsEditError(false);
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
    if (isLogin) {
      mainApi.getUserInfoFromServer()
        .then(user => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLogin]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <TooltipContext.Provider value={tooltipContext}>
          <InfoTooltip message={tooltipMessage} />
      <div className="page">
        <Routes>
          <Route exact path="/" element={<>{isLogin ? <HeaderAuth/> : <Header />}
            <Main isLogin={isLogin} />
            <Footer /></>}>
          </Route>
          <Route exact path="/signin" element={loggedIn ? <Navigate to="/" />
            : <Login authLogin={handleAuthLogin} textError={textError} setTextError={setTextError} />}>
          </Route>
          <Route exact path="/signup" element={loggedIn ? <Navigate to="/" />
            : <Register authRegister={handleAuthRegister} textError={textError} setTextError={setTextError} />}>
          </Route>
          <Route exact path="/movies" element={<ProtectedRoute allowed={loggedIn} ><HeaderAuth />
            <Movies isLogin={isLogin} /><Footer /></ProtectedRoute>}>
          </Route>
          <Route exact path="/saved-movies" element={<ProtectedRoute allowed={loggedIn} ><HeaderAuth />
            <SavedMovies isLogin={isLogin}/><Footer /></ProtectedRoute>}>
          </Route>
          <Route exact path="/profile" element={<ProtectedRoute allowed={loggedIn} ><HeaderAuth />
            <Profile isLogin={isLogin} handleLogout={handleLogout}
            editProfile={editProfile} currentUser={currentUser} isEditError={isEditError} isEditDone={isEditDone}/>
            </ProtectedRoute>}>
          </Route>
          <Route exact path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
      </TooltipContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;