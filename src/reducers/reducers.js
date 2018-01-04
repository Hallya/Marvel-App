import { combineReducers } from 'redux';
import * as act from '../actions/actions';
import * as help from '../helpers/helpers';

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
    case act.ADD_MORE:
      let filteredResults = action.data.filter(comic => {
        return !help.checkItemsById(comic.id, state[action.category].items[0].data);
      })
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          isFetching: false,
          items: [
            {
              ...state[action.category].items[0],
              data: [
                ...state[action.category].items[0].data, ...filteredResults
              ]
            }]
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
  offset: {
    characters: 20,
    comics: 20
  },
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
        ...state,
        id: action.requestId,
        data: action.posts,
        isFetching: false,
        category: action.category,
        receivedAt: action.receivedAt
      }
    case act.ADD_MORE:
      let filteredResults = action.data.filter(comic => {
        return !help.checkItemsById(comic.id, state.data);
      })  
      return {
        ...state,
        isFetching: false,
        offset: {
          ...state.offset,
         [action.category]: state.offset[action.category] + 20
        },
        data: [...state.data.concat(filteredResults)
        ],
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

function relatedData(state = {data:null,displayed:false}, action) {
  switch (action.type) {
    case act.SET_RELATED_DATA:
      return {
        ...state,
        data: action.data,
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
  visibilityFilter,
  relatedData
});

export default rootReducer;
