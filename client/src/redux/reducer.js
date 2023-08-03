import { 
    GET_EXAMPLE,
    GET_DETAIL_PROPERTY 
} from "./action-types"

const initialState = {
    propertys : [],
    detailProperty : {}
}

const reducer = ( state = initialState, actions) => {
    const { type, payload } = actions

    switch (type) {
        case GET_DETAIL_PROPERTY:
            return {
                ...state,
                detailProperty : payload
            }
        default:
            return { ...state }
    }
}

export default reducer