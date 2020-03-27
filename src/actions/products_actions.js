import { GET_PRODUCTS } from "./types"
import axios from 'axios'


export const getProducts = (products) =>{
    return {
        type: GET_PRODUCTS ,
        payload:products
    }
}

