const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');



const db = admin.firestore();


router.post('/properties', async (req, res) => {
    try {
    
        const newProperty = {
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            rooms: req.body.rooms,
            technologies: req.body.technologies,
            extraAmenities: req.body.extraAmenities || null,
            specialServices: req.body.specialServices || false,
            views: req.body.views,
            price: req.body.price,
            comment: req.body.comment || null
        };

        // Agregar un ID único para el documento
        const newPropertyId = uuidv4();
        await db.collection('properties').doc(newPropertyId).set(newProperty);

        return res.status(204).json();
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

router.get('/properties', async(req, res)=>{
    try {
        const query = db.collection('properties');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
        
        const response = docs.map(doc=>({
            name:doc.data().name, 
            location:doc.data().location,
            description:doc.data().description,
            rooms:doc.data().rooms,
            technologies:doc.data().technologies,
            views: doc.data().views,
            price: doc.data().price,
         
        }));
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).send(error)
    }
});

router.delete('/properties/:properties_id', async(req, res)=>{
    try {
        const document = db.collection('properties').doc(req.params.properties_id);
        await document.delete();
        return res.status(200).json("La propiedad se ha eliminado correctamente")
    } catch (error) {
        return res.status(500).send(error)
    }
});

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