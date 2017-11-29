import { combineReducers } from 'redux';
import * as act from '../actions/actions';

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

function actualPage(state = {
  id: null,
  data: {},
  receivedAt: null,
  isFocused: false
}, action) {

  switch (action.type) {
    case act.SET_CURRENT_PAGE:
      return {
        ...state,
        id: action.requestId,
        category: action.category,
        data: action.data.data,
        receivedAt: action.receivedAt
      };
    case act.REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case act.RECEIVE_POSTS:
      return {
        id: action.requestId,
        isFetching: false,
        category: action.category,
        data: action.posts,
        receivedAt: action.receivedAt
      }
    case act.GET_SEARCHBAR_FOCUS:
      return {
        ...state,
        isFocused: true
      }
    case act.LEAVE_SEARCHBAR_FOCUS:
      return {
        ...state,
        isFocused: false
      }
    default:
      return state;
  }
}

function visibilityFilter(state = act.VisibilityFilters.SHOW_ALL, action) {
  console.log(action);
  switch (action.filter) { 
    case act.VisibilityFilters.SHOW_ALL:
      return act.VisibilityFilters.SHOW_ALL
    case act.VisibilityFilters.SHOW_DESCRIPTION:
      return act.VisibilityFilters.SHOW_DESCRIPTION  
    case act.VisibilityFilters.SHOW_IMAGES:
      return act.VisibilityFilters.SHOW_IMAGES 
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  actualPage,
  posts,
  visibilityFilter
});

export default rootReducer;
