import * as act from "./actions";
import * as help from "../helpers/helpers";
import * as reducer from "../reducers/reducers";

import fetchByLetter from "../../__mocks__/API_Responses/fetchByLetter.json";
import fetchCharacter from "../../__mocks__/API_Responses/fetchCharacter.json";
import fetchCharacters from "../../__mocks__/API_Responses/fetchCharacters.json";
import somethingFetched from "../../__mocks__/API_Responses/fetchComic.json";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
// import fetchMock from 'fetch-mock';

// CATEGORIES
const catCharacters = "characters";
const catComics = "comics";

// ID
const idCharacter = 1009149;
const idComic = 17486;

// URL REQUEST ID
const requestCharacters = "characters?limit=20&offset=0";

// CONFIGURATION OF REDUX STORE AND REDUX THUNK
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
//FIXED DATE
Date = jest.fn(() => 1482363367071);

describe("Simples actions", () => {

  it("GET_SEARCHBAR_FOCUS:: should return an action without data", () => {
    const expectedAction = {
      type: "GET_SEARCHBAR_FOCUS"
    }

    expect(act.getSearchbarFocus()).toEqual(expectedAction)
  })

  it("LEAVE_SEARCHBAR_FOCUS:: should return an action without data", () => {
    const expectedAction = {
      type: "LEAVE_SEARCHBAR_FOCUS"
    }

    expect(act.leaveSearchbarFocus()).toEqual(expectedAction)
  })

  it("SET_DISPLAY_FALSE:: should return an action without data", () => {
    const expectedAction = {
      type: "SET_DISPLAY_FALSE",
    }

    expect(act.setFalseOnDisplay()).toEqual(expectedAction)
  })

  it("RESET_RELATED_DATA:: should return an action with data", () => {
    const expectedAction = {
      type: "RESET_RELATED_DATA",
      data: {
        data: 0
      },
      id: idComic
    }

    expect(act.resetRelatedData(idComic, {data: 0})).toEqual(expectedAction)
  })

  it("SET_DATA:: should return an action with an id and data", () => {
    const expectedAction = {
      type: "SET_DATA",
      id: idComic,
      data: {
        data: 0
      }
    }

    expect(act.setData(idComic, {data: 0})).toEqual(expectedAction)
  })

  it("SET_RELATED_DATA:: should return an action with an id and data", () => {
    const expectedAction = {
      type: "SET_RELATED_DATA",
      id: idComic,
      data: 0
    }

    expect(act.setRelatedData(idComic, {
      data: {
        results: 0
      }
    })).toEqual(expectedAction)
  })

  it("SET_PROFIL:: should return an action with an id and data", () => {
    const expectedAction = {
      type: "SET_PROFIL",
      id: idComic,
      data: 0
    }

    expect(act.setProfil(idComic, 0)).toEqual(expectedAction)
  })

  it("SET_VISIBILITY_FILTER:: should return an action with filter", () => {
    const expectedAction = {
      type: "SET_VISIBILITY_FILTER",
      filter: "visible"
    }

    expect(act.setVisibilityFilter("visible")).toEqual(expectedAction)
  })

  it("SET_INFO:: should return an action with info", () => {
    const expectedAction = {
      type: "SET_INFO",
      value: "info"
    }

    expect(act.setInfo("info")).toEqual(expectedAction)
  })

  it("SET_CURRENT_PAGE:: should return an action with data, category, requestId and current date", () => {
    const expectedAction = {
      type: "SET_CURRENT_PAGE",
      data: 0,
      category: 'comics',
      requestId: 0,
      receivedAt: Date()
    }

    expect(act.setCurrentPage(0, "comics", 0)).toEqual(expectedAction)
  })

  it("RECEIVE_POSTS:: should return an action with data, category, requestId and current date", () => {
    const expectedAction = {
      type: "RECEIVE_POSTS",
      posts: 0,
      category: 'comics',
      requestId: 0,
      receivedAt: Date()
    }

    expect(act.receiveFetch("comics", {
      data: {
        results: 0
      }
    }, 0)).toEqual(expectedAction)
  })

  it("REQUEST_RELATED_DATA:: should return an action with an ID", () => {
    const expectedAction = {
      type: "REQUEST_RELATED_DATA",
      id: idComic,
    }

    expect(act.requestRelatedData(idComic)).toEqual(expectedAction)
  })

  it("REQUEST_POSTS:: should return an action with a requestId and a category ", () => {
    const expectedAction = {
      type: "REQUEST_POSTS",
      requestId: 0,
      category: 'comics'
    }

    expect(act.requestFetch('comics', 0)).toEqual(expectedAction)
  })

  it("ADD_MORE:: should return an action with a category and data ", () => {
    const expectedAction = {
      type: "ADD_MORE",
      data: 0,
      category: 'comics'
    }

    expect(act.addMore('comics', {
      data: {
        results: 0
      }
    })).toEqual(expectedAction)
  })
})


describe("Asyncs actions", () => {

  
  it('Function fetchContent:: fetch content from API and return an Object', () => {

    fetch.mockResponse(JSON.stringify(somethingFetched));

    act.fetchContent().then(response => {
      expect(response).toMatchSnapshot()
    })
  })
})


describe("Helpers & sync action", () => {
  
  it('Function createRequestId:: should get return a part of an URL generated by conditions defined', () => {

    const expectedUrl = "characters?limit=30&offset=0&";
    const condition = {
      type: "browsing",
      category: "characters",
      idKnown: false
    }

    expect(help.createRequestId(
      (0).toString(),
      condition
    ))
      .toEqual(expectedUrl);
  })
  
  it('Function doubleRequest:: should check if previous request match new one and return a boolean', () => {

    const lastRequest = "boo";
    const newRequest = "far";

    expect(help.doubleRequest(newRequest, lastRequest)).toEqual(false);
  })
  
  it('Function getCache:: should check id match with object\'s id in an array', () => {

    const array = [
      {
        id: 1,
        foo: "bar"
      },
      {
        id: 22,
        bar: "foo"
      }
    ];

    expect(help.getCache(22, array)).toEqual({id: 22, bar: "foo"});
  })
  
  it('Function getConditions:: should return an object defining conditions describing how createRequestId func should behave', () => {

    const condition = {
      type: "browsing",
      category: "characters",
      idKnown: false
    };

    expect(help.getConditions('ch')).toEqual(condition);
  })
})


describe("Reducers", () => {
  
  it('Reducer "posts" | action "REQUEST_POSTS":: should return a new state with last request id fetched, set isFetching to "true" and error to "null"', () => {
    
    const oldState = {
      lastFetchId: {
        characters: null,
        comics: null,
        relatedData: null,
      },
      cached: [],
      isFetching: false,
    };

    const newState = {
      lastFetchId: {
        characters: requestCharacters,
        comics: null,
        relatedData: null,
      },
      cached: [],
      isFetching: true,
      error: null
    };

    expect(reducer.posts(oldState, act.requestFetch(catCharacters, requestCharacters))).toEqual(newState);
  })
  
  it('Reducer "posts" | action "RECEIVE_POSTS":: should return a new state with isFetching to "false", add a new object to "items" with unique id, data, and released date', () => {
    
    const oldState = {
      lastFetchId: {
        characters: null,
        comics: null,
        relatedData: null,
      },
      cached: [],
      isFetching: false,
    };

    const newState = {
      lastFetchId: {
        characters: null,
        comics: null,
        relatedData: null,
      },
      cached: [{
        id: requestCharacters,
        data: [0, 1, 2],
        receivedAt: Date()
      }],
      isFetching: false,
    };

    const data = {
      data: {
        results: [0, 1, 2]
      }
    }

    expect(reducer.posts(oldState, act.receiveFetch(catCharacters, data, requestCharacters))).toEqual(newState);
  })
  
  it('Reducer "posts" | action "SET_CURRENT_PAGE":: should return a new state with new requestId in the right category', () => {
    
    const oldState = {
      lastFetchId: {
        characters: null,
        comics: null,
        relatedData: null,
      },
      cached: [],
      isFetching: false,
    };

    const newState = {
      lastFetchId: {
        characters: requestCharacters,
        comics: null,
        relatedData: null,
      },
      cached: [],
      isFetching: false,
    };

    expect(reducer.posts(oldState, act.setCurrentPage(requestCharacters, catCharacters))).toEqual(newState);
  })

  it('Reducer "posts" | action "ERROR_POSTS":: should return a new state with informations about category\'s last error\n\n', () => {
    
    const error = "!!!"
    
    const oldState = {
      characters: {
        lastFetchId: null,
        items: [],
        isFetching: true,
      },
      comics: {
        lastFetchId: null,
        items: [],
        isFetching: false,
      }
    };

    const newState = {
       characters: {
         lastFetchId: null,
         items: [],
         isFetching: false,
         error: error
       },
       comics: {
         lastFetchId: null,
         items: [],
         isFetching: false,
       }
     };

    expect(reducer.posts(oldState, act.newError(catCharacters, error))).toEqual(newState);
  })
  
  it('Reducer "actualPage" | action "SET_CURRENT_PAGE":: should return a new state with request id, the current category, data and released date, ', () => {
    
    const data = {data: [{},{}]};
    
    const oldState = {
      id: null,
      data: [],
      offset: 20,
      receivedAt: Date(),
      isFocused: false
    };

    const newState = {
      id: requestCharacters,
      data: [{},{}],
      category: catCharacters,
      offset: 0,
      receivedAt: Date(),
      isFocused: false
     };


    expect(reducer.actualPage(oldState, act.setCurrentPage(requestCharacters, catCharacters, data))).toEqual(newState);
  })

  it('Reducer "actualPage" | action "REQUEST_POSTS":: should return a new state with isFetching true and category actualised', () => {
    
    const oldState = {
      id: null,
      data: [],
      offset: 0,
      receivedAt: null,
      isFocused: false
    };

    const newState = {
      id: null,
      data: [],
      offset: 0,
      receivedAt: null,
      isFocused: false,
      isFetching: true
    };

    expect(reducer.actualPage(oldState, act.requestFetch(catCharacters, requestCharacters))).toEqual(newState);
  })

  it('Reducer "actualPage" | action "RECEIVE_POSTS":: should return a new state with isFetching false, category actualised, new id and data and released date', () => {
    
    const data = {data:{results:[{}]}}
    const oldState = {
      id: null,
      data: [],
      offset: 0,
      receivedAt: null,
      isFocused: false,
      isFetching: true
    };

    const newState = {
      id: requestCharacters,
      category: catCharacters,
      data: [{}],
      offset: 0,
      receivedAt: Date(),
      isFocused: false,
      isFetching: false
    };

    expect(reducer.actualPage(oldState, act.receiveFetch(catCharacters, data, requestCharacters))).toEqual(newState);
  })

  it('Reducer "actualPage" | action "ADD_MORE":: should return a new state with new result added to previous', () => {
    
    const data = {data: {results:[{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6}]}}

    const oldState = {
      id: null,
      data: [{id: 1},{id: 2},{id: 3}],
      isFetching: true,
      offset: 0,
      receivedAt: null,
      isFocused: false
    };

    const newState = {
      data: [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6}],
      id: null,
      isFetching: false,
      offset: 30,
      receivedAt: null,
      isFocused: false
    };

    expect(reducer.actualPage(oldState, act.addMore(catCharacters, data))).toEqual(newState);
  })

  it('Reducer "actualPage" | action "GET_SEARCHBAR_FOCUS":: should return a new state with isFocused †rue', () => {

    const oldState = {
      id: null,
      data: [],
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: null,
      isFocused: false
    };

    const newState = {
     id: null,
      data: [],
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: null,
      isFocused: true
    };

    expect(reducer.actualPage(oldState, act.getSearchbarFocus())).toEqual(newState);
  })

  it('Reducer "actualPage" | action "LEAVE_SEARCHBAR_FOCUS":: should return a new state with isFocused false\n\n', () => {

    const oldState = {
      id: null,
      data: [],
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: null,
      isFocused: true
    };

    const newState = {
     id: null,
      data: [],
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: null,
      isFocused: false
    };

    expect(reducer.actualPage(oldState, act.leaveSearchbarFocus())).toEqual(newState);
  })
  
  it('Reducer "actualProfil" | action "SET_PROFIL":: should return a new state with new id and data', () => {

    const action = {
      type: act.SET_PROFIL,
      id: 1017100,
      data: "foo"
    },

    oldState = {
      id: null,
      data: null,
      infosDisplayed: null,
      relatedData: {
        isFetching: false,
        actualRelatedData: [],
        previousRelatedData: []
      }
    },

    newState = {
      id: 1017100,
      data: "foo",
      infosDisplayed: null,
      relatedData: {
        isFetching: false,
        actualRelatedData: [],
        previousRelatedData: []
      }
    };
    
    expect(reducer.actualProfil(oldState, action)).toEqual(newState);
  })
  
  it('Reducer "actualProfil" | action "SET_INFO":: should return a new state with infos that should be displayed', () => {

    const action = {
      type: act.SET_INFO,
      value: "foo"
     },

    oldState = {
      id: null,
      data: null,
      infosDisplayed: null,
      relatedData: {
        isFetching: false,
        actualRelatedData: [],
        previousRelatedData: []
      }
    },

    newState = {
      id: null,
      data: null,
      infosDisplayed: "foo",
      relatedData: {
        isFetching: false,
        actualRelatedData: [],
        previousRelatedData: []
      }
    };
    
    expect(reducer.actualProfil(oldState, action)).toEqual(newState);
  })
  
  it('Reducer "actualProfil" | action "REQUEST_RELATED_DATA":: should return a new state with isFetching set to true and lastFetchId actualised', () => {

    const action = {
      type: act.REQUEST_RELATED_DATA,
      id: "foo"
     },

    oldState = {
      id: null,
      data: null,
      infosDisplayed: null,
      relatedData: {
        isFetching: false,
        actualRelatedData: [],
        previousRelatedData: []
      }
    },

    newState = {
      id: null,
      data: null,
      infosDisplayed: null,
      relatedData: {
        isFetching: true,
        lastFetchId: "foo",
        actualRelatedData: [],
        previousRelatedData: []
      }
    };
    
    expect(reducer.actualProfil(oldState, action)).toEqual(newState);
  })
  
  it('Reducer "actualProfil" | action "SET_RELATED_DATA":: should return a new state with isFetching set to false and related data added to "actual" and "previous" keys', () => {

    const action = {
      type: act.SET_RELATED_DATA,
      data: "bar",
      id: "foo"
     },

    oldState = {
      id: null,
      data: null,
      infosDisplayed: null,
      relatedData: {
        isFetching: true,
        actualRelatedData: [],
        previousRelatedData: []
      }
    },

    newState = {
      id: null,
      data: null,
      infosDisplayed: null,
      relatedData: {
        isFetching: false,
        actualRelatedData: "bar",
        previousRelatedData: [{
          id: "foo",
          data: "bar"
        }]
      }
    };
    
    expect(reducer.actualProfil(oldState, action)).toEqual(newState);
  })
  
  it('Reducer "actualProfil" | action "RESET_RELATED_DATA":: should return a new state with isFetching set to false and reset data from "previous" to "actual" key\n\n', () => {

    const action = {
      type: act.RESET_RELATED_DATA,
      data: "bar"
     },

    oldState = {
      id: null,
      data: null,
      infosDisplayed: null,
      relatedData: {
        isFetching: true,
        actualRelatedData: [],
        previousRelatedData: []
      }
    },

    newState = {
      id: null,
      data: null,
      infosDisplayed: null,
      relatedData: {
        isFetching: false,
        actualRelatedData: "bar",
        previousRelatedData: []
      }
    };
    
    expect(reducer.actualProfil(oldState, action)).toEqual(newState);
  })
 
  it('Reducer "relatedData" | action "SET_DATA":: should return a new state with new data and set displayed to true', () => {

    const action = {
      type: act.SET_DATA,
      data: {data:{results:["bar"]}},
     },

    oldState = {
      data: null,
      displayed: false
    },

    newState = {
      data: "bar",
      displayed: true
    };
    
    expect(reducer.relatedData(oldState, action)).toEqual(newState);
  })
 
  it('Reducer "relatedData" | action "SET_DISPLAY_FALSE":: should return a new state with "displayed" set on false\n\n', () => {

    const action = {
      type: act.SET_DISPLAY_FALSE,
     },

    oldState = {
      data: null,
      displayed: true
    },

    newState = {
      data: null,
      displayed: false
    };
    
    expect(reducer.relatedData(oldState, action)).toEqual(newState);
  })
 
  it('Reducer "visibilityFilter" | action "SHOW_DESCRIPTION":: should return a new state with "description" set on it\'s opposite current value', () => {

    const action = {
      type: "SET_VISIBILITY_FILTER",
      filter: act.VisibilityFilters.SHOW_DESCRIPTION
     },

    oldState = {
      images: false,
      description: false
    },

    newState = {
      images: false,
      description: true
    };
    
    expect(reducer.visibilityFilter(oldState, action)).toEqual(newState);
  })
 
  it('Reducer "visibilityFilter" | action "SHOW_IMAGES":: should return a new state with "images" set on it\'s opposite current value', () => {

    const action = {
      type: "SET_VISIBILITY_FILTER",
      filter: act.VisibilityFilters.SHOW_IMAGES
     },

    oldState = {
      images: false,
      description: false
    },

    newState = {
      images: true,
      description: false
    };
    
    expect(reducer.visibilityFilter(oldState, action)).toEqual(newState);
  })
})