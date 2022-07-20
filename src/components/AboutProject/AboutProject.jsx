import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="about" id="about">
      <h2 className="about__title">About project</h2>
      <ul className="about__description">
        <li className="about__description-item">
          <h3 className="about__description-title">
            Project contains 5 stages
          </h3>
          <p className="about__description-content">
            Planning, working on the backend, layout, adding functionality and
            final improvements.
          </p>
        </li>
        <li className="about__description-item">
          <h3 className="about__description-title">It took 5 weeks</h3>
          <p className="about__description-content about__description-content_last">
            Each stage had a soft and hard deadline that had to be met in order
            to successfully finish the project.
          </p>
        </li>
      </ul>
      <ul className="about__duration">
        <li className="about__duration-item">
          <p className="about__duration-title about__duration-title_backend">
            1 week
          </p>
          <p className="about__duration-subtitle">Back-end</p>
        </li>
        <li className="about__duration-item">
          <p className="about__duration-title">4 weeks</p>
          <p className="about__duration-subtitle">Front-end</p>
        </li>
      </ul>
    </div>
  );
}

export default AboutProject;
