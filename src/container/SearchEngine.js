import React from 'react';
import './SearchEngine.css';
import img from '../assets/search.svg';
import { getSearchbarFocus, leaveSearchbarFocus, fetchByLetter } from '../actions/actions';
import { connect } from 'react-redux';

const displayOn = {
  display: 'inherit'
}
const displayOff = {
  display: 'none'
}

const SearchEngine = ({ showSearchBar, hideSearchBar, focus, searchNamesStartingBy }) =>  (
  <div className="search__container">
    <div>
      <form onSubmit={searchNamesStartingBy}>
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
        onClick={showSearchBar}
        alt="Search for"
        id="glass"
        src={img}
        style={focus ? displayOff : displayOn}
      />
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    focus: state.actualPage.isFocused
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showSearchBar: () => {
      dispatch(getSearchbarFocus());
      setTimeout(() => {
        document.getElementById("search").focus();
      }, 200);
    },
    hideSearchBar: () => {
      document.getElementById("search").blur();
      setTimeout(() => {
        dispatch(leaveSearchbarFocus());
      }, 200);
    },
    searchNamesStartingBy: (e) => {
      e.preventDefault();
      console.log(e.target.textContent)
      // dispatch(fetchByLetter(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine);
