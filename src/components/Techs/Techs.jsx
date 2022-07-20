import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <div className="techs">
      <h2 className="techs__title" id="techs">
        Technologies
      </h2>
      <h3 className="techs__subtitle"> 7 technologies</h3>
      <p className="techs__text">
        On the web development course, we learned the technologies that we used
        in the graduation project.
      </p>
      <ul className="techs__list">
        <li className="techs__list-item">HTML</li>
        <li className="techs__list-item">CSS</li>
        <li className="techs__list-item">JS</li>
        <li className="techs__list-item">React</li>
        <li className="techs__list-item">Git</li>
        <li className="techs__list-item">Express.js</li>
        <li className="techs__list-item">MongoDB</li>
      </ul>
    </div>
  );
}

export default Techs;
