const initialState = {
    propertys : []
}

const reducer = ( state = initialState, actions) => {
    const { type, payload } = actions

    switch (type) {

        default:
            return { ...state }
    }
}