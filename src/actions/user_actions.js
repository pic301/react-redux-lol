import axios from 'axios';

// =============================
//         액션타입
// =============================
import  {LOGIN_USER} from './types'
import  { REGISTER_USER } from './types'
import  { AUTH_USER } from './types'
import  { LOGOUT_USER } from './types'
import  { GET_FAVORITE_REQUEST } from './types'
import  { GET_FAVORITE_SUCCESS } from './types'
import  { GET_FAVORITE_FAITURE } from './types'
import  { ADD_TO_CART_USER } from './types'




// =============================
//         액션생성함수
// =============================
export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login',dataToSubmit)
    .then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: request
    }

}

export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register',dataToSubmit)
    .then(res => res.data)

    return {
        type: REGISTER_USER,
        payload: request
    }

} 

export function auth(){
    const request = axios.get('/api/users/auth')
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get('/api/users/logout')
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export const getFavorite = (variables) => async(dispatch) => {
    const response = await axios.post("/api/favorite/myFavorited", variables)
        dispatch({type: GET_FAVORITE_REQUEST})
    try{
        dispatch({type: GET_FAVORITE_SUCCESS,payload:response.data.myFavorited})
    }
    catch(e) {
        dispatch({type: GET_FAVORITE_FAITURE,payload:e,})
    }
}


export const addToCart = (product) => {
    console.log(product)
    const request =  axios.post("/api/users/addToCart",product).then(res => res.data)
    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}