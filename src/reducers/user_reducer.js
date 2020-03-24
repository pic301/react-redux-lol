import { LOGIN_USER, ADD_TO_CART_USER } from "../actions/types";
import { REGISTER_USER } from "../actions/types";
import { AUTH_USER } from "../actions/types";
import { LOGOUT_USER } from "../actions/types";

const initialState = {
  
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, loginSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case ADD_TO_CART_USER:
      return{ ...state, userData:{
        ...state.userData,cart:action.payload
      }};
    default:
      return state;
  }
}
