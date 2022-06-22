import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function Navigation() {
  const { pathname } = useLocation();

  const text = `${pathname === "/" ? "white" : "black"}`;

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <Link
            className={`navigation__movies navigation__movies-${text}`}
            to="/movies"
          >
            Фильмы
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link
            className={`navigation__saved-movies navigation__saved-movies-${text}`}
            to="/saved-movies"
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
