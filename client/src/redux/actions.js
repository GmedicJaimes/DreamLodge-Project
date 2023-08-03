import axios from "axios"
import {
    GET_DETAIL_PROPERTY,
    GET_DETAIL_USER,
    GET_ALL_PROPERTYS
} from "./action-types"

export const getAllPropertys = () => {
    return { type: GET_ALL_PROPERTYS}
}

export const getDetailProperty = ( id ) => {
    console.log(`Detail propery ${id}`);
    return { type: GET_DETAIL_PROPERTY }
}

export const getDetailUser = ( id ) => {
    console.log(`Detail user ${id}`);
    return { type: GET_DETAIL_USER}
}