import { SUMMONERS_NAME } from "./types"


export const summonersName = (name) =>{
    return {
        type: SUMMONERS_NAME,
        payload:name
    }
}