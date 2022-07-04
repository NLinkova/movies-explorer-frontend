import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="about" id="about">
      <h2 className="about__title">
        О проекте
      </h2>
      <ul className="about__description">
        <li className="about__description-item">
          <h3 className="about__description-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__description-content">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about__description-item">
          <h3 className="about__description-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__description-content about__description-content_last">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about__duration">
        <li className="about__duration-item">
          <p className="about__duration-title about__duration-title_backend">
            1 неделя
          </p>
          <p className="about__duration-subtitle">Back-end</p>
        </li>
        <li className="about__duration-item">
          <p className="about__duration-title">4 недели</p>
          <p className="about__duration-subtitle">Front-end</p>
        </li>
      </ul>
    </div>
  );
}

export default AboutProject;
