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
  data: [],
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
        isFetching: true,
        category: action.category
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

function actualProfil(state = {
  id: null,
  data: null,
  infosDisplayed: null,
  relatedData: {
    isFetching: false,
    actualRelatedData: null,
    previousRelatedData: []
  }
}, action) {

  switch (action.type) {
    case act.SET_PROFIL:
      return {
        ...state,
        id: action.id,
        data: action.data
      }
    case act.SET_INFO:
      return {
        ...state,
        infosDisplayed: action.value
      }
    case act.REQUEST_RELATED_DATA:
      return {
        ...state,
        relatedData: {
          ...state.relatedData,
          isFetching: true,
        }
      }
    case act.SET_RELATED_COMICS:
      return {
        ...state,
        relatedData: {
          isFetching: false,
          actualRelatedData: action.data,
          previousRelatedData: [
            ...state.relatedData.previousRelatedData,
            {
              id: action.id,
              data: action.data
            }
          ]
        }
      }
    case act.RESET_RELATED_COMICS:
      return {
        ...state,
        relatedData: {
          ...state.relatedData,
          isFetching: false,
          actualRelatedData: action.data,
        }
      }
    default:
      return state;
  }
}

function visibilityFilter(state = {
  images: false,
  description: false
}, action) {
  switch (action.filter) { 
    case act.VisibilityFilters.SHOW_DESCRIPTION:  
      return {
        ...state,
        description: !state.description
      }
    case act.VisibilityFilters.SHOW_IMAGES:
      return {
        ...state,
        images: !state.images
      } 
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  actualPage,
  actualProfil,
  posts,
  visibilityFilter
});

export default rootReducer;
