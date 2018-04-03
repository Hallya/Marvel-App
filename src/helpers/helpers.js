export const doubleRequest = (requestId, lastFetch) => requestId === lastFetch

export const getCache = (requestId, previousFetchs) => previousFetchs && previousFetchs.length ?
  previousFetchs.find(item => item.id === requestId)
  :
  null
10304
export const createRequestId = (id, conditions) => {
  
  if (!id || !conditions) {
    throw new Error("function createRequestId: requiert 2 arguments")
  }
  else if (typeof id !== "string") {
    throw new Error("fonction createRequestId: first argument must be a string ")
  }
  else if (typeof conditions !== "object") {
    throw new Error("fonction createRequestId: second argument must be an object")
  }

  let request;
  request = conditions.category;

  switch (conditions.type) {
    case 'search':
      return request + `?nameStartsWith=${id}&limit=100&`;
    case 'browsing':
      return request +`?limit=30&offset=${id}&`;  
    case 'single':
      return request + `/${id}?`
    case 'related':
      return request += conditions.category === "characters" ? `/${id}/comics?` : `/${id}/characters?`
  }
}


export const getConditions = type => {
  
  switch (type) {
    case 'ch':
      return {
        type: "browsing",
        category: "characters",
        idKnown: false
      }
    case 'co':
      return {
        type: "browsing",
        category: "comics",
        idKnown: false
      }
    case 'chOnly':
      return {
        type: "single",
        category: "characters",
        idKnown: true
      }
    case 'coOnly':
      return {
        type: "single",
        category: "comics",
        idKnown: true
      }
    case 'relCh':
      return {
        type: "related",
        category: "comics",
        idKnown: true
      }
    case 'relCo':
      return {
        type: "related",
        category: "characters",
        idKnown: true
      }
    case 'search':
      return {
        type: "search",
        category: "characters",
        idKnown: true
      }
    default:
      throw new Error("function getCondition: argument doesn't match any case");  
  }
}