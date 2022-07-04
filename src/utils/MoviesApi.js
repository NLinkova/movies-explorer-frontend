import { URL_BEATFILM } from '../constants/constants';

class MoviesApi {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Something wrong: ${res.status}`);
  }

  // Получение начальных карточек
  getAllMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: URL_BEATFILM,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;