import { connect } from 'react-redux';
import {
  getSearchbarFocus,
  leaveSearchbarFocus,
  fetchByLetter } from '../actions/actions';
import SearchEngine from '../components/SearchEngine';

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
    searchNamesStartingBy: (input) => {
      dispatch(fetchByLetter(input));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine);