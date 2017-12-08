import React from 'react';

const selectedFilter = {
  color: "rgb(O, 0, 0)",
  textShadow: "0px 0px 15px #ffffff",
}
const unselectedFilter = {
  color: "black",
}

const ContainerFilters = ({setFilter, filter}) => {
  return (
    <div>
      <ul className="filterMenu">
        <li
          className="filter"
          onClick={setFilter}
          name="SHOW_IMAGES"
        style={filter.images ? selectedFilter : unselectedFilter}
        >Photo
        </li>
        <li className="filter"
          onClick={setFilter}
          name="SHOW_DESCRIPTION"
        style={filter.description ? selectedFilter : unselectedFilter}
        > Description
        </li>
      </ul>
    </div>
  )
};

export default ContainerFilters;