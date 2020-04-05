import {combineReducers} from 'redux'

import user from './user_reducer'
import summoners from './summoners_reducer'
import favorite from './favorite_reducer'
import products from './products_reducer'
import champion from './champion_reducer'

const rootReducer = combineReducers({
    user,
    summoners,
    favorite,
    products,
    champion,
});

export default rootReducer