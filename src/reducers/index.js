import {combineReducers} from 'redux'

import user from './user_reducer'
import summoners from './summoners_reducer'
import favorite from './favorite_reducer'

const rootReducer = combineReducers({
    user,
    summoners,
    favorite

});

export default rootReducer