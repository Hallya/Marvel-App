import { createStore, combineReducers } from 'redux'

function initReducers() {
    return combineReducers({
        'post': (state = { value: 0 }, action) => {

            switch (action.type) {
                case inc :
                console.log('action passed')    
                return {
                    ...state,
                    value: state.value + action.payload
                }
                case undefined:
                console.log ('action undefined !')
                return state
                default:
                console.log('Nothing to declare')    
                return state
            }
        },
        'postsByCategory': (state = {}, action) => {
            return state;
        }
    })
}

function initStore() {
    return createStore(initReducers())
}

const inc = 'inc'
const addPayload = (value) => {
    return {
        type: inc,
        payload: value
    }
}

console.log('Initialisation of the store')
let store = initStore()
let state = store.getState()
let root = initReducers()


describe('redux tests', () => {

    it('Check initial state', () => {
        let result = root()

        expect(result).toEqual({
            "post": {
                value: 0,
            },
            "postsByCategory": {}
        })
    })



    it('Increm by 2 posts value', () => {
        let result = store.dispatch(addPayload(2))
        console.log('Print of result action => ' + result)
        expect(state).toEqual({
            "post": {
                "value": 2
            },
            'postsByCategory': {}
        })
    })




    it('check store state', () => {

        expect(state).toEqual({
            "post": {
                'value': 2,
            },
            "postsByCategory": {}
        })
    })
})