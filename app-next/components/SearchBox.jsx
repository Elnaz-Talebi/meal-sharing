import React from "react";
import "./SearchBox.css";

function SearchBox({ value, onChange, onSubmit, placeholder }) {
  return (
    <form onSubmit={onSubmit} className="searchbox-form">
      <input
        className="searchbox-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button className="searchbox-button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBox;
