import {getDocs,Timestamp , collection, addDoc, updateDoc, doc,getDoc,setDoc,getFirestore,where,query} from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';
import {createUserWithEmailAndPassword, sendPasswordResetEmail,getAuth, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { storage, db, auth, googleProvider } from './firebase';
import axios from 'axios';
import { serverTimestamp } from 'firebase/firestore';


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

      await sendPasswordResetEmail(auth, user.email, {
        url: "http://localhost:5173/",
        handleCodeInApp: true
    });
    await sendPasswordResetEmail(user);


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

export const getPropertiesList = async () => {
  try {
    const data = await getDocs(propertiesCollectionRef);
    
    // Mapea los documentos a sus datos y procesa la URL de la imagen si existe
    const properties = await Promise.all(data.docs.map(async (doc) => {
      const propertyData = doc.data();
      
      if (propertyData.imageUrl) {
        const imageUrlRef = ref(storage, propertyData.imageUrl); // Corregir referencia a storage
        propertyData.imageUrl = await getDownloadURL(imageUrlRef);
      }
      
      return {
        ...propertyData,
        id: doc.id
      };
    }));

    return properties; // Devuelve la lista de propiedades procesadas
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error nuevamente para manejarlo donde se llama la función
  }
};

// handlers.js
// export const getPropertiesListPerPage = async (page, perPage) => {
//   try {
//     const data = await getDocs(propertiesCollectionRef);
//     const startIndex = (page - 1) * perPage;
//     const endIndex = startIndex + perPage;

//     const filterData = await Promise.all(
//       data.docs.slice(startIndex, endIndex).map(async (doc) => {
//         const propertyData = doc.data();
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

//     return filterData;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };


//* funcion para RENDERIZAR EL DETAIL DE UNA PROPIEDAD
export const detailId = async (id) =>{
  try {
    const refProperty = doc(db, 'properties' , id) 
   const propertySnapshot = await getDoc(refProperty);

   
    if(propertySnapshot.exists()){
      
      return propertySnapshot.data();
    } else {
      console.log( 'no existe nada de info') 
    }
  } catch (error) {
    console.log(error)
  }
}



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

//funcion para FILTRAR POR TYPE.......................................................
// export const getPropertiesByType = async (type) => {
//   try {
//     const propertiesQuery = query(propertiesCollectionRef, where('type', 'array-contains-any', [type]));
//     const propertiesQuerySnapshot = await getDocs(propertiesQuery);

//     const filteredProperties = propertiesQuerySnapshot.docs.map((doc) => {
//       const propertyData = doc.data();
//       return {
//         ...propertyData,
//         id: doc.id
//       };
//     });

//     return filteredProperties;
//   } catch (error) {
//     console.log(error);
//     return []; // Maneja el error de manera adecuada retornando un array vacío u otra respuesta que consideres.
//   }
// };

export const getPropertiesByMultipleTypes = async (types) => {
  try {
    const propertiesQuerySnapshot = await getDocs(propertiesCollectionRef);

    const filteredProperties = propertiesQuerySnapshot.docs
      .filter((doc) => types.some(type => doc.data().type.includes(type)))
      .map((doc) => {
        const propertyData = doc.data();
        return {
          ...propertyData,
          id: doc.id
        };
      });

    return filteredProperties;
  } catch (error) {
    console.log(error);
    return [];
  }
};





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

//FUNCIONES PARA FILTROS STATE Y CITY........................................................
export const filterPropertiesByState = async (state) => {
  try {
    const propertiesQuery = query(propertiesCollectionRef, where('location.state', '==', state));
    console.log(propertiesQuery); // Convierte a cadena antes de imprimir
    const propertiesQuerySnapshot = await getDocs(propertiesQuery);

    const filteredProperties = propertiesQuerySnapshot.docs.map((doc) => {
      const propertyData = doc.data();
      return {
        ...propertyData,
        id: doc.id
      };
    });

    console.log(filteredProperties)
    return filteredProperties;
  } catch (error) {
    console.error('Error fetching properties by state:', error);
    return [];
  }
};

export const filterByStateAndCity = async (state, city) => {
  try {
    let propertiesQuery = query(propertiesCollectionRef);

    if (state && city) {
      propertiesQuery = query(propertiesQuery, where('location.state', '==', state), where('location.city', '==', city));
    } else if (state) {
      propertiesQuery = query(propertiesQuery, where('location.state', '==', state));
    }

    console.log(city); 
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
    console.error('Error fetching properties by state and city:', error);
    return [];
  }
  }
//======================================== BOOKING SECTION ========================================
//======================================== BOOKING SECTION ========================================
//======================================== BOOKING SECTION ========================================
//======================================== BOOKING SECTION ========================================


// Función para verificar si una propiedad está disponible en las fechas seleccionadas
export const isPropertyAvailable = async (propertyId, startDate, endDate) => {
  try {
    const bookingsRef = collection(db, "bookings");

    // Convertir las fechas a objetos Date nativos
    const formattedStartDate = Timestamp.fromDate(new Date(startDate));
    const formattedEndDate = Timestamp.fromDate(new Date(endDate));
    // Consulta para buscar reservas que empiezan dentro del rango de fechas proporcionado
    const startWithinQuery = query(
      bookingsRef,
      where("propertyId", "==", propertyId),
      where("startDate", ">=", formattedStartDate),
      where("startDate", "<=", formattedEndDate)
    );

    // Consulta para buscar reservas que terminan dentro del rango de fechas proporcionado
    const endWithinQuery = query(
      bookingsRef,
      where("propertyId", "==", propertyId),
      where("endDate", ">=", formattedStartDate),
      where("endDate", "<=", formattedEndDate)
    );

    // Ejecutar ambas consultas
    const startWithinSnapshot = await getDocs(startWithinQuery);
    const endWithinSnapshot = await getDocs(endWithinQuery);

    // Si hay alguna reserva que comienza o termina dentro del rango de fechas, la propiedad no está disponible
    console.log(startWithinSnapshot.docs)
console.log(endWithinSnapshot.docs)

    return startWithinSnapshot.size === 0 && endWithinSnapshot.size === 0;

  } catch (error) {
    console.error('Error checking property availability:', error);
    return false;
  }
};


export const getBookedDatesForProperty = async (propertyId) => {
  try {
    const reservationsCollection = collection(db, "bookings");
    const reservationsQuery = query(
      reservationsCollection,
      where("propertyId", "==", propertyId)
    );
    const reservationsSnapshot = await getDocs(reservationsQuery);

    const bookedDates = reservationsSnapshot.docs.map((doc) => {
      const data = doc.data();
      
      // Verificamos que startDate y endDate existen y tienen el método toDate
      if (data.startDate?.toDate && data.endDate?.toDate) {
        return {
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate(),
        };
      } else {
        // Si no, logueamos el documento que tiene problemas
        console.warn("Documento con datos faltantes o incorrectos:", doc.id, data);
        return null; // Este valor se filtrará en el siguiente paso
      }
    }).filter(date => date);  // Filtramos valores nulos

   

    return bookedDates;

  } catch (error) {
    console.error("Error obteniendo las fechas reservadas:", error);
    return [];
  }
};




export const createBooking = async (propertyId, startDate, endDate) => {
  try {
    // Verificamos la disponibilidad primero

const bookingsCollectionRef = collection(db, "bookings"); // Adjust the path as needed

    if (await isPropertyAvailable(propertyId, startDate, endDate)) {

      // Convertir las fechas a Timestamp antes de guardarlas
      const startDateTimestamp = Timestamp.fromDate(new Date(startDate));
      const endDateTimestamp = Timestamp.fromDate(new Date(endDate));

      await addDoc(bookingsCollectionRef, {
        propertyId: propertyId,
        startDate: startDateTimestamp,
        endDate: endDateTimestamp,
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

//======================================== BOOKING SECTION ========================================
//======================================== BOOKING SECTION ========================================
//======================================== BOOKING SECTION ========================================
//======================================== BOOKING SECTION ========================================

//funcion para deshabilitar propiedades
export const updateAvaible = async(id) => {
  try {
    const db = getFirestore()
    const propertyDB = doc(db, 'properties', id);
    await updateDoc(propertyDB, {
      available: false 
    });
  } catch (error) {
    console.log(error);
  }
};
//confirmar si el pago fue exitoso (yes, I refuse to use traditional backend)
export const getPaymentStatus = async (preferenceId) => {
  try {
    // con esta solicitud pedimos informacion sobre el pago a don mercado
    const response = await axios.get(`https://api.mercadopago.com/v1/payments/search`, {
      params: {
        external_reference: preferenceId //pasamos el id de la peticion de pago que obtuvimos en el componente
      },
      headers: {
        Authorization: `Bearer TEST-1217239966605378-080822-11c74257002c2927c70422faaaaf3e94-1446217996` //esto hay que mandarlo a un .env
      }
    });

    //si la respuesta de eso es mayor a cero, el pago se realizo
    if (response.data.results.length > 0) {
    
      return response.data.results[0].status; //puede retornar 'approved', 'pending' o 'rejected'
    } else {
      //si no hay datos, el pago aun no se realizo y vamos a devolver pending
      return 'pending'; 
    }
  } catch (error) {
    console.error('Error payment status:', error);
    return 'error'; 
  }
};

export const registerPurchases = async (userId, propertyId) => {
  try {
    // Referencia a la colección "purchases"
    const purchasesCollectionRef = collection(db, 'purchases');

    // Agregar un nuevo documento con la información de la compra
    await addDoc(purchasesCollectionRef, {
      userId: userId,
      propertyId: propertyId,
      purchaseDate: serverTimestamp(), // Marca de tiempo del servidor
    });

    console.log('Compra registrada exitosamente');
  } catch (error) {
    console.error('Error al registrar la compra:', error);
  }}

  
// Función para obtener las propiedades libres en un rango de fechas
export const fetchAvailablePropertiesInRange = async (startDate, endDate) => {
  try {
    const startJSDate = startDate.$d;
    const endJSDate = endDate.$d;

    console.log('Selected Range:', startJSDate, endJSDate);

    const bookingsRef = collection(db, "bookings");

    // Consulta para reservas que comienzan antes de que termine el rango seleccionado
    const startBeforeEndQuery = query(bookingsRef, where("startDate", "<=", endJSDate));
    const startBeforeEndSnapshot = await getDocs(startBeforeEndQuery);

    // Consulta para reservas que terminan después de que comienza el rango seleccionado
    const endAfterStartQuery = query(bookingsRef, where("endDate", ">=", startJSDate));
    const endAfterStartSnapshot = await getDocs(endAfterStartQuery);

    // Intersección: encuentre reservas que se superpongan con el rango seleccionado
    const overlappingBookings = startBeforeEndSnapshot.docs.filter(doc =>
      endAfterStartSnapshot.docs.some(endDoc => endDoc.id === doc.id)
    );

    const bookedPropertyIds = overlappingBookings.map(doc => doc.data().propertyId);

    console.log('Booked Property IDs:', bookedPropertyIds);

    const propertiesRef = collection(db, "properties");
    const allPropertiesSnapshot = await getDocs(propertiesRef);

    const allProperties = allPropertiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const availableProperties = allProperties.filter(property => 
      !bookedPropertyIds.includes(property.id)
    );

    console.log('Available Properties:', availableProperties);
    
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




export const getAllBookings = async () => {
  const bookingsCollectionRef = collection(db, "bookings");
  const querySnapshot = await getDocs(bookingsCollectionRef);
  const bookings = querySnapshot.docs.map(doc => doc.data());
  return bookings;
};




export const fetchFilteredProperties = async (filters) => {
  try {
    const propertiesCollectionRef = collection(db, 'properties');
    
    let baseQuery = propertiesCollectionRef;

    if (filters.rooms) {
      baseQuery = query(baseQuery, where('stances.rooms', '==', Number(filters.rooms)));
    }

    if (filters.guest) {
      baseQuery = query(baseQuery, where('stances.guest', '==', Number(filters.guest)));
    }

    const querySnapshot = await getDocs(baseQuery);
    const filteredProperties = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(filteredProperties)
    return filteredProperties;
  } catch (error) {
    console.error('Error fetching filtered properties:', error);
    return []; // Maneja el error retornando un array vacío u otra respuesta adecuada.
  }
}

