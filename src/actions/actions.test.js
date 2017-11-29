// import { fetchCategory } from './actions';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import * as act from '../actions/actions';

describe('Describe => ', () => {
  
  const initialState = {
    characters: {
      lastFetchId: null,
      items: [],
      isFetching: false,
    },
    comics: {
      lastFetchId: null,
      items: [],
      isFetching: false,
    },
  };
  function posts(state = initialState, action) {
    switch (action.type) {
      case act.SET_CURRENT_PAGE:
        return {
          ...state,
          actualPage: action.data
        };
      case act.REQUEST_POSTS:
        return {
          ...state,
          [action.category]: {
            ...state[action.category],
            lastFetchId: action.requestId,
            isFetching: true,
            error: null,
          }
        };
      case act.RECEIVE_POSTS:
        return {
          ...state,
          [action.category]: {
            ...state[action.category],
            isFetching: false,
            items: [...state[action.category].items,
            {
              id: action.requestId,
              data: action.posts,
              receivedAt: action.receivedAt
            }
            ]
          }
        }
      case act.ERROR_POSTS:
        return {
          ...state,
          [action.category]: {
            ...state[action.category],
            isFetching: false,
            error: action.error,
          }
        };
      default:
        return state;
    }
  }
  const rootReducer = combineReducers({
    posts,
  });
  const store = createStore(rootReducer);







  test('Test n°1', () => {
    expect.assertions(1);
    const checkState = (category, store) => {
    
      const { getState } = store;
      const { posts } = getState;
      // const cat = posts[category];
      // const { lastFetchId } = cat;
      return posts;
    }
    expect(checkState('characters', store)).toEqual({});
  });
  
  
  test('Test n°2', () => {
    expect.assertions(1);
    const { getState } = store;
    const { posts } = getState();
    expect(posts).toEqual({});
  });
  
  test('Test n°3', () => {
    expect.assertions(1);

    const fetchCategory = (category, requestId) => (dispatch, getState) => {
      const { posts } = getState;
      expect(getState).toBe({});
      const cat = posts[category];
      const {lastFetchId} = cat;
      let found;

      if (lastFetchId && lastFetchId === requestId) {
        return;
      }

      if (checkForItems(cat)) {
        found = cat.items.find(cat => cat.id === requestId);
      }

      if (found) {
        return dispatch(setCurrentPage(found));
      }

      dispatch(requestFetch(category, requestId));

      const headers = new Headers();
      headers.set('Referer', 'http://localhost:8000/');

      return fetch(`https://gateway.marvel.com/v1/public/${requestId}&apikey=dadf1ca6c54468f0ed5cdbb80d4b1f97`, {
          headers,
        })
        .then(data => data.json())
        .then(json => dispatch(receiveFetch(category, json, requestId)))
        .catch(error => dispatch(errorFetch(category, error)));
    };
    fetchCategory();  
  })
});