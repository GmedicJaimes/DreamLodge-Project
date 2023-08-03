import { GET_EXAMPLE } from "./action-types"

const initialState = {
    propertys : [],
    numerito : 0
}

const reducer = ( state = initialState, actions) => {
    const { type, payload } = actions

    switch (type) {
        case GET_EXAMPLE:
            return {
                ...state,
                numerito : payload
            }
        default:
            return { ...state }
    }
}

export default reducer