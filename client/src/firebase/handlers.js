import { useState } from 'react';
import {getDocs, collection, addDoc, updateDoc, doc} from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { storage, db, auth, googleProvider } from './firebase';

//VARIABLES CON INFORMACION DE RUTAS/REFERENCIAS DE FIREBASE:
const propertiesCollectionRef= collection(db, "properties"); 
const imageUrlRef = ref(storage, 'properties/')

// ESTADOS LOCALES PARA MANEJAR LA INFO DE LAS FUNCIONES
const [email, setEmail] = useState("")
const [password, setPassword] = useState("");
const [propertiesList, setPropertiesList] = useState([]);
const [newPropName, setNewPropName] = useState("");
const [newPropRooms, setNewPropRooms] = useState(0);
const [newPropDisponible, setNewPropDisponible] = useState(false); 
const [newPropType, setNewPropType] = useState([]);
const [updateNameProp, setUpdateNameProp] = useState("");
const [file, setFile] = useState(null);
const [image, setImage] = useState([]);

// funcion para SIGNIN normal
const signIn = async()=>{
    try {
        await createUserWithEmailAndPassword(auth, email, password);      
    } catch (error) {
        console.log(error)
    }
};
// funcion para SIGNIN CON GOOGLE
const signInGoogle = async()=>{
    try {
        await signInWithPopup(auth, googleProvider)
    } catch (error) {
        console.log(error)
    }
};
// funcion para LOGOUT
const logOut = async()=>{
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error)
    }
};
// funcion para POSTEAR PROPIEDADES
const onSubmitProp = async () => {
    try {
      // subimos la imagen al storage y obtenemos su url
      if (file) {
        const folderRef = ref(storage, `properties/${file.name + v4()}`);
        await uploadBytes(folderRef, file);
        const imageUrl = await getDownloadURL(folderRef);

        // creamos la propiedad y le agregamos la propiedad imageUrl
        await addDoc(propertiesCollectionRef, {
          name: newPropName,
          rooms: newPropRooms,
          disponible: newPropDisponible,
          location: newPropType,
          userId: auth?.currentUser?.uid,
          imageUrl: imageUrl // <====|| ACA TA LA URL
        });
      } else {
        // por ahora, si no hay img se crea igual, pero podriamos agregarle una por defecto
        await addDoc(propertiesCollectionRef, {
          name: newPropName,
          rooms: newPropRooms,
          disponible: newPropDisponible,
          location: newPropType,
          userId: auth?.currentUser?.uid,
        });
      }

      // se limpia el estado 
      setNewPropName("");
      setNewPropRooms(0);
      setNewPropDisponible(false);
      setNewPropType([]);
      setFile(null);

      alert('Ahora si papu, alta app nos hicimos');
    } catch (error) {
      console.log(error)
    }
  };
//funcion para ACTUALIZAR PROPIEDADES
const updateProperty = async(id)=>{
    try {
        const property = doc(db, 'properties', id);
          await updateDoc(property, {name: updateNameProp})
    } catch (error) {
        console.log(error)
    }
};
//funcion para TRAER LAS PROPIEDADES, INCLUSIVE LAS IMAGENES (SI TIENEN)
const getPropertiesList = async () => {
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

//funcion para CARGAR ARCHIVOS (SIN IDENTIFICAR)
const uploadFile = async()=>{
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
listAll(imageUrlRef).then((response) => {
    const urls = [];
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        urls.push(url);
        setImage(urls); 
      })
    })
  })