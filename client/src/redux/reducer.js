import { 
    GET_ALL_PROPERTIES,
    GET_DETAIL_PROPERTIE,
    GET_DETAIL_USER,
    GET_DETAIL_PROPERTY
} from "./action-types"

const initialState = {
    allProperties : [],
    detailPropertie : [],
    detailUser: []
}

const reducer = ( state = initialState, actions) => {
    const { type, payload } = actions

    switch (type) {
        case GET_ALL_PROPERTIES: 
            return {
                ...state,
                allProperties: payload,
            }

        case GET_DETAIL_PROPERTIE:
            return {
                ...state,
                detailPropertie : payload
            }
        
        case GET_DETAIL_USER: 
            return{
                ...state,
                detailUser: payload
            }
        case GET_DETAIL_PROPERTY: 
            return {
                ...state,
                detailProperty: payload 
            }
        default:
            return { ...state }
    }
}

export default reducer