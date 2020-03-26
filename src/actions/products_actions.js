import { GET_PRODUCTS } from "./types"



export const getProducts = (products) =>{
    return {
        type: GET_PRODUCTS ,
        payload:products
    }
}
