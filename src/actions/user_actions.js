import axios from 'axios';

// =============================
//         액션타입
// =============================
import  {LOGIN_USER} from './types'
import  { REGISTER_USER } from './types'
import  { GET_FAVORITE_REQUEST } from './types'
import  { GET_FAVORITE_SUCCESS } from './types'
import  { GET_FAVORITE_FAITURE } from './types'




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
