import { Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import logo from "../../images/logo.svg";
import "./Header.css";
import HeaderAuth from "../HeaderAuth/HeaderAuth";

function Header() {
  const currentUser = useContext(CurrentUserContext);
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
            <Link className="header__list-link" to="/signup">
              Sign up
            </Link>
          </li>
          <li className="header__item">
            <button className="header__btn" type="button">
              <Link
                className="header__list-link header__list-link_btn"
                to="/signin"
              >
                Log in
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
