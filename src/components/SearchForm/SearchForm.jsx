import React, { useState }from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  runSearch,
  runSearchSavedMovies,
  page,
  searchTrigger,
  onFilter,
  isShortMovie,
}) {
  const [inputSearch, setInputSearch] = useState('');
  const [isValid, setIsValid] = useState(true);

  function handleChange(e) {
    setInputSearch(e.target.value);
    if (e.target.value) {
      setIsValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e)
    const strSearch = inputSearch.toLowerCase();
    if (inputSearch) {
      searchTrigger(true);
      setIsValid(true);
      if (page === 'movies') {
        runSearch(strSearch);
        return;
      }
      if (page === 'saved-movies') {
        runSearchSavedMovies(strSearch);
        return;
      }
    }
    setIsValid(false);
  }

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
            placeholder='Фильм'
            name="search"
            required
            onChange={handleChange}
            value={inputSearch}
          />
          <button className='search__submit' type='submit'>Поиск</button>
        </fieldset>
        <div>
          <span className="search__input-error">{!isValid && 'Нужно ввести ключевое слово'}</span>
        </div>
      </form>
      <div>
        <FilterCheckbox
          page={page}
          isShortMovie={isShortMovie}
          onFilter={onFilter}
        />
      </div>
    </div>
  );
}

export default SearchForm;