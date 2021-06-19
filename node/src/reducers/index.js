import partiesReducer from './parties';
import loggedReducer from './isLogged';
import politiciansReducer from './politicians';
import {combineReducers} from 'redux';
import errorMessageReducer from './errors'

const allReducers = combineReducers({
    loggedReducer,
    partiesReducer,
    politiciansReducer,
    errorMessageReducer
})

export default allReducers