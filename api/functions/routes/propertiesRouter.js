const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const db = admin.firestore();

router.get('/properties', async (req, res) => {
    try {
        const { rooms, location, guests, types} = req.query;

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
        };
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
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            response.push(data);
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
});

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
    console.log(`HOLAAAAAAAAAAAAAAAAAAAAAAAAAA`, req.body);
    try {
        const {user_id} = req.body;

        const newProperty = {
            name: req.body.name,
            types: req.body.types, // ['casa playa', 'mansion', 'casa montania', 'casa grande']
            location: {
                country: req.body.location.country,
                estado: req.body.location.estado,
                direction: req.body.location.direction,
            },
            rooms:{
                guests: req.body.rooms.guests,
                dormitorio: req.body.rooms.dormitorio,
                bathrooms: req.body.rooms.bathrooms,
                bed: req.body.rooms.bed
            },
            services: req.body.services, // ['wifi', 'tv', 'kitchen', 'aire acondicionado']
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
        };
        const userRef = db.collection("users").doc(user_id);

        // Agregar un ID único para el documento
        const newPropertyId = uuidv4();
        await userRef.collection('properties').doc(newPropertyId).set(newProperty);

        return res.status(204).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});



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
        await document.update({
            name: req.body.name,
            types: req.body.types, 
            location: {
                country: req.body.location.country,
                estado: req.body.location.estado,
                direction: req.body.location.direction,
            },
            rooms:{
                guests: req.body.rooms.guests,
                dormitorio: req.body.rooms.dormitorio,
                bathrooms: req.body.rooms.bathrooms,
                bed: req.body.rooms.bed
            },
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

module.exports= router;


