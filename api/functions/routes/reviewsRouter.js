const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const db = admin.firestore();

router.post('/reviews', async (req, res) => {
    try {
        const newReview = {
            author: req.body.author,
            rating: req.body.rating,
            comment: req.body.comment,

        };

        const newReviewId = uuidv4();
        await db.collection('reviews').doc(newReviewId).set(newReview);

        return res.status(200).json()        
    } catch (error) {
        return res.status(500).send('Erorr');
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