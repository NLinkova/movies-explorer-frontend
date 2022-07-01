import React from "react";
import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <div className="not-found__container">
        <p className="not-found__error">404</p>
        <p className="not-found__text">Страница не найдена</p>
        <p className="not-found__back" onClick={() => navigate(-1)}>
          Назад
        </p>
      </div>
    </section>
  );
}

export default NotFoundPage;
