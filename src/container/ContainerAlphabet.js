import {
  requestFetch,
  receiveFetch,
  fetchContent,
  setCurrentPage
} from '../actions/actions';
  
import {
  createRequestId,
  getCache,
  getConditions,
  doubleRequest
} from '../helpers/helpers';
  
import { connect } from 'react-redux';
import Alphabet from '../components/Alphabet';

const mapDispatchToProps = dispatch => {
  return {
    requestFetch: (category, requestId) => dispatch(requestFetch(category, requestId)),
    receiveFetch: (category, data, requestId) => dispatch(receiveFetch(category, data, requestId)),
    setCurrentPage: (requestId, category, data) => dispatch(setCurrentPage(requestId, category, data))
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

const mergeToProps = (stateProps, dispatchProps) => {

  const
    { requestFetch, receiveFetch, setCurrentPage } = dispatchProps,
    { posts } = stateProps;
  
  return {
    fetchByLetter: e => {
      const requestId = createRequestId(e.target.textContent.replace(' ', ''), getConditions("search"));
      const category = "characters";
      if (!doubleRequest(requestId, posts.lastFetchId.characters)) {
        
        const cache = getCache(requestId, posts.cached)
        if (cache){
          return setCurrentPage(requestId, category, cache);
        }
        requestFetch(category, requestId);
        fetchContent(requestId)
          .then(data => receiveFetch(category, data, requestId))
          .catch(error => console.error(error))
      }
      return;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeToProps)(Alphabet);