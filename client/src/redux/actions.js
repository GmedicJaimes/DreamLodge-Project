import axios from "axios"
import {
    GET_DETAIL_PROPERTY,
    // GET_DETAIL_USER,
    GET_ALL_PROPERTIES
} from "./action-types"


export const getAllProperties = () => {
    return async function(dispatch){
        const { data } = await axios.get("http://localhost:5000/dreamlodge-8517c/us-central1/app/properties")
        return dispatch({type: GET_ALL_PROPERTIES, payload: data})
    }
}

export const getDetailProperty = ( property_id ) => {
    return async (dispatch) => {

          const { data } = await axios.get(`http://localhost:5000/dreamlodge-8517c/us-central1/app/properties/${property_id}`);
          console.log(data);
          // Aquí puedes realizar cualquier otra lógica necesaria antes de enviar la propiedad a los reducers
          return dispatch({ type: GET_DETAIL_PROPERTY, payload: data });
      };
    };

export const getDetailUser = ( userId ) => {
    return async function(dispatch) {
        const { data } = await axios.get(`http://localhost:5000/dreamlodge-8517c/us-central1/app/users/${userId}`)
        console.log(data, 'data')
        return dispatch({ type: GET_DETAIL_USER, payload: data})
    }
}