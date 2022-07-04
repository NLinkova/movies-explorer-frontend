import { URL_MAIN } from '../constants/constants';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Something wrong: ${res.status}`);
  }

  _getHeaders() {
    const jwt = localStorage.getItem("jwt");
    return {
      Authorization: `Bearer ${jwt}`,
      ...this._headers,
    };
  }

register (name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, email, password,
      }),
    }).then(this._checkResponse);
  };

 authorize (email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email, password
      }),
    }).then(this._checkResponse);
  };

  getUserToken(jwt){
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  };

  // Получение юзером всех своих сохранненых карточек
  getUserMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  // Сохранение на сервере фильма юзера
  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._getHeaders(),
      method: 'POST',
      body: JSON.stringify(movie),
    }).then(this._checkResponse);
  }

  // Удаление на сервере фильма юзера
  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  // Получение с сервера информация о пользователе
  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  // Сохранение на сервере информация о пользователе
  saveUserInfoToServer(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(this._checkResponse);
  }
}

 const mainApi = new MainApi({
  baseUrl: URL_MAIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;