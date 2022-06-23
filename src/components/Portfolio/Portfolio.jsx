import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://nlinkova.github.io/how-to-learn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__item_title">Статичный сайт</p>
            <img className="portfolio__arrow" src={arrow} alt="arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://nlinkova.github.io/russian-travel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__item_title">Адаптивный сайт</p>
            <img className="portfolio__arrow" src={arrow} alt="arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://linkova.mesto.front.nomoredomains.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__item_title">Одностраничное приложение</p>
            <img className="portfolio__arrow" src={arrow} alt="arrow" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
