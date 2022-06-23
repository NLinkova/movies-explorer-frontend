import React from "react";
import profilePhoto from "../../images/photo.png";
import "./AboutMe.css";

function AboutMe() {
  return (
    <div className="about-me">
      <h2 className="about-me__title" id="author">
        Студент
      </h2>
      <div className="about-me__cover">
        <div className="about-me__wrapper">
          <h3 className="about-me__text-title">Наталья</h3>
          <p className="about-me__text-subtitle">
            Фронтенд-разработчик, 28 лет
          </p>
          <p className="about-me__text-description">
            Я родилась в солнечном Оренбурге. Училась в Екатеринбурге по специальности "Инженер-эколог". С 2020 года живу в Брисбене, Австралия.
            В июне 2022 закончила курс "Diploma of Website Development" TAFE, Queensland.
            Заканчиваю Яндекс.Практикум по специальности Веб-разработчик.
            Знаю React, Node, MongoDB и SQL. Хочу изучить PHP и Vue.
            Играю на гитаре, люблю йогу и книги.
          </p>
          <ul className="about-me__list">
            <li className="about-me__item">
              <a
                className="about-me__link"
                href="https://www.facebook.com/nat.linkova"
              >
                Facebook
              </a>
            </li>
            <li className="about-me__item">
              <a
                className="about-me__link"
                href="https://github.com/NLinkova"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img
          className="about-me__profile-photo"
          src={profilePhoto}
          alt="Фото автора"
        />
      </div>
    </div>
  );
}

export default AboutMe;
