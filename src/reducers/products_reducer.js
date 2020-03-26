
export const GET_PRODUCTS  = 'get_products'

const initialState={
  products:""
}

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return { ...state, products: action.payload };
      default:
        return state;
    }
  }
  