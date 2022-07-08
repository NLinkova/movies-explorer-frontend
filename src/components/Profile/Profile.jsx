import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from '../../utils/useForm';
import Preloader from '../Preloader/Preloader';

import './Profile.css';

function Profile({
  handleLogout,
  editProfile,
  isEditError,
  isEditDone,}) {
  const currentUser = useContext(CurrentUserContext);

  const form = useForm();
  const { email, name } = form.values;

  React.useEffect(() => {
    form.setValues({
      email: currentUser.email,
      name: currentUser.name,
    });
  }, [currentUser]);

  const submitEditProfile = (event) => {
    event.preventDefault();
    editProfile(name, email);
  };
    return (
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, {currentUser && currentUser.name}!</h1>
          <form className="profile__form" onSubmit={submitEditProfile}>
            <label className="profile__field">
              <span className="profile__name">Имя</span>
              <input
                className="profile__input"
                name="name"
                type="text"
                onChange={form.handleChange}
                value={name || ''}
                minLength="2"
                maxLength="40"
                required
              />
            </label>
            <span className="profile__error">{`${
              form.errors.name ? form.errors.name : ''
            }`}</span>
            <label className="profile__field">
              <span className="profile__name">E-mail</span>
              <input
                className="profile__input"
                name="email"
                type="email"
                onChange={form.handleChange}
                value={email || ''}
                minLength="2"
                maxLength="40"
                required
              />
            </label>
            <span className="profile__error">{`${
              form.errors.email ? form.errors.email : ''
            }`}</span>
           {isEditError && (
            <p className="profile__error">Ошибка обновления данных</p>
          )}
          {isEditDone && (
            <p className="profile__error">Данные успешно обновлены</p>
          )}
            <button
              type="submit"
              className={`profile__btn ${
                !form.isValid && 'profile__btn_disabled'
              }`}
              disabled={!form.isValid}
            >
              Редактировать
            </button>
          </form>
          <button type="button" className="profile__out" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </section>
    );
  }

export default Profile;