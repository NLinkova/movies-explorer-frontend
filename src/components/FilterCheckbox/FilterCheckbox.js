import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <div className="filter">
      <label className="filter__checkbox">
        <input
          type="checkbox"
          className="filter__input"
          onChange={props.onChange} checked={props.isChecked}
        />
        <span className="filter__round" />
      </label>
      <p className="filter__title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
