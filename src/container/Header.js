import React from 'react';
import SearchEngine from './SearchEngine';
import Filters from './ContainerFilters';
import { fetchCategory } from '../actions/actions';
import { connect } from 'react-redux';
import Alphabet from '../components/Alphabet';
import './Header.css';

const selectedCat = {
  color: "rgb(204, 0, 0)",
  textShadow: "0px -2px 2px rgb(245, 198, 46)"
};

const Header = ({
  onCharactersClick,
  onComicsClick,
  onSearchIconClick,
  onLeaveInput,
  searchbarFocus,
  selectedCategory
}, ) => {
  return(
    <div className="header">
      <h1>MARVEL HEROS</h1>
      <ul className="tabs">
        <Alphabet/>
        <li
          className="tab"
          onClick={onCharactersClick}
          id="characters"
          style={selectedCategory.category === "characters" ? selectedCat : null}> Characters
        </li>
        <li>
          <SearchEngine
            focus={searchbarFocus}
            displaySearchBar={onSearchIconClick}
            hideSearchBar={onLeaveInput}
            />
        </li>
        <li
          className="tab"
          onClick={onComicsClick}
          id="comics"
          style={selectedCategory.category === "comics" ? selectedCat : null}> Comics
        </li>
        <li><Filters/></li>
      </ul>
    </div>
  )
};

const mapStateToProps = state => {
  return {
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);