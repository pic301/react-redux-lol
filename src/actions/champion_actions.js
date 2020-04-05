import { GET_CHAMPION_DATA_REQUEST ,GET_CHAMPION_DATA_SUCCESS ,GET_CHAMPION_DATA_FAITURE  } from "./types"
import { baseURL } from '../components/config'
import  axios  from 'axios'

export const getChampionData = () => async(dispatch) => {
    const response = await axios.get(`${baseURL}/data/ko_KR/champion.json`)
        dispatch({type: GET_CHAMPION_DATA_REQUEST})
    try{
        dispatch({type: GET_CHAMPION_DATA_SUCCESS,payload:response.data.data})
    }
    catch(e) {
        dispatch({type: GET_CHAMPION_DATA_FAITURE,payload:e,})
    }
}