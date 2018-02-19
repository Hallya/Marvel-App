import { combineReducers } from 'redux';
import * as act from '../actions/actions';
import * as help from '../helpers/helpers';

const initialState = {
  lastFetchId: {
    characters: null,
    comics: null,
    relatedData: null,
  },
  cached : [],
  isFetching: false,
};

export function posts(state = initialState, action) {
  switch (action.type) {
    case act.REQUEST_POSTS:
      return {
        ...state,
        lastFetchId: {
          ...state.lastFetchId,
          [action.category]: action.requestId
        },
        isFetching: true,
        error: null,
      };
    case act.RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        cached : [...state.cached,
          {
            id: action.requestId,
            data: action.posts,
            receivedAt: action.receivedAt
          }
        ]
      }
    case act.SET_CURRENT_PAGE:
      return {
        ...state,
        lastFetchId: {
          ...state.lastFetchId,
          [action.category]: action.requestId
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

export function actualPage(state = {
  id: null,
  data: [],
  offset: 0,
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
        ...state,
        id: action.requestId,
        data: action.posts,
        offset: 0,
        isFetching: false,
        category: action.category,
        receivedAt: action.receivedAt
      }
    case act.ADD_MORE:
      let filteredResults = action.data.filter(obj => {
        return !help.getCache(obj.id, state.data);
      })
      return {
        ...state,
        isFetching: false,
        offset: state.offset + 20,
        data: [...state.data.concat(filteredResults)
        ]
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

export function actualProfil(state = {
  id: null,
  data: null,
  infosDisplayed: null,
  relatedData: {
    isFetching: false,
    actualRelatedData: [],
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
          lastFetchId: action.id
        }
      }
    case act.SET_RELATED_DATA:
      return {
        ...state,
        relatedData: {
          ...state.relatedData,
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
    case act.RESET_RELATED_DATA:
      return {
        ...state,
        relatedData: {
          ...state.relatedData,
          isFetching: false,
          lastFetchId: action.id,
          actualRelatedData: action.data,
        }
      }
    default:
      return state;
  }
}

export function relatedData(state = {data:null,displayed:false}, action) {
  switch (action.type) {
    case act.SET_DATA:
      return {
        ...state,
        data: action.data.data.results[0],
        displayed: true
      }
    case act.SET_DISPLAY_FALSE:
      return {
        ...state,
        displayed: false
      }
    default:
      return state;
  }
}

export function visibilityFilter(state = {
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
  visibilityFilter,
  relatedData
});

export default rootReducer;
