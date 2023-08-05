const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const db = admin.firestore();




////////////////////////////////// OBTENER PROPERTIES / FILTRADO

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



////////////////////////////////// OBTENER PROPERTY BY ID


router.get('/properties/:property_id', async (req, res) => {
    try {
        const { property_id } = req.params;

        const propertyRef = db.collection('properties').doc(property_id);
        const propertyDoc = await propertyRef.get();

        if (!propertyDoc.exists) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        let propertyData = propertyDoc.data();

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




////////////////////////////////// CREATE PROPERTIES

router.post('/properties', async (req, res) => {

    try {
        const { user_id, name, types, location, rooms, services, image, description, price } = req.body;

        const PropertyId = uuidv4();

        const newProperty = {
            id: PropertyId, // Propiedad id
            user_id, 
            name, 
            types, 
            location, 
            rooms, 
            services, 
            image, 
            description, 
            price
        };

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
        console.log(error)
        return res.status(500).json({ message: "Error al postear propiedad" });
    }
});

////////////////////////////////// DELETE PROPERTIES

router.delete('/properties/:properties_id', async(req, res)=>{
    try {
        const document = db.collection('properties').doc(req.params.properties_id);
        await document.delete();
        return res.status(200).json("La propiedad se ha eliminado correctamente")
    } catch (error) {
        return res.status(500).send(error)
    }
});


////////////////////////////////// MODIFICAR RUTAS

router.put('/properties/:properties_id', async (req, res) => {
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

module.exports= router;


