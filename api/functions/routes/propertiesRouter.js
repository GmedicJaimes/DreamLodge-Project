const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');


//hola
const db = admin.firestore();
router.get('/properties', async (req, res) => {
    try {
        const { rooms, location, guests} = req.query;

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

router.get('/properties/:property_id', async(req, res)=>{
    try {
        const doc =  db.collection('properties').doc(req.params.property_id);
        const item = await doc.get();
        const response = item.data()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).send(error)
    }
});

//ruta para crear propiedades
router.post('/properties', async (req, res) => {
    try {
        const {user_id} = req.body;

        const newProperty = {
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            rooms: req.body.rooms,
            guests:req.body.guests,
            technologies: req.body.technologies,
            extraAmenities: req.body.extraAmenities || null,
            specialServices: req.body.specialServices || false,
            views: req.body.views,
            price: req.body.price,
            comment: req.body.comment || null,
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
            location: req.body.location,
            description: req.body.description,
            rooms: req.body.rooms,
            technologies: req.body.technologies,
            views: req.body.views,
            price: req.body.price,
        });
        return res.status(200).json("se ha actualizado correctamente la propiedad")
    } catch (error) {
        return res.status(500).send(error)
    }
});

module.exports= router;


