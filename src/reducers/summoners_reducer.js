import { SUMMONERS_NAME } from "../actions/types";

const initialState = {
  summonerName: ""
};
export default function summonerReducer(state = initialState, action) {
  switch (action.type) {
    case SUMMONERS_NAME:
      return {
        ...state,
        summonerName: action.payload
      };
    default:
      return state
  }
}
