import { LOGIN_USER } from "../actions/types";
import { REGISTER_USER } from "../actions/types";


const initialState = {
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
}
