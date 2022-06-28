import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Header.css';

function Header () {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__link">
          <img className="header__logo" alt="Логотип" src={logo}></img>
        </Link>
      </div>
      <div className="header__container">
        <ul className="header__list-links">
          <li className="header__item">
            <Link
              className="header__list-link"
              to="/signup"
            >
             Регистрация
            </Link>
          </li>
          <li className="header__item">
              <button className="header__btn" type="button">
              <Link className="header__list-link header__list-link_btn" to="/signin">
                Войти
              </Link>
              </button>
           </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
