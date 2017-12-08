import React from 'react';
import { setVisibilityFilter } from '../actions/actions';
import { connect } from 'react-redux';
import './ContainerFilters.css';

const selectedFilter = {
  color: "rgb(O, 0, 0)",
  textShadow: "0px 0px 15px #ffffff",
}

export const ContainerFilters = ({ setFilter, filter }) => {
  
  return (
    <div>
      <ul className="filterMenu">
        <li
          className="filter"
          onClick={setFilter}
          name="SHOW_IMAGES"
          style={filter.images ? selectedFilter : null}> Photo
        </li>
        <li className="filter"
          onClick={setFilter}
          name="SHOW_DESCRIPTION"
          style={filter.description ? selectedFilter : null}> Description
        </li>
      </ul>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    filter: state.visibilityFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilter: (e) => {
      dispatch(setVisibilityFilter(e.target.getAttribute("name")))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerFilters);