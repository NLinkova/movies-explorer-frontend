import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from '../../utils/useForm';
import Preloader from '../Preloader/Preloader';

import './Profile.css';

function Profile({ signOut, updateUser, isLoading, textError }) {
  // const currentUser = useContext(CurrentUserContext);
  //временное решение для разработки интерфейса
  const currentUser = {
    'name': 'Наталья',
    'email': 'email11@email.com'
  };
  const form = useForm({ name: currentUser.name, email: currentUser.email });

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({
      name: form.values.name,
      email: form.values.email,
    });
  }
  console.log(textError);


  if (isLoading) {
    return <Preloader />
  } else {
    return (
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
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
                value={form.values.email || ''}
                minLength="2"
                maxLength="40"
                required
              />
            </label>
            <span className="profile__error">{`${
              form.errors.email ? form.errors.email : ''
            }`}</span>
            {/* <span
              className={`profile__text-error ${
                textError && 'profile__text-error_visible'
              }`}
            >
              {textError && textError}
            </span> */}
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
          <button type="button" className="profile__out" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </div>
      </section>
    );
  }
}

export default Profile;
