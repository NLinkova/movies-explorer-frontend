import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <Link className="navigation__link" to="/movies">
            Movies
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link className="navigation__link" to="/saved-movies">
            Saved movies
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
