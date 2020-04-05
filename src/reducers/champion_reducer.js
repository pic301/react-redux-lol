import { GET_CHAMPION_DATA_REQUEST ,GET_CHAMPION_DATA_SUCCESS ,GET_CHAMPION_DATA_FAITURE } from "../actions/types";


const initialState = {

};
export default function championReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHAMPION_DATA_REQUEST:
      return {
        ...state,
      };
    case GET_CHAMPION_DATA_SUCCESS:
        return {
          ...state,
          championData: action.payload
        };
    case GET_CHAMPION_DATA_FAITURE:
        return {
          ...state,
          errorMessage: action.payload
        }
        
    default:
      return state
  }
}
