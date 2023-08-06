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

//         return res.status(200).json(response);
//     } catch (error) {
//         return res.status(500).send(error);
//     }
    
// });
router.get('/properties', async (req, res) => {
    try {
        const { rooms, location, guests, types } = req.query;

        let query = db.collectionGroup('properties');

        if (rooms) {
            const roomsNumber = parseInt(rooms);
            if (isNaN(roomsNumber)) {
                return res.status(400).json({ error: 'El valor de "rooms" debe ser un número válido.' });
            }
            query = query.where('rooms', '==', roomsNumber);
        }

        if (location) {
            query = query.where('location', '==', location);
        }
        if (guests) {
            const guestsNumber = parseInt(guests);
            if (isNaN(guestsNumber)) {
                return res.status(400).json({ error: 'El valor de "guests" debe ser un número válido.' });
            }
            query = query.where('guests', '==', guestsNumber);
        }

        if (types) {
            if (!Array.isArray(types)) {
                return res.status(400).json({ error: 'El valor de "type" debe ser un array.' });
            }
            query = query.where('type', 'array-contains-any', types);
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

//         if (propertyData.reviews && propertyData.reviews.length > 0) {
//             let reviews = [];
//             for (const reviewId of propertyData.reviews) {
//                 const reviewDoc = await db.collection('reviews').doc(reviewId).get();
//                 if (reviewDoc.exists) {
//                     reviews.push(reviewDoc.data());
//                 }
//             }

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

//     try {
//         const { user_id, name, types, location, rooms, services, image, description, price } = req.body;

//         const PropertyId = uuidv4();

//         const newProperty = {
//             id: PropertyId, // Propiedad id
//             user_id, 
//             name, 
//             types, 
//             location, 
//             rooms, 
//             services, 
//             image, 
//             description, 
//             price
//         };

//         const userRef = db.collection("users").doc(user_id);

//         const doc = await userRef.get();
//         if (!doc.exists) {
//             return res.status(404).json({ message: "Usuario no encontrado" });
//         }

//         // Crear la propiedad en una nueva colección 'properties'
//         await db.collection('properties').doc(PropertyId).set(newProperty);

//         // Actualizar el documento del usuario para incluir la propiedad completa
//         const userDoc = await userRef.get();
//         let userProperties = userDoc.data().properties || [];
//         userProperties.push(newProperty);
//         await userRef.update({ properties: userProperties });

//         return res.status(201).json(newProperty);
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Error al postear propiedad" });
//     }
// });
router.post('/properties', async (req, res) => {
    try {
        const { user_id, name, types, location, rooms, services, description, price } = req.body;
        const imageFile = req.file; // el front si o si debe enviar por file

        // validamos que si o si exista la foto


        if (!imageFile) {
            return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
        }

        const imageURL = await uploadImageToStorage(imageFile)

        // 
        const PropertyId = uuidv4();

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

        // ... Resto de la lógica para crear la propiedad y guardarla en Firestore ...

        const userRef = db.collection("users").doc(user_id);

        const doc = await userRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Crear la propiedad en una nueva colección 'properties'
        await db.collection('properties').doc(PropertyId).set(newProperty);

        // Actualizar el documento del usuario para incluir la propiedad completa
        const userDoc = await userRef.get();
        let userProperties = userDoc.data().properties || [];
        userProperties.push(newProperty);
        await userRef.update({ properties: userProperties });

        return res.status(201).json(newProperty);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al postear propiedad" });
    }
});
// ============================================================
// 00000000000000000000000000000000000000000000000000000000000
// ============================================================
// ruta para BORRAR propiedades
router.delete('/properties/:properties_id', async(req, res)=>{
    try {
        const document = db.collection('properties').doc(req.params.properties_id);
        await document.delete();
        return res.status(200).json("La propiedad se ha eliminado correctamente")
    } catch (error) {
        return res.status(500).send(error)
    }
});
// ============================================================
// 00000000000000000000000000000000000000000000000000000000000
// ============================================================
//ruta para ACTUALIZAR PROPIEDAD
router.put('/properties/:properties_id', async(req, res)=>{
    try {
        const document = db.collection('properties').doc(req.params.properties_id);
        await document.update({
            name: req.body.name,
            types: req.body.types, 
            location: [{
                country: req.body.location.country,
                estado: req.body.location.estado,
                direction: req.body.location.direction,
            }],
            rooms:[{
                guests: req.body.rooms.guests,
                dormitorio: req.body.rooms.dormitorio,
                bathrooms: req.body.rooms.bathrooms,
                bed: req.body.rooms.bed
            }],
            services: req.body.services, 
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
        });
        return res.status(200).json("se ha actualizado correctamente la propiedad")
    } catch (error) {
        return res.status(500).send(error)
    }
});
// ===============================================================
module.exports= router;


