import React from 'react';
import { setVisibilityFilter } from '../actions/actions';
import { connect } from 'react-redux';
import './ContainerFilters.css';

const selectedFilter = {
  color: "rgb(O, 0, 0)",
  textShadow: "0px 0px 15px #ffffff",
}

class ContainerFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = { toggled: false }
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  
  toggleMenu() {
    this.setState({toggled: !this.state.toggled})
  }

  render() {
    return (
      <div>
        <div className={this.state.toggled ? "toggling_menu_hidden":"toggling_menu" } onClick={this.toggleMenu} >Filter</div>
        <ul className={this.state.toggled ? "filterMenu":"filterMenuHidden"} >
          <li
            className="filter"
            onClick={this.props.setFilter}
            name="SHOW_IMAGES"
            style={this.props.filter.images ? selectedFilter : null}> Photo
          </li>
          <li className="filter"
            onClick={this.props.setFilter}
            name="SHOW_DESCRIPTION"
            style={this.props.filter.description ? selectedFilter : null}> Description
          </li>
        </ul>
      </div>
    )
  }
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