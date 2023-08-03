const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const db = admin.firestore();

// router.post('/reviews', async (req, res) => {
//     try {
//         const { property_id } = req.body;

//         const newReview = {
//             author: req.body.author,
//             rating: req.body.rating,
//             comment: req.body.comment,

//         };

//         const propertyRef = db.collection('properties').doc(property_id);

//         const propertyDoc = await propertyRef.get();
       
//         const newReviewId = uuidv4();
//         // await db.collection('reviews').doc(newReviewId).set(newReview);

//         const reviewsCollectionRef = propertyRef.collection('reviews').doc(newReviewId);
//         await reviewsCollectionRef.add({author, rating, comment})
//     //    

//         return res.status(200).json()        
//     } catch (error) {
//         return res.status(500).send('Erorr');
//     }
// });

router.post('/reviews', async (req, res) => {
    try {
        const { property_id, author, rating, comment } = req.body;

        // Verificar que se proporcionen todos los campos requeridos en el cuerpo de la solicitud
        if (!property_id || !author || !rating || !comment) {
            return res.status(400).json({ error: 'Todos los campos son requeridos para crear una reseña.' });
        }

        const propertyRef = db.collection('properties').doc(property_id);

        // Verificar si la propiedad a la que se está asociando la reseña existe
        const propertyDoc = await propertyRef.get();
        if (!propertyDoc.exists) {
            return res.status(404).json({ error: 'La propiedad con el ID proporcionado no existe.' });
        }

        // Crear una nueva reseña en la subcolección "reviews" dentro del documento de la propiedad
        const newReviewId = uuidv4();
        await propertyRef.collection('reviews').doc(newReviewId).set({
            author,
            rating,
            comment
        });

        return res.status(200).json();
    } catch (error) {
        return res.status(500).send('Error al crear la reseña.');
    }
});

router.get('/reviews', async (req, res) => {
    try {
        const query = db.collection('reviews');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
    
        const response = docs.map(doc=>({
            author: doc.data().author,
            rating: doc.data().rating,
            comment: doc.data().comment,
        }));
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).send('Error logi')
    }
});

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

