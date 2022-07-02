import logo from '../../images/logo.svg';

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../utils/useForm';
import './Form.css';

const Form = memo(
  ({
    name,
    title,
    onSubmit,
    isLoading,
    btnName,
    textError,
  }) => {
    const form = useForm();

    return (
      <form
        className="form"
        name={`form_${name}`}
        noValidate
        onSubmit={(e) =>
          onSubmit(e, {
            name: form.values.name,
            email: form.values.email,
            password: form.values.password,
          })
        }
      >
        <div className="form__container">
          <Link to="/">
            <img className="form__logo" alt="Логотип" src={logo}></img>
          </Link>
          <h2 className="form__title">{title}</h2>
          {name === 'sign-up' && (
            <>
              <label className="form__field" htmlFor="form-name-">
                Имя
              </label>
              <input
                type="text"
                className="form__input"
                id={`form-name-${name}`}
                name="name"
                minLength="2"
                maxLength="30"
                required
                onChange={form.handleChange}
              />
              <span className="form__error">{`${
                form.errors.name ? form.errors.name : ''
              }`}</span>
            </>
          )}
          <label className="form__field" htmlFor="form-email-">
            E-mail
          </label>
          <input
            type="email"
            className="form__input"
            id={`form-email-${name}`}
            name="email"
            minLength="5"
            maxLength="30"
            required
            onChange={form.handleChange}
          />
          <span className="form__error">{`${
            form.errors.email ? form.errors.email : ''
          }`}</span>
          <label className="form__field" htmlFor="form-password-">
            Пароль
          </label>
          <input
            type="password"
            className="form__input"
            id={`form-password-${name}`}
            name="password"
            minLength="8"
            required
            onChange={form.handleChange}
          />
          <span className="form__error">{`${
            form.errors.password ? form.errors.password : ''
          }`}</span>
          {/* <span
            className={`form__text-error ${
              textError && 'form__text-error_visible'
            }`}
          >
            {textError && textError}
          </span> */}
          <button
            type="submit"
            className={`form__btn ${!form.isValid && 'form__btn_disabled'} ${name === 'sign-in' && 'form__btn_login'}`}
            disabled={!form.isValid}
          >
            {btnName}
          </button>
          {name === 'sign-up' && (
            <p className="form__text">
              Уже зарегистрированы?{' '}
              <Link to="/sign-in" className="form__link">
                Войти
              </Link>
            </p>
          )}
          {name === 'sign-in' && (
            <p className="form__text">
              Еще не зарегистрированы?{' '}
              <Link to="/sign-up" className="form__link">
                Регистрация
              </Link>
            </p>
          )}
        </div>
      </form>
    );
  }
);

export default Form;
