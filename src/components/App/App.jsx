import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter as Router,
} from 'react-router-dom';
import './App.css';

// import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Main from '../Main/Main';
// import Movies from '../Movies/Movies';
// import SavedMovies from '../SavedMovies/SavedMovies';
// import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

// import Register from '../Register/Register';
// import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router>
      <div className="page">
          <Routes>
            <Route exact path="/" element={<><Header bgColor="blue" /> <Main /><Footer /></>}></Route>
            {/* <Route exact path="/signin">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Register
              />
            </Route>
            <Route
              exact
              path="/movies"
              element={<Movies />}
            />
            <Route
              exact
              path="/saved-movies"
              element={<SavedMovies />}
              currentUser={currentUser}
            />
            <Route
              path="/profile"
              exact
              element={<Profile />}
            />*/}
            <Route exact path="*" element={<NotFoundPage />}></Route>
          </Routes>
      </div>
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;
