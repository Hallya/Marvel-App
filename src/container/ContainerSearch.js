import { connect } from 'react-redux';
import {
  getSearchbarFocus,
  leaveSearchbarFocus,
  requestFetch,
  receiveFetch,
  setCurrentPage,
  fetchContent
} from '../actions/actions';

import {
  createRequestId,
  getCache,
  getConditions,
  doubleRequest
} from '../helpers/helpers';

import SearchEngine from '../components/SearchEngine';


const mapStateToProps = state => {
  return {
    focus: state.actualPage.isFocused,
    posts: state.posts
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
    requestFetch: (category, requestId) => dispatch(requestFetch(category, requestId)),
    receiveFetch: (category, data, requestId) => dispatch(receiveFetch(category, data, requestId)),
    setCurrentPage: (requestId, category, data) => dispatch(setCurrentPage(requestId, category, data))
  }
}

const mergeToProps = (stateProps, dispatchProps) => {

  const
    { requestFetch, receiveFetch, setCurrentPage } = dispatchProps,
    { posts } = stateProps;

  return {
    searchNamesStartingBy: input => {
      const requestId = createRequestId(input, getConditions("search"));
      const category = "characters";
      if (!doubleRequest(requestId, posts.lastFetchId.characters)) {

        const cache = getCache(requestId, posts.cached)
        if (cache) {
          return setCurrentPage(requestId, category, cache);
        }
        requestFetch(category, requestId);
        fetchContent(requestId)
          .then(data => receiveFetch(category, data, requestId))
          .catch(error => console.error(error))
      }
      return;
    },
    showSearchBar: dispatchProps.showSearchBar,
    hideSearchBar: dispatchProps.hideSearchBar,
    focus: stateProps.focus
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeToProps)(SearchEngine);