import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="about">
      <h2 className="about__title" id="about">
        О проекте
      </h2>
      <ul className="about__description">
        <li className="about__description_item">
          <h3 className="about__description_title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__description_content">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about__description_item">
          <h3 className="about__description_title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__description_content">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about__duration">
        <li className="about__duration_item">
          <p className="about__duration-title about__duration-title_backend">
            1 неделя
          </p>
          <p className="about__duration-subtitle">Back-end</p>
        </li>
        <li className="about__duration_item">
          <p className="about__duration-title">4 недели</p>
          <p className="about__duration-subtitle">Front-end</p>
        </li>
      </ul>
    </div>
  );
}

export default AboutProject;
