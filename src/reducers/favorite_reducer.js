import { GET_FAVORITE_REQUEST } from "../actions/types";
import { GET_FAVORITE_SUCCESS } from "../actions/types";
import { GET_FAVORITE_FAITURE } from "../actions/types";
import { ADD_FAVORITE } from "../actions/types";
import { REMOVE_FAVORITE } from "../actions/types";

const initialState = {
  myFavorited: false
};

export default function favorite(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITE_REQUEST:
      return { ...state };
    case GET_FAVORITE_SUCCESS:
      return { ...state, myFavorited: action.payload };
    case GET_FAVORITE_FAITURE:
      return { ...state, errorMessage: action.payload };
    case ADD_FAVORITE:
      return { ...state,myFavorited:true};
    case REMOVE_FAVORITE:
      return { ...state,myFavorited:false };
    default:
      return state;
  }
}
