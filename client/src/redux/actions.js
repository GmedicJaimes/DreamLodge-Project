import {
    GET_EXAMPLE, 
    GET_DETAIL_PROPERTY
} from "./action-types"

export const getExample = () => {
    return { type: GET_EXAMPLE, payload: 1}
}

export const getDetailProperty = ( id ) => {
    return { type: GET_DETAIL_PROPERTY, payload: id }
}