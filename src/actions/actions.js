import * as help from '../helpers/helpers'
const headers = new Headers();
headers.set('Referer', 'http://localhost:8000/');

export const REQUEST_RELATED_DATA = 'REQUEST_RELATED_DATA';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SET_RELATED_COMICS = 'SET_RELATED_COMICS';
export const RESET_RELATED_COMICS = 'RESET_RELATED_COMICS';
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

export const getProfil = (id) => (dispatch, getState) => {
  const { actualPage } = getState(),
        { actualProfil } = getState(),
        { data } = actualPage,
    lastId = actualProfil.id;
  if (lastId === id) return;
  let found = data.find(item => item.id === Number(id))
  if (found) {
    console.log(`You have selected ${found.name}`)
    return dispatch(setProfil(id, found))
  }
  return console.error(`Character's data found: ${found}`)
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

export function resetRelatedComics(data) {
  return {
    type: RESET_RELATED_COMICS,
    data
  }
}

export function setRelatedComics(id, data) {
  return {
    type: SET_RELATED_COMICS,
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


export const requestRelatedComics = (id) => ({
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


export const fetchCategory = (category, requestId) => (dispatch, getState) => { 

  const
    { posts, actualPage } = getState(),
    cat = posts[category],
    { lastFetchId } = cat,
    { id } = actualPage;

  let found;

  if (lastFetchId && id === requestId) {
    return;
  }

  found = help.checkForItems(cat.items) ?
    help.checkItemsById(requestId, cat.items) : null;
  if (found) return dispatch(setCurrentPage(requestId, category, found));

  dispatch(requestFetch(category, requestId));

  return fetch(`https://gateway.marvel.com/v1/public/${requestId}&apikey=dadf1ca6c54468f0ed5cdbb80d4b1f97`).then(data => data.json())
    .then(
    json => dispatch(receiveFetch(category, json, requestId)),
    error => console.log(error)
    );
};


export const fetchRelatedComics = characterId => (dispatch, getState) => {
  
  const
    { actualProfil } = getState(),
    { relatedData } = actualProfil,
    { id } = actualProfil,
    { previousRelatedData } = relatedData;
    let found;

  if (id && id === characterId) return;
  found = help.checkForItems(previousRelatedData) ?
    help.checkItemsById(characterId, previousRelatedData) : null;
  
  if (found) {
    return dispatch(resetRelatedComics(found.data))
  }
  dispatch(requestRelatedComics(characterId));

  return fetch(`https://gateway.marvel.com/v1/public/comics?characters=${characterId}&limit=100&offset=0&apikey=dadf1ca6c54468f0ed5cdbb80d4b1f97`, {
    headers
  }).then(data => data.json(),
    error => console.log(error))
    .then(
    json => dispatch(setRelatedComics(characterId, json)))
};