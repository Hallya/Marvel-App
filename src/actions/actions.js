export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ERROR_POSTS = 'ERROR_POSTS';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const REQUEST_ALREADY_FETCHING = 'REQUEST_ALREADY_FETCHING';
export const GET_SEARCHBAR_FOCUS = 'GET_SEARCHBAR_FOCUS';
export const LEAVE_SEARCHBAR_FOCUS = 'LEAVE_SEARCHBAR_FOCUS';
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_IMAGES: 'SHOW_IMAGES',
  SHOW_DESCRIPTION: 'SHOW_DESCRIPTION',
};

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

export function setVisibilityFilter(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
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

const checkForItems = cat => !!(cat.items && cat.items.length);

export const requestFetch = (category, requestId) => ({ type: REQUEST_POSTS, category, requestId });

export const receiveFetch = (category, json, requestId) => { 
  return {
    type: RECEIVE_POSTS,
    posts: json.data.results,
    receivedAt: Date(),
    category,
    requestId
  };
};

export const errorFetch = (category, error) => ({ type: ERROR_POSTS, error, category});

export const fetchCategory = (category, requestId) => (dispatch, getState) => { 

  const { posts, actualPage } = getState(),
    cat = posts[category],
    { lastFetchId } = cat,
    { id } = actualPage;

  let found;

  if (lastFetchId && id === requestId) {
    return;
  }

  if (checkForItems(cat)) {
    found = cat.items.find(cat => cat.id === requestId);
  }

  if (found) {
    return dispatch(setCurrentPage(requestId, category, found));
  }

  dispatch(requestFetch(category, requestId));

  const headers = new Headers();
  headers.set('Referer', 'http://localhost:8000/');

  return fetch(`https://gateway.marvel.com/v1/public/${requestId}&apikey=dadf1ca6c54468f0ed5cdbb80d4b1f97`, {
    headers,
  }).then(data => data.json())
    .then(json => dispatch(receiveFetch(category, json, requestId)))
    .catch(error => dispatch(errorFetch(category, error)));
};