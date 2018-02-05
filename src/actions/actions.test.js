import * as act from "./actions";
import * as help from "../helpers/helpers";
import * as reducer from "../reducers/reducers";

import fetchByLetter from "../../__mocks__/API_Responses/fetchByLetter.json";
import fetchCharacter from "../../__mocks__/API_Responses/fetchCharacter.json";
import fetchCharacters from "../../__mocks__/API_Responses/fetchCharacters.json";
import fetchComic from "../../__mocks__/API_Responses/fetchComic.json";
import fetchComics from "../../__mocks__/API_Responses/fetchComics.json";
import fetchMoreCharacters from "../../__mocks__/API_Responses/fetchMoreCharacters.json";
import fetchMoreComics from "../../__mocks__/API_Responses/fetchMoreComics.json";
import fetchRelatedCharacters from "../../__mocks__/API_Responses/fetchRelatedCharacters.json";
import fetchRelatedComics from "../../__mocks__/API_Responses/fetchRelatedComics.json";

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

  it("RESET_RELATED_COMICS:: should return an action with data", () => {
    const expectedAction = {
      type: "RESET_RELATED_COMICS",
      data: {
        data: 0
      }
    }

    expect(act.resetRelatedComics({
      data: 0
    })).toEqual(expectedAction)
  })

  it("SET_RELATED_DATA:: should return an action with an id and data", () => {
    const expectedAction = {
      type: "SET_RELATED_DATA",
      id: idComic,
      data: {
        data: 0
      }
    }

    expect(act.setRelatedData(idComic, {
      data: 0
    })).toEqual(expectedAction)
  })

  it("SET_RELATED_COMICS:: should return an action with an id and data", () => {
    const expectedAction = {
      type: "SET_RELATED_COMICS",
      id: idComic,
      data: 0
    }

    expect(act.setRelatedComics(idComic, {
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

    expect(act.requestRelatedComics(idComic)).toEqual(expectedAction)
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

  Date = jest.fn(() => 1482363367071);
  
  it('Function fetchCategory:: create 2 actions (REQUEST_POSTS & RECEIVE_POSTS) and fetch the first 20 characters', () => {

    fetch.mockResponse(JSON.stringify(fetchCharacters));

    const store = mockStore({
      actualPage: {
        id: null,
        data: [],
        offset: {
          characters: 20,
          comics: 20
        },
        receivedAt: null,
        isFocused: false
      },
      posts: {
        characters: {
          lastFetchId: null,
          items: [],
          isFetching: false,
        },
        comics: {
          lastFetchId: null,
          items: [],
          isFetching: false,
        }
      }
    })

    return store.dispatch(act.fetchCategory(catCharacters, requestCharacters)).then(() => {
      expect(store.getActions()).toMatchSnapshot()
    })
  })
  it('Function fetchRelatedComics:: create 2 actions (REQUEST_RELATED_DATA & SET_RELATED_COMICS) and fetch 8 comics related to a character', () => {

    fetch.mockResponse(JSON.stringify(fetchRelatedComics));

    const store = mockStore({
      actualProfil: {
        id: null,
        data: null,
        infosDisplayed: null,
        relatedData: {
          isFetching: false,
          actualRelatedData: [],
          previousRelatedData: []
        }
      }
    })

    return store.dispatch(act.fetchRelatedComics(idCharacter)).then(() => {
      expect(store.getActions()).toMatchSnapshot()
    })
  })
  it('Function fetchRelatedCharacters:: create 2 actions (REQUEST_RELATED_DATA & SET_RELATED_COMICS) and fetch the first 14\'s characters related to a comic', () => {
    fetch.mockResponse(JSON.stringify(fetchRelatedCharacters));

    const store = mockStore({
      actualProfil: {
        id: null,
        data: null,
        infosDisplayed: null,
        relatedData: {
          isFetching: false,
          actualRelatedData: [],
          previousRelatedData: []
        }
      }
    })

    return store.dispatch(act.fetchRelatedCharacters(idComic)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    })
  })

  it('Function fetchByLetter:: create 2 actions (REQUEST_POSTS & RECEIVE_POSTS) and fetch all characters which name begin by \'a\'', () => {

    fetch.mockResponse(JSON.stringify(fetchByLetter));

    const store = mockStore({
      actualPage: {
        id: null,
        data: [],
        offset: {
          characters: 20,
          comics: 20
        },
        receivedAt: null,
        isFocused: false
      },
      posts: {
        characters: {
          lastFetchId: null,
          items: [],
          isFetching: false,
        },
        comics: {
          lastFetchId: null,
          items: [],
          isFetching: false,
        }
      }
    })

    return store.dispatch(act.fetchByLetter("a")).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    })
  })
  it('Function fetchMore (characters):: create 2 actions (REQUEST_POSTS & ADD_MORE) and fetch 20 more characters', () => {

    fetch.mockResponse(JSON.stringify(fetchMoreCharacters));

    const store = mockStore({
      actualPage: {
        id: null,
        data: [],
        offset: {
          characters: 20,
          comics: 20
        },
        receivedAt: null,
        isFocused: false
      },
      posts: {
        characters: {
          lastFetchId: null,
          items: [],
          isFetching: false,
        },
        comics: {
          lastFetchId: null,
          items: [],
          isFetching: false,
        }
      }
    })

    return store.dispatch(act.fetchMore(20, catCharacters)).then(() => {
      expect(store.getActions()).toMatchSnapshot()
    })
  })
  it('Function fetchMore (comics):: create 2 actions (REQUEST_POSTS & ADD_MORE) and fetch 20 more comics', () => {

    fetch.mockResponse(JSON.stringify(fetchMoreComics));

    const store = mockStore({
      actualPage: {
        id: null,
        data: [],
        offset: {
          characters: 20,
          comics: 20
        },
        receivedAt: null,
        isFocused: false
      },
      posts: {
        characters: {
          lastFetchId: null,
          items: [],
          isFetching: false,
        },
        comics: {
          lastFetchId: null,
          items: [],
          isFetching: false,
        }
      }
    })

    return store.dispatch(act.fetchMore(20, catComics)).then(() => {
      expect(store.getActions()).toMatchSnapshot()
    })
  })
  it('Function fetchCharacter:: create 1 actions (SET_RELATED_DATA) and fetch 1 character', () => {

    fetch.mockResponse(JSON.stringify(fetchCharacter));
    
    const store = mockStore({
      relatedData: {
        data: null,
        displayed: false
      }
    })

    return store.dispatch(act.fetchCharacter(1009156)).then(() => {
      expect(store.getActions()).toMatchSnapshot()
    })
  })
  it('Function fetchComic:: create 1 actions (SET_RELATED_DATA) and fetch 1 comic', () => {

    fetch.mockResponse(JSON.stringify(fetchComic));

    const store = mockStore({
      relatedData: {
        data: null,
        displayed: false
      }
    })

    return store.dispatch(act.fetchComic(2539)).then(() => {
      expect(store.getActions()).toMatchSnapshot()
    })
  })
})

describe("Helpers & sync action", () => {
  
  it('Function getProfil:: should get data from cache stored if found', () => {

    const expectedActions = [{
      type: act.SET_PROFIL,
      id: 1017100,
      data: {
        id: 1017100,
        name: 'A-Bomb (HAS)',
        description: 'Rick Jones has been Hulk\'s best bud since day one, but now he\'s more than a friend...he\'s a teammate! Transformed by a Gamma energy explosion, A-Bomb\'s thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ',
        modified: '2013-09-18T15:54:04-0400',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
          extension: 'jpg'
        },
        resourceURI: 'http://gateway.marvel.com/v1/public/characters/1017100',
        comics: {
          available: 0,
          collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/comics',
          items: [],
          returned: 0
        },
        series: {
          available: 0,
          collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/series',
          items: [],
          returned: 0
        },
        stories: {
          available: 1,
          collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/stories',
          items: [{
            resourceURI: 'http://gateway.marvel.com/v1/public/stories/105929',
            name: 'cover from Free Comic Book Day 2013 (Avengers/Hulk) (2013) #1',
            type: 'cover'
          }],
          returned: 1
        },
        events: {
          available: 0,
          collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/events',
          items: [],
          returned: 0
        },
        urls: [{
            type: 'detail',
            url: 'http://marvel.com/characters/76/a-bomb?utm_campaign=apiRef&utm_source=dadf1ca6c54468f0ed5cdbb80d4b1f97'
          },
          {
            type: 'comiclink',
            url: 'http://marvel.com/comics/characters/1017100/a-bomb_has?utm_campaign=apiRef&utm_source=dadf1ca6c54468f0ed5cdbb80d4b1f97'
          }
        ]
      }
    }]

    const store = mockStore({
      actualPage: {
        id: "characters?limit=20&offset=0",
        data: [
          {
            id: 1011334,
            name: '3-D Man',
            description: '',
            modified: '2014-04-29T14:18:17-0400',
            thumbnail: {
              path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
              extension: 'jpg'
            },
            resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011334',
            comics: {
              available: 12,
              collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/comics',
              items: [{
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/21366',
                  name: 'Avengers: The Initiative (2007) #14'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/24571',
                  name: 'Avengers: The Initiative (2007) #14 (SPOTLIGHT VARIANT)'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/21546',
                  name: 'Avengers: The Initiative (2007) #15'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/21741',
                  name: 'Avengers: The Initiative (2007) #16'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/21975',
                  name: 'Avengers: The Initiative (2007) #17'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/22299',
                  name: 'Avengers: The Initiative (2007) #18'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/22300',
                  name: 'Avengers: The Initiative (2007) #18 (ZOMBIE VARIANT)'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/22506',
                  name: 'Avengers: The Initiative (2007) #19'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/8500',
                  name: 'Deadpool (1997) #44'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/10223',
                  name: 'Marvel Premiere (1972) #35'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/10224',
                  name: 'Marvel Premiere (1972) #36'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/comics/10225',
                  name: 'Marvel Premiere (1972) #37'
                }
              ],
              returned: 12
            },
            series: {
              available: 3,
              collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
              items: [{
                  resourceURI: 'http://gateway.marvel.com/v1/public/series/1945',
                  name: 'Avengers: The Initiative (2007 - 2010)'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/series/2005',
                  name: 'Deadpool (1997 - 2002)'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/series/2045',
                  name: 'Marvel Premiere (1972 - 1981)'
                }
              ],
              returned: 3
            },
            stories: {
              available: 21,
              collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/stories',
              items: [{
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/19947',
                  name: 'Cover #19947',
                  type: 'cover'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/19948',
                  name: 'The 3-D Man!',
                  type: 'interiorStory'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/19949',
                  name: 'Cover #19949',
                  type: 'cover'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/19950',
                  name: 'The Devil\'s Music!',
                  type: 'interiorStory'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/19951',
                  name: 'Cover #19951',
                  type: 'cover'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/19952',
                  name: 'Code-Name:  The Cold Warrior!',
                  type: 'interiorStory'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/47184',
                  name: 'AVENGERS: THE INITIATIVE (2007) #14',
                  type: 'cover'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/47185',
                  name: 'Avengers: The Initiative (2007) #14 - Int',
                  type: 'interiorStory'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/47498',
                  name: 'AVENGERS: THE INITIATIVE (2007) #15',
                  type: 'cover'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/47499',
                  name: 'Avengers: The Initiative (2007) #15 - Int',
                  type: 'interiorStory'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/47792',
                  name: 'AVENGERS: THE INITIATIVE (2007) #16',
                  type: 'cover'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/47793',
                  name: 'Avengers: The Initiative (2007) #16 - Int',
                  type: 'interiorStory'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/48361',
                  name: 'AVENGERS: THE INITIATIVE (2007) #17',
                  type: 'cover'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/48362',
                  name: 'Avengers: The Initiative (2007) #17 - Int',
                  type: 'interiorStory'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/49103',
                  name: 'AVENGERS: THE INITIATIVE (2007) #18',
                  type: 'cover'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/49104',
                  name: 'Avengers: The Initiative (2007) #18 - Int',
                  type: 'interiorStory'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/49106',
                  name: 'Avengers: The Initiative (2007) #18, Zombie Variant - Int',
                  type: 'interiorStory'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/49888',
                  name: 'AVENGERS: THE INITIATIVE (2007) #19',
                  type: 'cover'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/49889',
                  name: 'Avengers: The Initiative (2007) #19 - Int',
                  type: 'interiorStory'
                },
                {
                  resourceURI: 'http://gateway.marvel.com/v1/public/stories/54371',
                  name: 'Avengers: The Initiative (2007) #14, Spotlight Variant - Int',
                  type: 'interiorStory'
                }
              ],
              returned: 20
            },
            events: {
              available: 1,
              collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/events',
              items: [{
                resourceURI: 'http://gateway.marvel.com/v1/public/events/269',
                name: 'Secret Invasion'
              }],
              returned: 1
            },
            urls: [{
                type: 'detail',
                url: 'http://marvel.com/characters/74/3-d_man?utm_campaign=apiRef&utm_source=dadf1ca6c54468f0ed5cdbb80d4b1f97'
              },
              {
                type: 'wiki',
                url: 'http://marvel.com/universe/3-D_Man_(Chandler)?utm_campaign=apiRef&utm_source=dadf1ca6c54468f0ed5cdbb80d4b1f97'
              },
              {
                type: 'comiclink',
                url: 'http://marvel.com/comics/characters/1011334/3-d_man?utm_campaign=apiRef&utm_source=dadf1ca6c54468f0ed5cdbb80d4b1f97'
              }
            ]
          },
          {
            id: 1017100,
            name: 'A-Bomb (HAS)',
            description: 'Rick Jones has been Hulk\'s best bud since day one, but now he\'s more than a friend...he\'s a teammate! Transformed by a Gamma energy explosion, A-Bomb\'s thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ',
            modified: '2013-09-18T15:54:04-0400',
            thumbnail: {
              path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
              extension: 'jpg'
            },
            resourceURI: 'http://gateway.marvel.com/v1/public/characters/1017100',
            comics: {
              available: 0,
              collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/comics',
              items: [],
              returned: 0
            },
            series: {
              available: 0,
              collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/series',
              items: [],
              returned: 0
            },
            stories: {
              available: 1,
              collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/stories',
              items: [{
                resourceURI: 'http://gateway.marvel.com/v1/public/stories/105929',
                name: 'cover from Free Comic Book Day 2013 (Avengers/Hulk) (2013) #1',
                type: 'cover'
              }],
              returned: 1
            },
            events: {
              available: 0,
              collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/events',
              items: [],
              returned: 0
            },
            urls: [{
                type: 'detail',
                url: 'http://marvel.com/characters/76/a-bomb?utm_campaign=apiRef&utm_source=dadf1ca6c54468f0ed5cdbb80d4b1f97'
              },
              {
                type: 'comiclink',
                url: 'http://marvel.com/comics/characters/1017100/a-bomb_has?utm_campaign=apiRef&utm_source=dadf1ca6c54468f0ed5cdbb80d4b1f97'
              }
            ]
          }
        ],
        offset: {
          characters: 20,
          comics: 20
        },
        receivedAt: null,
        isFocused: false
      },
      actualProfil: {
        id: 1009146,
        data: null,
        infosDisplayed: null,
        relatedData: {
          isFetching: false,
          actualRelatedData: [],
          previousRelatedData: []
        }
      }
    })

    store.dispatch(act.getProfil(1017100));
    const actions = store.getActions()

    expect(actions).toEqual(expectedActions);
  })
  
  it('Function checkForItems:: should check if an array exist and has data', () => {

    const array = [0, 1];

    expect(help.checkForItems(array)).toEqual(true);
  })
  
  it('Function checkItemsById:: should check id match with object\'s id in an array', () => {

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

    expect(help.checkItemsById(22, array)).toEqual({id: 22, bar: "foo"});
  })
})

describe("Reducers", () => {
  
  it('Reducer "posts" | action "REQUEST_POSTS":: should return a new state with last request id fetched, set isFetching to "true" and error to "null"', () => {
    
    const oldState = {
      characters: {
        lastFetchId: null,
        items: [],
        isFetching: false,
      },
      comics: {
        lastFetchId: null,
        items: [],
        isFetching: false,
      }
    };

    const newState = {
       characters: {
         lastFetchId: requestCharacters,
         items: [],
         isFetching: true,
         error: null
       },
       comics: {
         lastFetchId: null,
         items: [],
         isFetching: false,
       }
     };

    expect(reducer.posts(oldState, act.requestFetch(catCharacters, requestCharacters))).toEqual(newState);
  })
  
  it('Reducer "posts" | action "RECEIVE_POSTS":: should return a new state with isFetching to "false", add a new object to "items" with unique id, data, and released date', () => {
    
    const oldState = {
      characters: {
        lastFetchId: null,
        items: [],
        isFetching: false,
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
        items: [
          {
            id: requestCharacters,
            data: [0, 1, 2],
            receivedAt: Date()
          }
        ],
        isFetching: false,
      },
      comics: {
        lastFetchId: null,
        items: [],
        isFetching: false,
      }
    };

    const data = {
      data: {
        results: [0, 1, 2]
      }
    }

    expect(reducer.posts(oldState, act.receiveFetch(catCharacters, data, requestCharacters))).toEqual(newState);
  })
  
  it('Reducer "posts" | action "ADD_MORE":: should return a new state with isFetching to "false" and concat new result\'s data to first result\'s data fetched before ', () => {
    
    const oldState = {
      characters: {
        lastFetchId: null,
        items: [
          {
            id: requestCharacters,
            data: [0, 1, 2],
            receivedAt: Date()
          }
        ],
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
        items: [
          {
            id: requestCharacters,
            data: [0, 1, 2, 3, 4, 5],
            receivedAt: Date()
          }
        ],
        isFetching: false,
      },
      comics: {
        lastFetchId: null,
        items: [],
        isFetching: false,
      }
    };

    const data = {
      data: {
        results: [3, 4, 5]
      }
    }

    expect(reducer.posts(oldState, act.addMore(catCharacters, data))).toEqual(newState);
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
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: Date(),
      isFocused: false
    };

    const newState = {
      id: requestCharacters,
      data: [{},{}],
      category: catCharacters,
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: Date(),
      isFocused: false
     };


    expect(reducer.actualPage(oldState, act.setCurrentPage(requestCharacters, catCharacters, data))).toEqual(newState);
  })

  it('Reducer "actualPage" | action "REQUEST_POSTS":: should return a new state with isFetching true and category actualised', () => {
    
    const oldState = {
      id: null,
      data: [],
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: Date(),
      isFocused: false
    };

    const newState = {
      id: null,
      data: [],
      isFetching: true,
      category: catCharacters,
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: Date(),
      isFocused: false
    };

    expect(reducer.actualPage(oldState, act.requestFetch(catCharacters, requestCharacters))).toEqual(newState);
  })

  it('Reducer "actualPage" | action "RECEIVE_POSTS":: should return a new state with isFetching false, category actualised, new id and data and released date', () => {
    
    const data = {data:{results:[{}]}}
    const oldState = {
      id: null,
      data: [],
      isFetching: true,
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: Date(),
      isFocused: false
    };

    const newState = {
      id: requestCharacters,
      data: [{}],
      isFetching: false,
      category: catCharacters,
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: Date(),
      isFocused: false
    };

    expect(reducer.actualPage(oldState, act.receiveFetch(catCharacters, data, requestCharacters))).toEqual(newState);
  })

  it('Reducer "actualPage" | action "ADD_MORE":: should return a new state with new result added to previous', () => {
    
    const data = {data: {results:[{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6}]}}

    const oldState = {
      id: null,
      data: [{id: 1},{id: 2},{id: 3}],
      isFetching: true,
      offset: {
        characters: 20,
        comics: 20
      },
      receivedAt: null,
      isFocused: false
    };

    const newState = {
      data: [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6}],
      id: null,
      isFetching: false,
      offset: {
        characters: 40,
        comics: 20
      },
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
  
  it('Reducer "actualProfil" | action "REQUEST_RELATED_DATA":: should return a new state with isFetching set to true', () => {

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
        actualRelatedData: [],
        previousRelatedData: []
      }
    };
    
    expect(reducer.actualProfil(oldState, action)).toEqual(newState);
  })
  
  it('Reducer "actualProfil" | action "SET_RELATED_COMICS":: should return a new state with isFetching set to false and related data added to "actual" and "previous" keys', () => {

    const action = {
      type: act.SET_RELATED_COMICS,
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
  
  it('Reducer "actualProfil" | action "RESET_RELATED_COMICS":: should return a new state with isFetching set to false and reset data from "previous" to "actual" key\n\n', () => {

    const action = {
      type: act.RESET_RELATED_COMICS,
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
 
  it('Reducer "relatedData" | action "SET_RELATED_DATA":: should return a new state with new data and set displayed to true', () => {

    const action = {
      type: act.SET_RELATED_DATA,
      data: "bar",
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