import React, { useState, useEffect }from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [search, setSearch] = useState('');
  const [isSearchValid, setIsSearchValid] = useState(true);
  const [shorts, setShorts] = useState(false);
  const [placeholderContent, setPlaceholderContent] = useState('Фильм');
  const { pathname } = useLocation();

  const handleCheckbox = () => {
    setShorts(!shorts);
    localStorage.setItem('shorts', !shorts);
  };

  function handleSearchChange(e) {
    setSearch(e.target.value);
    if (e.target.value) {
      setIsSearchValid(true);
    }
  }

  function handleSearchSavedMovies(e) {
    e.preventDefault();
    if (!search) {
      setIsSearchValid(false);
      return;
    }
    setIsSearchValid(true);
    setPlaceholderContent('Фильм');
    props.onSearchSavedMovies(search);
  }

  function handleSearchMovies(e) {
    e.preventDefault();

    if (!search) {
      setIsSearchValid(false);
      return;
    }
    setIsSearchValid(true);
    setPlaceholderContent('Фильм');
    props.onSearchMovies(search);
    localStorage.setItem('query', search);
  }
  useEffect(() => {
    if (pathname === '/movies') {
      const savedInputValue = localStorage.getItem('query');
      const savedShorts = JSON.parse(localStorage.getItem('shorts'));

      if (savedInputValue) {
        setSearch(savedInputValue);
      }

      if (savedShorts) {
        setShorts(savedShorts);
      }
    }
  }, []);

  return (
    <div className='search'>
      <form
        className='search__form'
        noValidate
        autoComplete='off'
        onSubmit={props.saved ? handleSearchSavedMovies : handleSearchMovies}
      >
        <fieldset className='search__field'>
          <input
            className='search__input'
            type='text'
            placeholder={placeholderContent}
            name="search"
            required
            value={search} onChange={handleSearchChange}
          />
          <button className='search__submit' type='submit'>Поиск</button>
        </fieldset>
        <div>
          <span className={`search__input-error ${isSearchValid ? 'search__input-error_hidden' : ''}`}>Нужно ввести ключевое слово</span>
        </div>
      </form>
      <div>
        <FilterCheckbox
        onChange={handleCheckbox} isChecked={props.isChecked} value={shorts}
        />
      </div>
    </div>
  );
}

export default SearchForm;