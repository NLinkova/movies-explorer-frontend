import './FilterCheckbox.css';

function FilterCheckbox({ page, onFilter, isShortMovie }) {
  function handleOnFilter() {
    onFilter(page);
  }
  return (
    <div className="filter">
      <label className="filter__checkbox">
        <input
          type="checkbox"
          className="filter__input"
          onClick={handleOnFilter}
        />
        <span className="filter__round" />
      </label>
      <p className="filter__title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
