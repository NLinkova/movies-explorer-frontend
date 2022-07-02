import React from 'react';
import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  onSubmit,
  searchValue,
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
            required
            value={searchValue}
          />
          <button className='search__submit' type='submit'>Поиск</button>
        </fieldset>
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