import * as help from '../helpers/helpers'
const headers = new Headers();
headers.set('Referer', 'http://localhost:8000/');

export const REQUEST_RELATED_DATA = 'REQUEST_RELATED_DATA';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_MORE = 'ADD_MORE';
export const SET_RELATED_COMICS = 'SET_RELATED_COMICS';
export const SET_RELATED_DATA = 'SET_RELATED_DATA';
export const SET_DISPLAY_FALSE = 'SET_DISPLAY_FALSE';
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
    return dispatch(setProfil(id, found))
  }

  console.error(`data not found`);
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

export function resetRelatedComics(data) {
  return {
    type: RESET_RELATED_COMICS,
    data
  }
}

export function setRelatedData(id, data) {
  return {
    type: SET_RELATED_DATA,
    data,
    id
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

export const setFalseOnDisplay = () => {
  return {
    type: SET_DISPLAY_FALSE
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
    .then(json => dispatch(receiveFetch(category, json, requestId)),
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
    .then(json => dispatch(setRelatedComics(characterId, json)))
};

export const fetchRelatedCharacters = comicId => (dispatch, getState) => {
  
  const
  { actualProfil } = getState(),
  { relatedData } = actualProfil,
  { id } = actualProfil,
  { previousRelatedData } = relatedData;
  let found;

  if (id && id === comicId) return;
  found = help.checkForItems(previousRelatedData) ?
  help.checkItemsById(comicId, previousRelatedData) : null;
  
  if (found) {
    dispatch(resetRelatedComics(found.data));
    return;
  }
  dispatch(requestRelatedComics(comicId));

  return fetch(`https://gateway.marvel.com/v1/public/comics/${comicId}/characters?limit=100&apikey=dadf1ca6c54468f0ed5cdbb80d4b1f97`, {
    headers
  }).then(data => data.json(),
    error => console.log(error))
    .then(json => dispatch(setRelatedComics(comicId, json)))
};

export const fetchByLetter = (requestId) => (dispatch, getState) => { 

  const
  { posts, actualPage } = getState(),
  cat = posts['characters'],
  { lastFetchId } = cat,
  { id } = actualPage;

  let found;

  if (lastFetchId && id === requestId) return;

  found = help.checkForItems(cat.items) ?
  help.checkItemsById(requestId, cat.items) : null;
  if (found) return dispatch(setCurrentPage(requestId, 'characters', found));

  dispatch(requestFetch('characters', requestId));
  return fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${requestId}&limit=100&apikey=dadf1ca6c54468f0ed5cdbb80d4b1f97`).then(data => data.json())
  .then(
    json => dispatch(receiveFetch('characters', json, requestId)),
  error => console.log(error)
  );
};

export const fetchMore = (offset, category) => (dispatch) => {
  dispatch(requestFetch(category, `${category}?offset=${offset}`));
  return fetch(`https://gateway.marvel.com/v1/public/${category}?limit=20&offset=${offset}&apikey=dadf1ca6c54468f0ed5cdbb80d4b1f97`)
    .then(data => data.json())
    .then(json => dispatch(addMore(category, json)),
    error => console.log(error)
    );
}

export const fetchComic = id => dispatch => {
  return fetch(`https://gateway.marvel.com/v1/public/comics/${id}?apikey=489e135d84bbc1a810a3a8ec86eef28e`)
    .then(data => data.json(),
      error => console.log(error))
    .then(json => dispatch(setRelatedData(id, json.data.results[0])))
}

export const fetchCharacter = id => dispatch => {
  return fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=489e135d84bbc1a810a3a8ec86eef28e`)
    .then(data => data.json(),
      error => console.log(error))
    .then(json => dispatch(setRelatedData(id, json.data.results[0])))
}




// export const fetch = (id, category, reducer) => (dispatch, getState) => {
  
//   if (!shouldFetch(id, category, reducer, getState)) {
//     return getFromCache(id, category, reducer, getState);
//   }
  
//   dispatch(requestFetch(id, category));
  
//   return fetch(`https://gateway.marvel.com/v1/public/${category}${id}apikey=489e135d84bbc1a810a3a8ec86eef28e`)
//     .then(data => data.json(), error => console.log(error))
//     .then(json => {
//       selectWhichActionToDispatch(id, category, json, dispatch)
//     });
// }

// const shouldFetch = (idRequest, category, reducer, getState) => {
  
//   const checkForCache;
  
//   switch (reducer) {
//     case 'actualPage':
//       const
//         { posts } = getState(), actualPage = getState()[reducer],
//         { id } = actualPage, { cat } = posts[category];
      
//       if (id === idRequest) return;
//       checkForCache = help.checkForItems(cat.items) ? help.checkItemsById(idRequest, cat.items) : null;
//       if (found) return

//     case 'actualProfil':
      
//       return  

//     default:
//       return;
      
//   }
// }

// const getFromCache = (id, category, reducer, getState) => {

// }

// const selectWhichActionToDispatch = (id, category, json, dispatch) => {

// }


// { posts, actualPage } = getState(),
//   cat = posts[category],
//   { lastFetchId } = cat,
//   { id } = actualPage;

// { posts, actualPage } = getState(),
//   cat = posts['characters'],
//   { lastFetchId } = cat,
//   { id } = actualPage;

// { actualProfil } = getState(),
//   { relatedData } = actualProfil,
//   { id } = actualProfil,
//   { previousRelatedData } = relatedData;

// { actualProfil } = getState(),
//   { relatedData } = actualProfil,
//   { id } = actualProfil,
//   { previousRelatedData } = relatedData;