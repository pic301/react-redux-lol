import {combineReducers} from 'redux'

import user from './user_reducer'
import chats from './chat_reducer'
import favorite from './favorite_reducer'

const rootReducer = combineReducers({
    user,
    chats,
    favorite

});

export default rootReducer