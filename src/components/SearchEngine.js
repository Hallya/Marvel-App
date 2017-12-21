import React from 'react';
import Search from '../presentational/Search';

class SearchEngine extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = { textInput: null }
    this.getInput = this.getInput.bind(this);
    this.fetchHeros = this.fetchHeros.bind(this);
  }
  getInput(e) {
    this.setState({textInput: e.target.value})
  }

  fetchHeros(e) {
    e.preventDefault();
    this.props.searchNamesStartingBy(this.state.textInput);
    document.getElementById('form').reset();
  }

  render() {
    return <Search
      inputValue={this.state.textInput}
      fetchHeros={this.fetchHeros}
      getInput={this.getInput}
      {...this.props} />
  }
}

export default SearchEngine;
