import * as help from '../helpers/helpers'
const headers = new Headers();
headers.set('Referer', 'http://localhost:8000/');

export const REQUEST_RELATED_DATA = 'REQUEST_RELATED_DATA';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_MORE = 'ADD_MORE';
export const SET_RELATED_DATA = 'SET_RELATED_DATA';
export const SET_DATA = 'SET_DATA';
export const SET_DISPLAY_FALSE = 'SET_DISPLAY_FALSE';
export const RESET_RELATED_DATA = 'RESET_RELATED_DATA';
export const ERROR_POSTS = 'ERROR_POSTS';
export const SET_INFO = 'SET_INFO';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const REQUEST_ALREADY_FETCHING = 'REQUEST_ALREADY_FETCHING';
export const GET_SEARCHBAR_FOCUS = 'GET_SEARCHBAR_FOCUS';
export const LEAVE_SEARCHBAR_FOCUS = 'LEAVE_SEARCHBAR_FOCUS';
export const SET_PROFIL = 'SET_PROFIL';
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_IMAGES: 'SHOW_IMAGES',
  SHOW_DESCRIPTION: 'SHOW_DESCRIPTION',
};

export const actualiseProfil = dispatch => data => dispatch(setProfil(data.id, data))

export const getProfil = state => id => {
  
  const
  { actualPage } = state,
  { actualProfil } = state,
  { data } = actualPage,
  lastId = actualProfil.id;

  if (lastId === id) {
    return;
  }
  const found = data.find(item => item.id === Number(id));
  if (found) {
    return found;
  }

  console.error(`No data found`);
  return;
}

export function getSearchbarFocus() {
  return {
    type: GET_SEARCHBAR_FOCUS
  };
}
export function leaveSearchbarFocus() {
  return {
    type: LEAVE_SEARCHBAR_FOCUS
  };
}

export function resetRelatedData(id, data) {
  return {
    type: RESET_RELATED_DATA,
    data,
    id
  }
}

export function setData(id, data) {
  return {
    type: SET_DATA,
    data,
    id
  }
}

export function setRelatedData(id, data) {
  return {
    type: SET_RELATED_DATA,
    data: data.data.results,
    id
  }
}
export function setProfil (id, data){
  return {
    type: SET_PROFIL,
    id,
    data
  }
}
export function setVisibilityFilter(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
}
export function setInfo(value)  {
  return {
    type: SET_INFO,
    value
  }
}
export function setCurrentPage(requestId, category, data) {
  return {
    type: SET_CURRENT_PAGE,
    requestId,
    category,
    data,
    receivedAt: Date()
  };
}

export const setFalseOnDisplay = () => {
  return {
    type: SET_DISPLAY_FALSE
  };
}


export const requestRelatedData = (id) => ({
  type: REQUEST_RELATED_DATA,
  id
});
export const requestFetch = (category, requestId) => ({
  type: REQUEST_POSTS, category, requestId
});
export const receiveFetch = (category, json, requestId) => ({ 
  type: RECEIVE_POSTS,
  posts: json.data.results,
  receivedAt: Date(),
  category,
  requestId
});
export const addMore = (category, data) => ({
  type: ADD_MORE,
  data: data.data.results,
  category,
})

export const newError = (category, error) => ({
  type: ERROR_POSTS,
  category,
  error
})


export const fetchOrGetCache = (id, category, lastFetch, storedCache) => async dispatch => {
  
  if (!help.doubleRequest(id, lastFetch)) {
    
    const cache = help.getCache(id, storedCache)
    
    if (cache) {
      return dispatch(setCurrentPage(id, category, cache));
    }
    dispatch(requestFetch(id, category));
    const data = await fetchContent(id);
    dispatch(receiveFetch(category, data, id));
  }
  return;
}



export const fetchContent = id => {
  
  return fetch(`https://gateway.marvel.com/v1/public/${id}apikey=dadf1ca6c54468f0ed5cdbb80d4b1f97`)
    .then(data => data.json(),
    error => console.log(error))
}