import React from 'react';
import img from '../assets/search.svg';
import './Search.css';

const displayOn = {
  display: 'inherit'
}
const displayOff = {
  display: 'none'
}

const Search = props => (
  <div className="search__container">
    <div>
      <form id='form' onSubmit={props.fetchHeros}>
        <input
          id="search"
          className="search"
          type="text"
          onChange={props.getInput}
          style={props.focus ? displayOn : displayOff}
          onBlur={props.hideSearchBar}
        />
      </form>
    </div>
    <div>
      <img
        onClick={props.showSearchBar}
        alt="Search for"
        id="glass"
        src={img}
        style={props.focus ? displayOff : displayOn}
      />
    </div>
  </div>
);

export default Search;