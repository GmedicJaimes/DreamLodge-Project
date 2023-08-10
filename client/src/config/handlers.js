
import { useState } from 'react';
import {getDocs, collection, addDoc, updateDoc, doc,getDoc,setDoc,getFirestore,where,query} from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { storage, db, auth, googleProvider } from './firebase';



//VARIABLES CON INFORMACION DE RUTAS/REFERENCIAS DE FIREBASE:
const propertiesCollectionRef= collection(db, "properties"); 
// const propertiesDetailId = collection(db, `properties/${documentId}`)
const imageUrlRef = ref(storage, 'properties/')




export const getUserByUID = async (targetUID) => {
  const db = getFirestore();

  // Obtener el documento del usuario de Firestore
  const userDocRef = doc(db, 'users', targetUID);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    const userProperties = await getUserProperties(targetUID); // Obtener las propiedades del usuario
    return {
      ...userDocSnapshot.data(),  // Todos los campos almacenados en Firestore para ese usuario
      uid: targetUID,  // Añadimos el UID al objeto resultante
      properties: userProperties  // Agregamos las propiedades al objeto resultante
    };
  } else {
    // El documento no existe, puedes manejar este caso como prefieras
    console.error(`No user found for UID: ${targetUID}`);
    return null;
  }
};



// Función para obtener las propiedades de un usuario
const getUserProperties = async (targetUID) => {
  const propertiesQuery = query(propertiesCollectionRef, where('userId', '==', targetUID));
  const propertiesQuerySnapshot = await getDocs(propertiesQuery);
  
  const userProperties = propertiesQuerySnapshot.docs.map((doc) => {
    const propertyData = doc.data();
    return {
      ...propertyData,
      id: doc.id
    };
  });

  return userProperties;
};

// ESTADOS LOCALES PARA MANEJAR LA INFO DE LAS FUNCIONES
// const [email, setEmail] = useState("")
// const [password, setPassword] = useState("");
// const [propertiesList, setPropertiesList] = useState([]);
// const [newPropName, setNewPropName] = useState("");
// const [newPropRooms, setNewPropRooms] = useState(0);
// const [newPropDisponible, setNewPropDisponible] = useState(false); 
// const [newPropType, setNewPropType] = useState([]);
// const [updateNameProp, setUpdateNameProp] = useState("");
// const [file, setFile] = useState(null);
// const [image, setImage] = useState([]);

// funcion para SIGNIN normal


export const signIn = async(auth, email, password) => {
  try {
      return await createUserWithEmailAndPassword(auth, email, password);      
  } catch (error) {
      console.log(error)
      throw error;
  }
};



export const registerUserInFirestore = async (uid, user) => {
  const usersCollectionRef = collection(db, "users");
  try {
    await setDoc(doc(usersCollectionRef, uid), user); // Utiliza el uid como ID de documento
    console.log("Usuario registrado con éxito en Firestore.");
  } catch (error) {
    console.error("Error al registrar al usuario en Firestore:", error);
  }
};




// funcion para LOGIN 

export const logIn = async (auth, email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      throw new Error("Wrong password!");
    } else if (error.code === "auth/user-not-found") {
      throw new Error("Email not exist!");
    } else {
      throw new Error("Authentication error!"); // Maneja todos los otros errores posibles
    }
  }
};


//FUNCTION SI EL EMAIL YA EXISTE EN FIRESTORES

export const doesEmailExistInFirestore = async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  return snapshot.size > 0;
};



export const signInGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    if (result.user) {
      const user = result.user;

      const nameParts = user.displayName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";


      const userData = {
        email: user.email,
        name: firstName,
        lastName: lastName,
        id: user.uid,
        country: "USA", 
        language: ["english"], 
        image: user.photoURL ? user.photoURL : "https://randomuser.me/api/portraits/men/7.jpg",
        createdAt: new Date().toLocaleDateString(),
        banner: "https://fastly.picsum.photos/id/350/900/312.jpg?hmac=2opChRRZ2uKiCmlNIWYbHe3rH2jfQbDIRcfzTwdFGtc",
      };

      // Pide al usuario información adicional
      // const additionalData = await requestAdditionalData();
      // userData.country = additionalData.country;
      // userData.language = additionalData.language;

      await setDoc(doc(db, 'users', user.uid), userData);

      // Envía un mensaje al padre indicando autenticación exitosa
      if (window.opener) {
        window.opener.postMessage('auth-success', window.location.origin);
    } else {
        console.log('window.opener es null. ¿Estás seguro de que esta página se abrió desde una ventana emergente?');
    }
    }
  } catch (error) {
    console.log('Error durante la autenticación con Google:', error);
  }
};



// funcion para LOGOUT
export const logOut = async()=>{
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error)
    }
};


// funcion para POSTEAR PROPIEDADES
export const createProp = async (formData, file) => {
  try {
    let imageUrl = null;
    // Subimos la imagen al storage y obtenemos su URL si hay un archivo seleccionado
    if (file) {
      const folderRef = ref(storage, `properties/${file.name + v4()}`);
      await uploadBytes(folderRef, file);
      imageUrl = await getDownloadURL(folderRef);
    }

    // Obtenemos el userId del usuario actual
    const userId = auth?.currentUser?.uid;


    await addDoc(propertiesCollectionRef, {
      name: formData.name,
      type: formData.type,
      stances: formData.stances,
      disponible: formData.disponible,
      location: formData.location,
      imageUrl: imageUrl,
      description: formData.description,
      price: formData.price,
      tokenMp: formData.tokenMp,
      userId: userId
    });


    getPropertiesList();

    alert('¡Propiedad creada!');
  } catch (error) {
    alert(`La pifiamo'`);
  }
};


//funcion para ACTUALIZAR PROPIEDADES
export const updateProperty = async( id, property )=>{
  const { name, description, price, location, type, services, stances, available } = property
    try {
        const propertyDB = doc(db, 'properties', id);
          await updateDoc(propertyDB, {
            name,
            description,
            price,
            location,
            type,
            services,
            stances,
            available
          })
    } catch (error) {
        console.log(error)
    }
};

export const updateUser = async( user ) => {
  const { uid, name, lastName, email, country, languages, image } = user

  try {
    const userDB = doc(db, "users", uid)
    await updateDoc(userDB, {
      name,
      lastName,
      email,
      country,
      languages,
      image
    })
  } catch (error) {
    
  }
}
//funcion para TRAER LAS PROPIEDADES, INCLUSIVE LAS IMAGENES (SI TIENEN)
/*  export const getPropertiesList = async () => {
    try {
      const data = await getDocs(propertiesCollectionRef);
      const filterData = await Promise.all(
        data.docs.map(async (doc) => {
          const propertyData = doc.data();
          // si encontramos url de la imagen, la buscamos en el storage y la agregamos al propertyData
          if (propertyData.imageUrl) {
            const imageUrlRef = ref(storage, propertyData.imageUrl);
            propertyData.imageUrl = await getDownloadURL(imageUrlRef);
          }
          return {
            ...propertyData,
            id: doc.id
          };
        })
      );
      console.log(filterData);
      setPropertiesList(filterData);
    } catch (error) {
      console.log(error);
    }
  }; 

   */

// handlers.js
export const getPropertiesList = async () => {
  try {
    const data = await getDocs(propertiesCollectionRef);
    // console.log("Fetching properties...", data)
    const filterData = await Promise.all(
      data.docs.map(async (doc) => {
        const propertyData = doc.data();
        console.log(propertyData);
        // si encontramos url de la imagen, la buscamos en el storage y la agregamos al propertyData
        if (propertyData.imageUrl) {
          const imageUrlRef = ref(storage, propertyData.imageUrl);
          propertyData.imageUrl = await getDownloadURL(imageUrlRef);
        }
        return {
          ...propertyData,
          id: doc.id
        };
      })
    );
    // console.log(filterData);
    return filterData; // Asegúrate de retornar el array de propiedades
  } catch (error) {
    console.log(error);
    return []; // En caso de error, retorna un array vacío o maneja el error de manera adecuada.
  }
};

//* funcion para RENDERIZAR EL DETAIL DE UNA PROPIEDAD
export const detailId = async (id) =>{
  try {
    const refProperty = doc(db, 'properties' , id)
    console.log(refProperty)
    const propertySnapshot = await getDoc(refProperty);
    console.log(propertySnapshot.exists());

   
    if(propertySnapshot.exists()){
      
      console.log( 'Document data:  ', propertySnapshot.data())
      return propertySnapshot.data();
    } else {
      console.log( 'no existe nada de info') 
    }
  } catch (error) {
    console.log(error)
  }
}

//funcion para CARGAR ARCHIVOS (SIN IDENTIFICAR)
export const uploadFile = async()=>{
    if(!file) return;
    const folderRef = ref(storage, `properties/${file.name + v4()}`);
    try {
      await uploadBytes(folderRef, file)
      console.log(folderRef)
      alert('la imagen fue enviada a la base de datos')
    } catch (error) {
      console.log(error)
    }
  };

//funcion para DESCARGAR ARCHIVOS(DE PROPERTIES)
export const dowloadImg = ()=> {
    listAll(imageUrlRef).then((response) => {
    const urls = [];
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        urls.push(url);
        setImage(urls); 
      })
    })
  })
};


export const getPropertiesByType = async (type) => {
  try {
    const propertiesQuery = query(propertiesCollectionRef, where('type', 'array-contains-any', [type]));
    const propertiesQuerySnapshot = await getDocs(propertiesQuery);

    const filteredProperties = propertiesQuerySnapshot.docs.map((doc) => {
      const propertyData = doc.data();
      return {
        ...propertyData,
        id: doc.id
      };
    });

    return filteredProperties;
  } catch (error) {
    console.log(error);
    return []; // Maneja el error de manera adecuada retornando un array vacío u otra respuesta que consideres.
  }
};

// export const getPropertiesByType = async (type) => {
//   try {
//     if (!type) {
//       console.log('no llega el type'); // Si el tipo no está definido, retornamos un array vacío
//     }

//     console.log(type)
//     const querySnapshot = await getDocs(query(propertiesCollectionRef, where("type", "array_contains", type)));
//     const properties = [];

//     querySnapshot.forEach((doc) => {
//       const property = doc.data();
//       properties.push(property);
//     });
//     if(!properties.length){
//     console.log('properties empty')
//     }
//     return properties;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const getPropertiesByState = async (state) => {
//   try {
//     const querySnapshot = await getDocs(query(propertiesCollectionRef, where("location.state", "==", state)));
//     const properties = [];

//     querySnapshot.forEach((doc) => {
//       const property = doc.data();
//       properties.push(property);
//     });

//     return properties;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

export const getAvailableProperties = async () => {
  try {
    const querySnapshot = await getDocs(query(propertiesCollectionRef, where('disponible', '==', true)));
    const availableProperties = [];

    querySnapshot.forEach((doc) => {
      const property = doc.data();
      availableProperties.push(property);
    });

    return availableProperties;
  } catch (error) {
    console.error(error);
    return [];
  }
};

