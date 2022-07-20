import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from "../../images/logo.svg";
import icon from "../../images/accountIcon.svg";
import "./HeaderAuth.css";

import Navigation from "../Navigation/Navigation";

function HeaderAuth() {
  const [activeBurger, setActiveBurger] = useState(false);
  const { pathname } = useLocation();

  function handleActiveBurger() {
    setActiveBurger(!activeBurger);
  }

  return (
    <header
      className={`header-auth ${pathname === "/" ? "header-auth_main" : ""}`}
    >
      <div className="header-auth__container">
        <Link className="header-auth__link" to="/">
          <img className="header-auth__logo" src={logo} alt="Логотип" />
        </Link>
      </div>
      <div className="header-auth__container">
        <Navigation />
      </div>
      <div className="header-auth__container">
        <Link to="/profile" className="header-auth__account">
          <span className="header-auth__text">Profile</span>
          <img className="header-auth__icon" alt="Аккаунт" src={icon}></img>
        </Link>
      </div>
      <div
        className={`header-auth__burger ${
          activeBurger ? "header-auth__burger_active" : ""
        }`}
        onClick={handleActiveBurger}
      >
        <div className="header-auth__burger-line" />
        <div className="header-auth__burger-line" />
        <div className="header-auth__burger-line" />
      </div>
      <div
        className={`header-auth__burger-menu-wrap ${
          activeBurger ? "header-auth__burger-menu-wrap_active" : ""
        }`}
        onClick={handleActiveBurger}
      >
        <div className="header-auth__burger-container">
          <nav className="header-auth__burger-nav">
            <ul className="header-auth__burger-list">
              <li className="header-auth__burger-item">
                <Link className="header-auth__burger-link" to="/">
                  Main
                </Link>
              </li>
              <li className="header-auth__burger-item">
                <Link className="header-auth__burger-link" to="/movies">
                  Movies
                </Link>
              </li>
              <li className="header-auth__burger-item">
                <Link className="header-auth__burger-link" to="/saved-movies">
                  Saved movies
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header-auth__burger-account">
            <Link to="/profile" className="header-auth__burger-account-link">
              <span className="header-auth__burger-text">Account</span>
              <img
                className="header-auth__burger-icon"
                alt="Аккаунт"
                src={icon}
              ></img>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
export default HeaderAuth;
