import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from '../../utils/useForm';
import Preloader from '../Preloader/Preloader';

import './Profile.css';

function Profile({ signOut, updateUser, isLoading, textError }) {
  const currentUser = useContext(CurrentUserContext);
  const form = useForm({ name: currentUser.name, email: currentUser.email });

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({
      name: form.values.name,
      email: form.values.email,
    });
  }
  console.log(textError);
  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__field">
            <span className="profile__name">Имя</span>
            <input
              className="profile__input"
              name="name"
              type="text"
              onChange={form.handleChange}
              value={form.values.name || ''}
              minLength="2"
              maxLength="40"
              required
              placeholder="Имя"
            />
          </label>
          <div className="profile__error">{`${
            form.errors.name ? form.errors.name : ''
          }`}</div>
          <div className="profile__line"></div>
          <label className="profile__field">
            <span className="profile__name">Почта</span>
            <input
              className="profile__input"
              name="email"
              type="email"
              onChange={form.handleChange}
              value={form.values.email || ''}
              minLength="2"
              maxLength="40"
              required
              placeholder="Почта"
            />
          </label>
          <div className="profile__error">{`${
            form.errors.email ? form.errors.email : ''
          }`}</div>
          <div className="profile__preloader">{isLoading && <Preloader />}</div>
          <span
            className={`profile__text-error ${
              textError && 'profile__text-error_visible'
            }`}
          >
            {textError && textError}
          </span>
          <button
            type="submit"
            className={`profile__btn-edit ${
              !form.isValid && 'profile__btn-edit_disabled'
            }`}
            disabled={!form.isValid}
          >
            Редактировать
          </button>
        </form>
        <button type="button" className="profile__out" onClick={signOut}>
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
