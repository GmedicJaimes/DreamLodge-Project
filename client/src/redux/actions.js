import axios from "axios"
import {
    GET_DETAIL_PROPERTIE,
    // GET_DETAIL_USER,
    GET_ALL_PROPERTIES
} from "./action-types"


export const getAllProperties = () => {
    return async function(dispatch){
        const { data } = await axios.get("http://localhost:5000/dreamlodge-8517c/us-central1/app/properties")
        return dispatch({type: GET_ALL_PROPERTIES, payload: data})
    }
}

export const getDetailPropertie = (id ) => {
    return async (dispatch) => {
        try {
          const response = await axios.get(``);
          const propertyData = response.data;
          // Aquí puedes realizar cualquier otra lógica necesaria antes de enviar la propiedad a los reducers
          dispatch({ type: 'GET_PROPERTY_BY_ID_SUCCESS', payload: propertyData });
        } catch (error) {
          dispatch({ type: 'GET_PROPERTY_BY_ID_ERROR', payload: error.message });
        }
      };
    };

// export const getDetailUser = ( userId ) => {
//     return async function(dispatch) {
//         const { data } = await axios.get(`http://localhost:5000/dreamlodge-8517c/us-central1/app/properties/${userId}`)
//         console.log(data, 'data')
//         return dispatch({ type: GET_DETAIL_USER, payload: data})
//     }
// }