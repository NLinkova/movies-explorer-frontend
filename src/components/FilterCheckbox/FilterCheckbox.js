import "./FilterCheckbox.css";
import React from "react";

function FilterCheckbox({ value, onChange }) {
  return (
    <div className="filter" htmlFor="shorts">
      <label className="filter__checkbox">
        <input
          type="checkbox"
          className="filter__input"
          checked={value}
          onChange={onChange}
        />
        <span className="filter__round" />
      </label>
      <p className="filter__title">Short movies</p>
    </div>
  );
}

export default FilterCheckbox;
