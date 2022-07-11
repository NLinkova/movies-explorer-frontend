import React, { useState }from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [search, setSearch] = React.useState('');
  const [isSearchValid, setIsSearchValid] = React.useState(true);

  function handleSearchChange(e) {
      setSearch(e.target.value);
      setIsSearchValid(e.target.checkValidity())
  }

  function handleSearchSavedMovies(e) {
      e.preventDefault();

      props.onSearchSavedMovies(search);
  }

  function handleSearchMovies(e) {
      e.preventDefault();

      props.onSearchMovies(search);
  }

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
            placeholder='Фильм'
            name="search"
            required
            value={search || ''} onChange={handleSearchChange}
          />
          <button className='search__submit' type='submit'>Поиск</button>
        </fieldset>
        <div>
          <span className="search__input-error">{!isSearchValid && 'Нужно ввести ключевое слово'}</span>
        </div>
      </form>
      <div>
        <FilterCheckbox
        onChange={props.onShortMoviesCheck} isChecked={props.isChecked}
        />
      </div>
    </div>
  );
}

export default SearchForm;