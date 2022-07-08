import React, { useState }from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  onSubmit,
  searchValue,
  setSearchValue,
  inputError,
  setInputError,
  isShortFilms,
  setIsShortFilms,
}) {

  return (
    <div className='search'>
      <form
        className='search__form'
        noValidate
        autoComplete='off'
        onSubmit={onSubmit}
      >
        <fieldset className='search__field'>
          <input
            className='search__input'
            type='text'
            placeholder='Фильм'
            name="search"
            required
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onClick={() => setInputError('')}
          />
          <button className='search__submit' type='submit'>Поиск</button>
        </fieldset>
        <div>
          <span className="search__input-error">{inputError}</span>
        </div>
      </form>
      <div>
        <FilterCheckbox
          isShortFilms={isShortFilms}
          setIsShortFilms={setIsShortFilms}
        />
      </div>
    </div>
  );
}

export default SearchForm;