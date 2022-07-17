import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ handleSearch }) {
  const [inputValue, setInputValue] = useState('');
  const [shorts, setShorts] = useState(false);

  const [placeholderContent, setPlaceholderContent] = useState('Фильм');
  const [error, setError] = useState(false);
  const { pathname } = useLocation();

  const handleInput = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleCheckbox = () => {
    setShorts(!shorts);
    handleSearch(inputValue, !shorts);
    if (pathname === '/movies') {
    localStorage.setItem('shorts', !shorts);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!inputValue) {
      setError(true);
      evt.target.elements['search-query'].focus();
      return;
    }
    setError(false);
    setPlaceholderContent('Фильм');
    localStorage.setItem('query', inputValue);
    handleSearch(inputValue, shorts);
  };

  useEffect(() => {
    if (pathname === '/movies') {
      const savedInputValue = localStorage.getItem('query');
      const savedShorts = JSON.parse(localStorage.getItem('shorts'));
      if (savedInputValue) {
        setInputValue(savedInputValue);
      }
      if (savedShorts) {
        setShorts(savedShorts);
      }
      if (savedInputValue || (savedShorts === true)) {
        handleSearch(savedInputValue, savedShorts);
      }
    }
  }, []);

  return (
    <div className='search'>
      <form
        className='search__form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <fieldset className='search__field'>
          <input
            className='search__input'
            type='text'
            id="search-query"
            name="search-query"
            required
            placeholder={placeholderContent}
            onChange={handleInput}
            value={inputValue}
          />
          <button className='search__submit' type='submit'>Поиск</button>
        </fieldset>
        <div>
          <span className={`search__input-error ${!error ? 'search__input-error_hidden' : ''}`}>Нужно ввести ключевое слово</span>
        </div>
      </form>
      <div>
        <FilterCheckbox
          value={shorts}
          onChange={handleCheckbox}
        />
      </div>
    </div>
  );
}

export default SearchForm;