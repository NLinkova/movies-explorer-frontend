import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__nav">
        <span className="footer__copyright">&copy; 2022</span>
        <ul className="footer__list">
          <li>
            <a
              className="footer__link"
              href="https://praktikum.yandex.ru/web/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://github.com/NLinkova"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://www.facebook.com/nat.linkova"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
