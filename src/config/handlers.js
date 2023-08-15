
import { useState } from 'react';
import {getDocs, collection, addDoc, updateDoc, doc,getDoc,setDoc,getFirestore,where,query} from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';
import {createUserWithEmailAndPassword, sendEmailVerification,getAuth, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
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





export const signIn = async (auth, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      alert("Welcome to DreamLodge!");
      // No es necesario enviar la verificación de correo electrónico aquí
    }
    return userCredential;      
  } catch (error) {
    console.log("Error in signIn function:", error);
    throw error;
  }
};







// AGUARDA POR VERIFICAION DE EMAIL

// export  const waitForEmailVerification = (user, timeout = 60000, interval = 5000) => {
//   return new Promise((resolve, reject) => {
//       let totalTime = 0;

//       const checkEmailVerification = async () => {
//           await user.reload();

//           if (user.emailVerified) {
//               resolve();
//           } else if (totalTime >= timeout) {
//               reject(new Error('La verificación ha tardado demasiado'));
//           } else {
//               totalTime += interval;
//               setTimeout(checkEmailVerification, interval);
//           }
//       };

//       checkEmailVerification();
//   });
// };



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
    let imageUrl = [];
    // Subimos la imagen al storage y obtenemos su URL si hay un archivo seleccionado
    if (formData.imageFile && formData.imageFile.length > 0) {
      for (const file of formData.imageFile) {
        const folderRef = ref(storage, `properties/${file.name + v4()}`);
        await uploadBytes(folderRef, file);
        const singleImageUrl = await getDownloadURL(folderRef);
        imageUrl.push(singleImageUrl);
      }
    }
    // Obtenemos el userId del usuario actual
    const userId = auth?.currentUser?.uid;


    await addDoc(propertiesCollectionRef, {
      name: formData.name,
      type: formData.type,
      stances: formData.stances,
      available: formData.available,
      location: formData.location,
      imageUrl: imageUrl,
      description: formData.description,
      price: formData.price,
      services:formData.services,
      userId: userId
    });

    console.log(formData)


    getPropertiesList();

    alert('¡Propiedad creada!');
  } catch (error) {
    console.log(error)
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
  // handlers.js
// export const getPropertiesList = async () => {
//   try {
//     const data = await getDocs(propertiesCollectionRef);
//     // console.log("Fetching properties...", data)
//     const filterData = await Promise.all(
//       data.docs.map(async (doc) => {
//         const propertyData = doc.data();
//         // si encontramos url de la imagen, la buscamos en el storage y la agregamos al propertyData
//         if (propertyData.imageUrl) {
//           const imageUrlRef = ref(storage, propertyData.imageUrl);
//           propertyData.imageUrl = await getDownloadURL(imageUrlRef);
//         }
//         return {
//           ...propertyData,
//           id: doc.id
//         };
//       })
//     );
//     // console.log(filterData);
//     return filterData; // Asegúrate de retornar el array de propiedades
//   } catch (error) {
//     console.log(error);
//     return []; // En caso de error, retorna un array vacío o maneja el error de manera adecuada.
//   }
// };

export const getPropertiesList = async (page, perPage) => {
  try {
    const data = await getDocs(propertiesCollectionRef);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const filterData = await Promise.all(
      data.docs.slice(startIndex, endIndex).map(async (doc) => {
        const propertyData = doc.data();
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

    return filterData;
  } catch (error) {
    console.log(error);
    return [];
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
// export const uploadFile = async()=>{
//     if(!file) return;
//     const folderRef = ref(storage, `properties/${file.name + v4()}`);
//     try {
//       await uploadBytes(folderRef, file)
//       console.log(folderRef)
//       alert('la imagen fue enviada a la base de datos')
//     } catch (error) {
//       console.log(error)
//     }
//   };


/// PRUEBAAAAA CHRISTIAN


export const uploadFile = async (file) => {
  if (!file) return;

  const storage = getStorage(); // Assuming you've initialized your Firebase storage instance
  const folderRef = ref(storage, `properties/${uuidv4()}_${file.name}`);
  
  try {
    await uploadBytes(folderRef, file);
    console.log(folderRef.fullPath);
    alert('The image was successfully uploaded to the database');
  } catch (error) {
    console.log(error);
    alert('Error uploading the image');
  }
};


/// PRUEBAAAAA CHRISTIAN


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
//     const querySnapshot = query(propertiesCollectionRef, where("location.state", "==", state));
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

//filtro para buscar por DISPONIBLE!!!
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

//.............................TODAVIA NO ANDA....................................................
// filtro para BUSCAR POR ESTADOS!!!!
// export const filterPropertiesBySearch = async (searchValue) => {
//   try {
//     // console.log(searchValue);
//     const propertiesQuery = query(propertiesCollectionRef, where('location.state', '==', searchValue), where('location.city', '==', searchValue));
//     const propertiesQuerySnapshot = await getDocs(propertiesQuery);
//     // console.log(propertiesQuerySnapshot);

//     const filteredProperties = propertiesQuerySnapshot.docs.map((doc) => {
//       const propertyData = doc.data()
//       return {
//         ...propertyData,
//         id: doc.id
//       };
//     })

//     return filteredProperties;
//   } catch (error) {
//     // console.error(error);
//     return [];
//   }
// };

//................................................................................................

// Función para ordenar propiedades por precio
export const sortPropertiesByPrice = (properties, ascending) => {
  return [...properties].sort((a, b) => {
    if (ascending) {
      return a.price - b.price; // Ordenar en forma ascendente
    } else {
      return b.price - a.price; // Ordenar en forma descendente
    }
  });
};

//======================================== BOOKING SECTION ========================================
//======================================== BOOKING SECTION ========================================
//======================================== BOOKING SECTION ========================================
//======================================== BOOKING SECTION ========================================


// Función para verificar si una propiedad está disponible en las fechas seleccionadas
export  const isPropertyAvailable = async ( startDate, endDate) => {
  const bookingsRef = collection(db, "bookings");
  const q = query(
      bookingsRef, 
      where("startDate", "<=", endDate),
      where("endDate", ">=", startDate)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.size === 0;  // si el tamaño es 0, la propiedad está disponible
};

// Función para crear una reserva
export const createBooking = async (propertyId, bookingData) => {
  try {
    // Verificamos la disponibilidad primero
    if (await isPropertyAvailable(propertyId, bookingData.startDate, bookingData.endDate)) {
      
      await addDoc(bookingsCollectionRef, {
        propertyId: propertyId,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        adults: bookingData.adults,
        children: bookingData.children,
        rooms: bookingData.rooms,
        userId: auth?.currentUser?.uid,
      });

      alert('¡Reserva realizada!');

    } else {
      console.log('Property is not available for the selected dates');
      alert('La propiedad no está disponible en las fechas seleccionadas.');
    }

  } catch (error) {
    console.log(error)
    alert('Error al realizar la reserva.');
  }
};


// Función para obtener las propiedades libres en un rango de fechas
export const fetchAvailablePropertiesInRange = async (startDate, endDate) => {
  try {
    const bookingsRef = collection(db, "bookings");
    const propertiesRef = collection(db, "properties");

    // Obtener todas las reservas que coincidan con el rango de fechas
    const querySnapshot = await getDocs(bookingsRef);

    const bookedPropertyIds = [];
    querySnapshot.forEach(doc => {
      const booking = doc.data();
      const bookingEndDate = new Date(booking.endDate); // O dayjs(booking.endDate).toDate()
      const bookingStartDate = new Date(booking.startDate); // O dayjs(booking.startDate).toDate()


      if (
        (bookingStartDate <= endDate.toDate() && bookingEndDate >= startDate.toDate())
      ) {
        bookedPropertyIds.push(booking.propertyId);
      }
    });

    // Obtener todas las propiedades
    const allPropertiesSnapshot = await getDocs(propertiesRef);
    const allProperties = allPropertiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filtrar las propiedades que no están reservadas
    const availableProperties = allProperties.filter(property => !bookedPropertyIds.includes(property.id));

    console.log(availableProperties);
    return availableProperties;
  } catch (error) {
    console.error('Error fetching available properties in range:', error);
    return [];
  }
};



//======================================== CALENDARIO FILTRADO========================================
//======================================== CALENDARIO FILTRADO========================================
//======================================== CALENDARIO FILTRADO========================================
//======================================== CALENDARIO FILTRADO========================================

// Función para obtener las propiedades filtradas por habitaciones
// export const fetchFilteredProperties = async (numberOfRooms) => {
//   try {
//     const propertiesCollectionRef = collection(db, 'properties');
    
//     const filteredPropertiesQuery = query(propertiesCollectionRef, where('stances.rooms', '==', Number(numberOfRooms)));
//     const querySnapshot = await getDocs(filteredPropertiesQuery);
    
//     const filteredProperties = querySnapshot.docs.map(doc => doc.data());
//     console.log(filteredProperties);

//     return filteredProperties;
//   } catch (error) {
//     console.error('Error fetching filtered properties:', error);
//     return []; // Maneja el error retornando un array vacío u otra respuesta adecuada.
//   }
// };






export const fetchFilteredProperties = async (originalFilters) => {
  try {
    const propertiesCollectionRef = collection(db, 'properties');

    const filters = { ...originalFilters };

    if (filters.startDate && typeof filters.startDate === 'string') {
      filters.startDate = new Date(filters.startDate);
    }
    if (filters.endDate && typeof filters.endDate === 'string') {
      filters.endDate = new Date(filters.endDate);
    }

    let baseQuery = propertiesCollectionRef;

    // Ajustando las rutas de campo según la estructura del documento
    if (filters.numRooms) {
      baseQuery = query(baseQuery, where('stances.rooms', '==', Number(filters.numRooms)));
    }
    if (filters.guest) {
      baseQuery = query(baseQuery, where('stances.guest', '==', Number(filters.guest)));
    }

    const baseSnapshot = await getDocs(baseQuery);
    const baseProperties = baseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (filters.startDate && filters.endDate) {
      return baseProperties.filter(property => {
        if (!property.availableDates) {
            return false;
        }
        const propertyStartDate = new Date(property.availableDates.start);
        const propertyEndDate = new Date(property.availableDates.end);
        return propertyStartDate <= filters.endDate && propertyEndDate >= filters.startDate;
      });
    } else {
      return baseProperties;
    }
  } catch (error) {
    console.error('Error fetching filtered properties:', error);
    return [];
  }
};





export const fetchFilteredGuests = async (numberOfGuests) => {
  try {
    const propertiesCollectionRef = collection(db, 'properties');
    
    const filteredGuests = query(propertiesCollectionRef, where('stances.guest', '==', Number(numberOfGuests)));
    const querySnapshot = await getDocs(filteredGuests);
    
    const filteredPropertiesGuests = querySnapshot.docs.map(doc => doc.data());
    console.log(filteredPropertiesGuests);

    return filteredPropertiesGuests;
  } catch (error) {
    console.error('Error fetching filtered guests:', error);
    return []; // Maneja el error retornando un array vacío u otra respuesta adecuada.
  }
};