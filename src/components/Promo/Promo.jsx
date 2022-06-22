import React from "react";
import "./Promo.css";
import www from "../../images/landing-logo.svg";

function Promo() {
  return (
    <div className="promo">
      <div className="promo__wrapper">
        <div className="promo__text-content">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <h3 className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </h3>
          <button className="promo__learn-more">Узнать больше</button>
        </div>
        <img src={www} alt="картинка глобуса" className="promo__image" />
      </div>
    </div>
  );
}

export default Promo;
