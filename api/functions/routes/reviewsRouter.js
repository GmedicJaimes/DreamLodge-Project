const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const db = admin.firestore();

////////////////////////////////// CREAR REVIEWS

router.post('/reviews', async (req, res) => {
   

    try {
        const { property_id, author, rating, comment } = req.body;

        if (!property_id || !author || !rating || !comment) {
            return res.status(400).json({ error: 'Todos los campos son requeridos para crear una reseña.' });
        }

        const propertyRef = db.collection('properties').doc(property_id);
        const propertyDoc = await propertyRef.get();

        if (!propertyDoc.exists) {
            return res.status(404).json({ error: 'La propiedad con el ID proporcionado no existe.' });
        }

        const ReviewId = uuidv4();
        const reviewData = { author, rating, comment, ReviewId };

        // Agregar la nueva reseña en la colección "reviews" y referenciar la propiedad
        await db.collection('reviews').doc(ReviewId).set({
            property_id,
            ...reviewData
        });

        // Actualizar el documento de la propiedad para incluir el ID de la reseña
        const propertyData = propertyDoc.data();
        let propertyReviews = propertyData.reviews || [];
        propertyReviews.push(ReviewId);
        await propertyRef.update({ reviews: propertyReviews });

        return res.status(200).json({ message: 'Reseña creada con éxito.', reviewId: ReviewId });
    } catch (error) {
        console.error("Error al crear la reseña:", error);
        return res.status(500).send(`Error al crear la reseña: ${error.message}`);
    }
});






////////////////////////////////// OBTENER REVIEWS

router.get('/reviews', async (req, res) => {
    try {
        const query = db.collection('reviews');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
    
        const response = docs.map(doc=>({
            author: doc.data().author,
            rating: doc.data().rating,
            comment: doc.data().comment,
            id:doc.data().ReviewId,
            propertyId:doc.data().property_id
        }));
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).send('Error logi')
    }
});

////////////////////////////////// OBTENER REVIEW BY ID

router.get('/reviews/:reviews_id', async(req, res) => {
    
    try {
        const doc = db.collection('reviews').doc(req.params.reviews_id);
        const item = await doc.get();
        const response = item.data();

        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).send('No lo encuentro logi');
    }
});



////////////////////////////////// MODIFICAR REVIEW

router.put('/reviews/:reviews_id', async(req, res) => {
   try {
    const doc = db.collection('reviews').doc(req.params.reviews_id);
    await doc.update({
        author: req.body.author,
        rating: req.body.rating,
        comment: req.body.comment,
    })
    return res.status(200).send('La review se actualizó correctamente...logi')

   } catch (error) {
    return res.status(200).send('Error al actualizar')
   }
});





////////////////////////////////// DELETE REVIEW

router.delete('/reviews/:reviews_id', async(req, res)=>{
    try {
        const doc = db.collection('reviews').doc(req.params.reviews_id);
        await doc.delete();
        return res.status(200).json("La review a sido eliminada")
    } catch (error) {
        return res.status(500).send('No se pudo eliminar')
    }
});

module.exports = router;

