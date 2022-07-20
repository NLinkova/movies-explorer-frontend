import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Yandex.Practicum х BeatFilm.</h2>
      <div className="footer__nav">
        <span className="footer__copyright">&copy; 2022 Natalia Linkova</span>
        <ul className="footer__list">
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
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
