import { combineReducers, createStore } from 'redux'
import { applyMiddleware } from 'redux'
import * as Actions from "../actions/actions"
import thunk from 'redux-thunk'
import "isomorphic-fetch"
import { fetchMiddleware } from '../middlewares/fetchMiddleware';


let ALREADY_FETCHED = "FOOBAR";

function posts(
    state = { items: []}, action) {
    switch (action.type) {
        case ALREADY_FETCHED:
            return {
                ...state
            } 
        // case Actions.REQUEST_POSTS:
        case Actions.RECEIVE_POSTS:
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        id: action.fetchId,
                        data: action.posts,
                        storedAt: action.receivedAt
                    }
                ],
            }
        default:
        return state
    }
}

function postsByCategory(
    state = {
        isFetching:false,
        characters: {
            items: []
        },
        comics: {
            items: []
        }
    },
    action
) {
    switch (action.type) {
        case ALREADY_FETCHED:
        case Actions.RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                [action.category]: posts(state[action.category], action)
            }) 
        case Actions.REQUEST_POSTS:
            return {...state, isFetching : true}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postsByCategory,
    posts
})

function logger({ getState }) {
    return next => action => {
        console.log('--------------------------------------------------------------')
        console.log('will dispatch', action)
        let returnValue = next(action)
        
        console.log('==============================================================')
        console.log('state after dispatch', getState())
        
        return returnValue
    }
}

const store = createStore(rootReducer, applyMiddleware(thunk, logger))
// const fetchHulk = 'characters?name=Hulk'
// const fetchLogan = 'characters?name=Logan'
/*//////////////////////////////////////////////////////////////////////////////////
TEST
////////////////////////////////////////////////////////////////////////////*//////

describe('Reducer', () => {
    
    // // const hulk = {
    //     id: 1009351,
    //     name: 'Hulk',
    //     description: 'Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk. An all too often misunderstood hero, the angrier the Hulk gets, the stronger the Hulk gets.',
    //     modified: '2014-06-10T16:12:58-0400',
    //     thumbnail: [Object],
    //     resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009351',
    //     comics: [Object],
    //     series: [Object],
    //     stories: [Object],
    //     events: [Object],
    //     urls: [Object]
    // }
    // // const Logan = {
    //     id: 4509351,
    //     name: 'Logan',
    //     description: 'Beast with adamantium skelett and super regenerative power .',
    //     modified: '2014-06-10T16:12:58-0400',
    //     thumbnail: [Object],
    //     resourceURI: 'http://gateway.marvel.com/v1/public/characters/6743251',
    //     comics: [Object],
    //     series: [Object],
    //     stories: [Object],
    //     events: [Object],
    //     urls: [Object]
    // }

    // // const addHero = (category, object, url) => {
    //     return {
    //         type: 'RECEIVE_POSTS',
    //         category: category,
    //         fetchId: url,
    //         posts : object,
    //         receivedAt: Date()
    //     }
    // }
    // // const noFetchNeeded = (category, object) => {
    //     return {
    //         type: ALREADY_FETCHED,
    //         category: category,
    //         name: object.data.name
    //     }
    // }

    // // const checkForItems = cat => !!(cat.items && cat.items.length)

    // // const shouldFetchPosts = (categoryChoosen, url, object) => {
    //     // const { postsByCategory } = store.getState()
    //     let posts;

    //     if (checkForItems(postsByCategory[categoryChoosen])) {
    //         posts = postsByCategory[categoryChoosen].items.find(obj => { return obj.id === url });
    //     }
    //     if (posts) {
    //         return dispatch => dispatch(noFetchNeeded(categoryChoosen, posts))
    //     }
    //     return dispatch => {
    //         dispatch(addHero(categoryChoosen, object, url))
    //     }
    // }

    it('test middleware', () => {

        // let store = {
        //     getState: jest.fn(),
        //     dispatch: jest.fn()
        // }

        // let first = fetchMiddleware(store);
        // console.log('\n\n- first is => \n' + first);
        // console.log('\n\n- first executed is => \n ' + first())
        

        // let second = first();
        // console.log('\n\n- second is =>  \n' + second);
        // console.log('\n\n- second executed is =>  \n' + second())
        

        // let third = second();
        // console.log('\n\n- third is =>  \n' + third);
        // console.log('\n\n- third executed is => \n ' + third())

        // const bar = ({ foo, bar }) => next => action => action + 1; return next(action);
        // const foo = store
        
        
        const reducer = (state, action) => {
            if (action.type === "ADD"){
                return {
                    ...state,
                    array: state.array.push(action.value)
                };
            }
            return state;
        }        
        
        const state = { array: [] };
        
        let createState  = function (obj, reducer) {
            return {
                [reducer]: reducer(obj)
            };
        };

        const init = (func1) => (obj, func2) => { func1(obj, func2) }


        expect(bar(car)(lar, tar)).toEqual("")


        // enhancer(createStore)(reducer, preloadedState);

        // function enhancer(f) {
        //     //..

        //     return (r, p) => {}
        // }


        // let result = enhancer({})

        // result({}, {});




    })

    // it('test destructuring object', () => {
    //     let toto = {
    //         getState: 1,
    //         dispatch: 2,
    //         foobar: 3
    //     }

    //     let func = ({ getState, dispatch }) => {
    //         return {
    //             getState: getState,
    //             dispatch: dispatch,
    //         }
    //     }

    //     expect(func(toto)).toEqual({
    //         getState: 1,
    //         dispatch: 2
    //     });
    // });
})