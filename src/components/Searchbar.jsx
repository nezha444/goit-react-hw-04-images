import React, { useState } from 'react';
import '../styles.css';

export const Searchbar = ({ submitForm }) => {
  const [search, setSearch] = useState('');
  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    submitForm(search);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm " onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
