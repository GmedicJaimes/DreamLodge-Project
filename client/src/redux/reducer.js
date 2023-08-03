import { 
    GET_ALL_PROPERTYS,
    GET_DETAIL_PROPERTY,
    GET_DETAIL_USER 
} from "./action-types"

const initialState = {
    allPropertys : [],
    detailProperty : {},
    detailUser: {}
}

const reducer = ( state = initialState, actions) => {
    const { type, payload } = actions

    switch (type) {
        case GET_ALL_PROPERTYS: 
            return {
                ...state,
                allPropertys: payload
            }

        case GET_DETAIL_PROPERTY:
            return {
                ...state,
                detailProperty : {}
            }
        
        case GET_DETAIL_USER: 
            return{
                ...state,
                detailUser: {}
            }
        default:
            return { ...state }
    }
}

export default reducer