import { SUMMONERS_NAME } from "./types"
import { SUMMONERS_ID } from "./types"


export const summonersName = (name) =>{
    return {
        type: SUMMONERS_NAME,
        payload:name
    }
}
export const summonerId = (id) =>{
    return {
        type: SUMMONERS_ID,
        payload:id
    }
}