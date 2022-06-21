import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.css';

import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
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
  const [currentUser, setCurrentUser] = useState({});
    // стейты для входа
  const [loggedIn, setLoggedIn] = useState(false);
return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="">
        <Routes>
          <Route exact path="/">
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route exact path="/signin">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Register
            />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={Movies}
            loggedIn={loggedIn}
            currentUser={currentUser}
          />
          <ProtectedRoute
            path="/profile"
            exact
            loggedIn={loggedIn}
            component={Profile}
          />
          <Route exact path="/*">
            <NotFoundPage />
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
);
}

export default App;
