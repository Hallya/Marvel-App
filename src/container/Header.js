import React from 'react';
import ContainerSearch from '../container/ContainerSearch';
import Filters from './ContainerFilters';
import { fetchOrGetCache } from '../actions/actions';
import { getConditions, createRequestId } from '../helpers/helpers';
import { connect } from 'react-redux';
import Alphabet from '../container/ContainerAlphabet';
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
  actualPage
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
          style={actualPage.category === "characters" ? selectedCat : null}> Characters
        </li>
        <li>
          <ContainerSearch
            focus={searchbarFocus}
            displaySearchBar={onSearchIconClick}
            hideSearchBar={onLeaveInput}
            />
        </li>
        <li
          className="tab"
          onClick={onComicsClick}
          id="comics"
          style={actualPage.category === "comics" ? selectedCat : null}> Comics
        </li>
        <li><Filters/></li>
      </ul>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    actualPage: state.actualPage,
    posts: state.posts
  }
}

const mapDispatchToProps = dispatch => {
  
  return {
    fetchOrGetCache: (id, category, lastFetch, reducer) => dispatch(fetchOrGetCache(id, category, lastFetch, reducer)),
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  
  const
    idChar = createRequestId("0", getConditions("ch")),
    idCom = createRequestId("0", getConditions("co")),
    characters = "characters",
    comics = "comics",
    lastFetch = stateProps.actualPage.id,
    storedCache = stateProps.posts.cached
  
  return {
    onCharactersClick: () => dispatchProps.fetchOrGetCache(idChar, characters, lastFetch, storedCache),
    onComicsClick: () => dispatchProps.fetchOrGetCache(idCom, comics, lastFetch, storedCache),
    actualPage: stateProps.actualPage
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header);