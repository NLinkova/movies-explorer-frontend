import React from "react";
import "./Promo.css";
import www from "../../images/landing-logo.svg";

function Promo() {
  const scroll = () => {
    const section = document.getElementById("about");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="promo">
      <div className="promo__wrapper">
        <div className="promo__text-content">
          <h1 className="promo__title">Video library service</h1>
          <h3 className="promo__subtitle">
            Sign up and browse movies, save them to favorites. Enjoy
          </h3>
          <button className="promo__learn-more" onClick={scroll}>
            About project
          </button>
        </div>
        <img src={www} alt="картинка глобуса" className="promo__image" />
      </div>
    </div>
  );
}

export default Promo;
