import axios from "axios"
import {
    GET_DETAIL_USER,
    GET_ALL_PROPERTIES,
    GET_DETAIL_PROPERTY,
    NEW_ACCOUNT,
    NEW_POST
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
};

export const createPost = (formData) => {
    return async function (dispatch) {
      try {
        // const { imageFile, ...otherData } = formData;
        // const formDataWithoutImage = { ...otherData };
  
        const response = await axios.post(
          `http://localhost:5000/dreamlodge-8517c/us-central1/app/properties`,
          formData
        );

        console.log(response)
  
        // // Ahora, sube la imagen a Firebase Storage y obtén su URL
        // const imageURL = await uploadImageToStorage(imageFile);
  
        // // Actualiza la propiedad creada con la URL de la imagen
        // await axios.patch(
        //   `http://localhost:5000/dreamlodge-8517c/us-central1/app/properties/${response.data.id}`,
        //   { image: imageURL }
        // );
  
        return dispatch({
          type: NEW_POST, payload: response
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
  


export const userLogin = ( data ) => {
    console.log(`email: ${data.email}, password: ${data.password}`);
}

export const userRegister = ( registerData ) => {
    return async function(dispatch){
        try {
          const response = await axios.post("http://localhost:5000/dreamlodge-8517c/us-central1/app/users", registerData);
            return dispatch({ type: NEW_ACCOUNT, payload: response.data})
        } catch (error) {
            return
        }
    }
}