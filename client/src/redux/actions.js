import axios from "axios"
import {
    GET_DETAIL_PROPERTIE,
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
//hola cojonudo

export const getDetailPropertie = (user_id, property_id ) => {
    return async (dispatch) => {
        try {
          const response = await axios.get(`http://localhost:5000/dreamlodge-8517c/us-central1/app/users/${user_id}/properties/${property_id}`);
          const propertyData = response.data;
          // Aquí puedes realizar cualquier otra lógica necesaria antes de enviar la propiedad a los reducers
          dispatch({ type: 'GET_PROPERTY_BY_ID_SUCCESS', payload: propertyData });
        } catch (error) {
          dispatch({ type: 'GET_PROPERTY_BY_ID_ERROR', payload: error.message });
        }
      };
};

export const getDetailUser = ( userId ) => {
    return async function(dispatch) {
        const { data } = await axios.get(`http://localhost:5000/dreamlodge-8517c/us-central1/app/users/${userId}`)
        console.log(data, 'data')
        return dispatch({ type: GET_DETAIL_USER, payload: data})
    }
};

export const createPost = (formData) => {
    return async function (dispatch) {
      try {
        const { imageFile, ...otherData } = formData;
        const formDataWithoutImage = { ...otherData };
  
        const response = await axios.post(
          `http://localhost:5000/dreamlodge-8517c/us-central1/app/properties`,
          formDataWithoutImage
        );
  
        // Ahora, sube la imagen a Firebase Storage y obtén su URL
        const imageURL = await uploadImageToStorage(imageFile);
  
        // Actualiza la propiedad creada con la URL de la imagen
        await axios.patch(
          `http://localhost:5000/dreamlodge-8517c/us-central1/app/properties/${response.data.id}`,
          { image: imageURL }
        );
  
        return response;
      } catch (error) {
        console.log(error);
      }
    };
  };
  


