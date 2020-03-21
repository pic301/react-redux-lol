import { SUMMONERS_NAME } from "../actions/types";
import { SUMMONERS_ID } from "../actions/types";

const initialState = {
  summonerName: "",
  summonerId:""
};
export default function summonerReducer(state = initialState, action) {
  switch (action.type) {
    case SUMMONERS_NAME:
      return {
        ...state,
        summonerName: action.payload
      };
    case SUMMONERS_ID:
        return {
          ...state,
          summonerId: action.payload
        };
    default:
      return state
  }
}
