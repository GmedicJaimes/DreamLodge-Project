import axios from "axios"
import {
    GET_DETAIL_PROPERTIE,
    GET_DETAIL_USER,
    GET_ALL_PROPERTIES
} from "./action-types"


export const getAllProperties = () => {
    return async function(dispatch){
        const { data } = await axios.get("")
        return dispatch({type: GET_ALL_PROPERTIES, payload: data})
    }
}

export const getDetailPropertie = ( id ) => {
    return async function(dispatch) {
        const { data } = await axios.get("")
        return dispatch({ type: GET_DETAIL_PROPERTIE, payload: data})
    }
}

export const getDetailUser = ( id ) => {
    return async function(dispatch) {
        const { data } = await axios.get("")
        return dispatch({ type: GET_DETAIL_USER, payload: data})
    }
}