import axios from "axios"
import {
    GET_DETAIL_USER,
    GET_ALL_PROPERTIES,
    GET_DETAIL_PROPERTY
} from "./action-types"


export const getAllProperties = () => {
    return async function(dispatch){
        const { data } = await axios.get("http://localhost:5000/dreamlodge-8517c/us-central1/app/properties")
        return dispatch({type: GET_ALL_PROPERTIES, payload: data})
    }
}

export const getDetailProperty = ( id ) => {
    return async (dispatch) => {
        try {
          const response = await axios.get(`http://localhost:5000/dreamlodge-8517c/us-central1/app/properties/${id}`);
          const propertyData = response.data;

          dispatch({ type: GET_DETAIL_PROPERTY, payload: propertyData });
        } catch (error) {
          dispatch({ type: GET_DETAIL_PROPERTY, payload: error.message });
        }
      };
    };

export const getDetailUser = ( id ) => {
    return async function(dispatch) {
        const { data } = await axios.get(`http://localhost:5000/dreamlodge-8517c/us-central1/app/users/${id}`)

        return dispatch({ type: GET_DETAIL_USER, payload: data})
    }
}