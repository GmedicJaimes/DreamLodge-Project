import { 
    GET_ALL_PROPERTIES,
    GET_DETAIL_USER,
    GET_DETAIL_PROPERTY,
    NEW_ACCOUNT, 
    NEW_POST,
    GET_DETAIL_CLEAR,
    SEARCH_PROPERTY
} from "./action-types"

const initialState = {
    allProperties : [],
    detailProperty : {},
    detailUser: {},
    accCreated: []
}

const reducer = ( state = initialState, actions) => {
    const { type, payload } = actions

    switch (type) {
        case GET_ALL_PROPERTIES: 
            return {
                ...state,
                allProperties: payload,
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
        case SEARCH_PROPERTY:
            return{
                ...state,
                allProperties:payload
            } 
        case GET_DETAIL_CLEAR:
                return initialState
    
        case NEW_ACCOUNT: 
            return console.log(payload);

            case NEW_POST: 
            console.log(state.allProperties)
            return {
                ...state, allProperties: [...state.allProperties, payload]
            }
        
        default:
            return { ...state }
    }
}

export default reducer