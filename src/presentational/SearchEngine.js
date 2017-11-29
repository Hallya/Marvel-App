import React from 'react';
import style from '../css/styles.css';
import img from '../assets/search.svg';

const displayOn = {
  display: 'inherit'
}
const displayOff = {
  display: 'none'
}

const SearchEngine = ({ displaySearchBar, hideSearchBar, focus }) =>  (
  <div className="search__container">
    <div>
      <form>
        <input
          id="search"  
          className="search"
          style={focus ? displayOn : displayOff}
          onBlur={hideSearchBar}
        />
      </form>
    </div>
    <div>
      <img
        onClick={displaySearchBar}
        id="glass"
        src={img}
        style={focus ? displayOff : displayOn}
      />
    </div>
  </div>
);

export default SearchEngine;
