import React from 'react';
import SearchEngine from '../presentational/SearchEngine';
import { fetchCategory, getSearchbarFocus, leaveSearchbarFocus, setVisibilityFilter } from '../actions/actions';
import { connect } from 'react-redux';
import { setTimeout } from 'timers';

const selected = {
  color: "rgb(204, 0, 0)",
  textShadow: "0px -2px 2px rgb(245, 198, 46)"
}

const Header = ({
  onCharactersClick,
  onComicsClick,
  onSearchIconClick,
  searchbarFocus,
  onLeaveInput,
  selectedCategory,
  setFilter }) => {

  return(
    <div className="header">
      <h1>MARVEL HEROS</h1>
      <ul className="tabs">
        <li
          className="tab"
          onClick={onCharactersClick}
          style={selectedCategory.category === "characters" ? selected : null}>Characters</li>
        <li className="filter" onClick={setFilter} value="SHOW_IMAGES"> Photo </li>
        <li>
          <SearchEngine
            focus={searchbarFocus}
            displaySearchBar={onSearchIconClick}
            hideSearchBar={onLeaveInput}
            />
        </li>
        <li className="filter" onClick={setFilter} value="SHOW_DESCRIPTION"> Description </li>
        <li
          className="tab"
          onClick={onComicsClick}
          style={selectedCategory.category === "comics" ? selected : null} >Comics</li>
      </ul>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    searchbarFocus: state.actualPage.isFocused,
    selectedCategory: state.actualPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCharactersClick: () => {
      console.log('Fetching characters from Marvel\'s API');
      dispatch(fetchCategory('characters', 'characters?limit=20offset=0'));
    },
    onComicsClick: () => {
      console.log('Fetching comics from Marvel\'s API');
      dispatch(fetchCategory('comics', 'comics?limit=20offset=0'));
    },
    onSearchIconClick: () => {
      dispatch(getSearchbarFocus());
      setTimeout(() => {
        document.getElementById("search").focus();
      }, 200);
    },
    onLeaveInput: () => {
      document.getElementById("search").blur();
      setTimeout(() => {
        dispatch(leaveSearchbarFocus());
      }, 200);
    },
    setFilter: (e) => {
      console.log(e.target);
        dispatch(setVisibilityFilter(e.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
