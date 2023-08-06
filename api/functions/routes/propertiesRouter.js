const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const os = require('os');
const path = require('path');
const fs = require('fs');
const { uploadImageToStorage } = require('../controllers/uploadImage');
const { getImageURLFromStorage } = require('../controllers/getImage');

// ruta para RESPONDER TODAS LAS PROPIEDADES(incluida la img)
// router.get('/properties', async (req, res) => {
//     try {
//         const { rooms, location, guests, types} = req.query;

//         let query = db.collectionGroup('properties');

//         if (rooms) {
//             const roomsNumber = parseInt(rooms);
//             if (isNaN(roomsNumber)) {
//                 return res.status(400).json({ error: 'El valor de "rooms" debe ser un número válido.' });
//             }
//             query = query.where('rooms', '==', roomsNumber);
//         }

//         if (location) {
//             query = query.where('location', '==', location);
//         };
//         if (guests) {
//             const guestsNumber = parseInt(guests);
//             if (isNaN(guestsNumber)) {
//                 return res.status(400).json({ error: 'El valor de "guests" debe ser un número válido.' });
//             }
//             query = query.where('guests', '==', guestsNumber);
//         }

//         if (types) {
//             if (!Array.isArray(types)) {
//                 return res.status(400).json({ error: 'El valor de "type" debe ser un array.' });
//             }
//             query = query.where('type', 'array-contains-any', types);
//         }

//         const querySnapshot = await query.get();

//         if (querySnapshot.empty) {
//             return res.status(404).json({ message: 'No se encontraron propiedades que coincidan con los filtros especificados.' });
//         } 

//         const response = [];
//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             response.push(data);
//         });

const db = admin.firestore();

router.get('/properties', async (req, res) => {
    try {
        const { rooms, state, guests, types} = req.query;

        let query = db.collectionGroup('properties');

        if (rooms) {
            const roomsNumber = parseInt(rooms);
            if (isNaN(roomsNumber)) {
                return res.status(400).json({ error: 'El valor de "rooms" debe ser un número válido.' });
            }
            query = query.where('rooms', '==', roomsNumber);
        }

        if (state) {
            query = query.where('location.state', '==', state);
        };
        if (types) {
            if (!Array.isArray(types)) {
                return res.status(400).json({ error: 'El valor de "types" debe ser un array.' });
            }
            query = query.where('types', 'array-contains-any', types);
        }

        const querySnapshot = await query.get();

        if (querySnapshot.empty) {
            return res.status(404).json({ message: 'No se encontraron propiedades que coincidan con los filtros especificados.' });
        }

        const response = [];
        for (const doc of querySnapshot.docs) {
            const data = doc.data();

            // Obtener la URL de la imagen asociada a la propiedad desde el Storage
            const imageURL = await getImageURLFromStorage(data.image);
            data.image = imageURL;

            response.push(data);
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
});
// ============================================================
// 00000000000000000000000000000000000000000000000000000000000
// ============================================================
//ruta para BUSCAR PROPIEDAD
// ============================================================
// 00000000000000000000000000000000000000000000000000000000000
// ===========================================================
// router.get('/properties/:property_id', async (req, res) => {
//     try {
//         const { property_id } = req.params;

//         const propertyRef = db.collection('properties').doc(property_id);
//         const propertyDoc = await propertyRef.get();

//         if (!propertyDoc.exists) {
//             return res.status(404).json({ message: 'Propiedad no encontrada' });
//         }

//         let propertyData = propertyDoc.data();


//             propertyData = { ...propertyData, reviews }; // Agregar las reseñas a los datos de la propiedad
//         }

//         return res.status(200).json(propertyData);
//     } catch (error) {
//         return res.status(500).send(error);
//     }
// });
router.get('/properties/:property_id', async (req, res) => {
    try {
        const { property_id } = req.params;

        const propertyRef = db.collection('properties').doc(property_id);
        const propertyDoc = await propertyRef.get();

        if (!propertyDoc.exists) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        let propertyData = propertyDoc.data();

        // si la propiedad tiene un atributo image
        if (propertyData.image) {
            // obtenemos la url
            const imageURL = propertyData.image;

            // Ah toda la informacion que nos llega de la propiedad, le agregamos un atributo image con la url para responder a la peticion
            propertyData = { ...propertyData, image: imageURL };
        }

        //hacemos la misma validacion para las
        if (propertyData.reviews && propertyData.reviews.length > 0) {
            let reviews = [];
            for (const reviewId of propertyData.reviews) {
                const reviewDoc = await db.collection('reviews').doc(reviewId).get();
                if (reviewDoc.exists) {
                    reviews.push(reviewDoc.data());
                }
            }

            propertyData = { ...propertyData, reviews }; // Agregar las reseñas a los datos de la propiedad
        }

        return res.status(200).json(propertyData);
    } catch (error) {
        return res.status(500).send(error);
    }
});
// ============================================================
// 00000000000000000000000000000000000000000000000000000000000
// ============================================================
//ruta para CREAR propiedades
// router.post('/properties', async (req, res) => {

// // Ruta para obtener propiedades, filtradas por rooms si se proporciona el parámetro
// router.get('/properties', async (req, res) => {
//     try {
//         const { rooms, location, guests, types } = req.query;
       
//         if (rooms) {
//             const roomsNumber = parseInt(rooms);
//             if (isNaN(roomsNumber)) {
//                 return res.status(400).json({ error: 'El valor de "rooms" debe ser un número válido.' });
//             }

//             const roomsQuerySnapshot = await db.collection('properties').where("rooms", "==", roomsNumber).get();

//             if (roomsQuerySnapshot.empty) {
//                 return res.status(404).json({ message: 'No se encontraron propiedades con el número de habitaciones especificado.' });
//             }

//             const response = [];
//             roomsQuerySnapshot.forEach((doc) => {
//                 const data = doc.data();
//                 response.push(data);
//             });

//             return res.status(200).json(response);
//         } else {
//             // Si no se proporciona el parámetro 'rooms', se obtienen todas las propiedades
//             const querySnapshot = await db.collection('properties').get();
//             const docs = querySnapshot.docs;

//             const response = docs.map((doc) => ({
//                 name: doc.data().name,
//                 location: doc.data().location,
//                 description: doc.data().description,
//                 rooms: doc.data().rooms,
//                 technologies: doc.data().technologies,
//                 views: doc.data().views,
//                 price: doc.data().price,
//             }));
//             return res.status(200).json(response);
//         }
//     } catch (error) {
//         return res.status(500).send(error);
//     }
// });




//ruta para crear propiedades


router.post('/properties', async (req, res) => {
    try {
      // Extraer datos del cuerpo de la solicitud (request body)
      const { user_id, name, types, location, rooms, services, description, price } = req.body;
  
      // Obtener el archivo de imagen enviado desde el cliente
      const imageFile = req.file; // El front-end debe enviar el archivo como 'file'
  
      // Validar si se proporcionó una imagen
      if (!imageFile) {
        return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
      }
  
      // Subir la imagen a Firebase Storage y obtener su URL
      const imageURL = await uploadImageToStorage(imageFile);
  
      // Generar un nuevo ID para la propiedad
      const PropertyId = uuidv4();
  
      // Crear un objeto con los datos de la nueva propiedad
      const newProperty = {
        id: PropertyId, // Propiedad id
        user_id, 
        name, 
        types, 
        location, 
        rooms, 
        services, 
        description, 
        price,
        image: imageURL // Agrega la URL de la imagen a la propiedad
      };
  
      // Resto de la lógica para crear la propiedad y guardarla en Firestore ...
  
      // Obtener una referencia al documento del usuario
      const userRef = db.collection("users").doc(user_id);
  
      // Verificar si el usuario existe
      const doc = await userRef.get();
      if (!doc.exists) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Crear la propiedad en una nueva colección 'properties' en Firestore
      await db.collection('properties').doc(PropertyId).set(newProperty);
  
      // Actualizar el documento del usuario para incluir la nueva propiedad
      const userDoc = await userRef.get();
      let userProperties = userDoc.data().properties || [];
      userProperties.push(newProperty);
      await userRef.update({ properties: userProperties });
  
      // Responder con el objeto de la nueva propiedad creada
      return res.status(201).json(newProperty);
    } catch (error) {
      // Manejar cualquier error que ocurra durante el proceso de creación de la propiedad
      console.log(error);
      return res.status(500).json({ message: "Error al postear propiedad" });
    }
  })





//-------------------------------------- PRUEBA CHRISTIAN
//ruta para borrar propiedades
router.delete('/properties/:properties_id', async(req, res)=>{
    try {
        const document = db.collection('properties').doc(req.params.properties_id);
        await document.delete();
        return res.status(200).json("La propiedad se ha eliminado correctamente")
    } catch (error) {
        return res.status(500).send(error)
    }
});

//ruta para actualizar propiedades
router.put('/properties/:properties_id', async(req, res)=>{
    try {
        const document = db.collection('properties').doc(req.params.properties_id);

        const {
            name,
            types,
            location,
            rooms,
            services,
            image,
            description,
            price
        } = req.body;

        // Validar que se proporcionen al menos algunos campos para actualizar
        if (!name && !types && !location && !rooms && !services && !image && !description && !price) {
            return res.status(400).json({ error: "No se proporcionaron campos para actualizar" });
        }

        const updates = {};

        if (name) updates.name = name;
        if (types) updates.types = types;
        if (location) updates.location = location;
        if (rooms) updates.rooms = rooms;
        if (services) updates.services = services;
        if (image) updates.image = image;
        if (description) updates.description = description;
        if (price) updates.price = price;
        updates.lastUpdated = new Date().toLocaleDateString();

        await document.update(updates);

        // Obtener los datos actualizados de la propiedad después de la actualización
        const snapshot = await document.get();
        if (!snapshot.exists) {
            return res.status(404).json({ error: "Propiedad no encontrada" });
        }
        const updatedProperty = snapshot.data();

        return res.status(200).json(updatedProperty);
    } catch (error) {
        return res.status(500).send(error);
    }
});
// ===============================================================
module.exports= router;


