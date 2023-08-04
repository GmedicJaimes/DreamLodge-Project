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


// CHRISTIAN PRUEBA -------------------------------------------------
// router.post('/reviews', async (req, res) => {
//     try {
//         const { user_id,property_id, author, rating, comment } = req.body;

//         // Verificar que se proporcionen todos los campos requeridos en el cuerpo de la solicitud
//         if (!property_id || !author || !rating || !comment) {
//             return res.status(400).json({ error: 'Todos los campos son requeridos para crear una reseña.' });
//         }

//         const propertyRef = db.collection('properties').doc(property_id);
//         const userRef = db.collection("users").doc(user_id);


//         // Verificar si la propiedad a la que se está asociando la reseña existe
//         const propertyDoc = await propertyRef.get();
//         if (!propertyDoc.exists) {
//             return res.status(404).json({ error: 'La propiedad con el ID proporcionado no existe.' });
//         }

//         // Crear una nueva reseña en la subcolección "reviews" dentro del documento de la propiedad
//         const newReviewId = uuidv4();


//         // // Agregar un ID único para el documento
//         await userRef.collection("properties").propertyRef.collection('reviews').doc(newReviewId).set({
//             author,
//             rating,
//             comment
//         });

//         return res.status(200).json();
//     } catch (error) {
//         return res.status(500).send('Error al crear la reseña.');
//     }
// });




// router.post('/reviews', async (req, res) => {
//     try {
//         const { user_id, property_id, author, rating, comment } = req.body;

//         // Verificar si todos los campos necesarios están presentes
//         if (!user_id || !property_id || !author || !rating || !comment) {
//             return res.status(400).json({ error: 'Todos los campos son requeridos para crear una reseña.' });
//         }

//         // Obtener la referencia del usuario y verificar su existencia
//         const userRef = await db.collection("users").doc(user_id).get();
//         if (!userRef.exists) {
//             return res.status(400).json({ error: 'User ID no existe.' });
//         }

//         // Obtener la referencia de la propiedad y verificar su existencia
//         const propertyRef = db.collection('properties').doc(property_id);
//         const propertyDoc = await propertyRef.get();
//         if (!propertyDoc.exists) {
//             return res.status(404).json({ error: 'La propiedad con el ID proporcionado no existe.' });
//         }

//         // Verificar si la propiedad está asociada al usuario
//         const propertyDocSnapshot = await userRef.collection("properties").doc(property_id).get();
//         if (!propertyDocSnapshot.exists) {
//             return res.status(404).json({ error: 'La propiedad no está asociada al usuario proporcionado.' });
//         }

//         // Crear una nueva reseña en la subcolección "reviews" dentro del documento de la propiedad
//         const newReviewId = uuidv4();
//         await propertyRef.collection('reviews').doc(newReviewId).set({
//             author,
//             rating,
//             comment
//         });

//         return res.status(200).json();
//     } catch (error) {
//         console.error("Error al crear la reseña:", error);
//         return res.status(500).send('Error al crear la reseña.');
//     }
// });




// CHRISTIAN PRUEBA -------------------------------------------------



router.post('/reviews', async (req, res) => {
    try {
        const { user_id, property_id, author, rating, comment } = req.body;

        if (!user_id || !property_id || !author || !rating || !comment) {
            return res.status(400).json({ error: 'Todos los campos son requeridos para crear una reseña.' });
        }

        const userRef = await db.collection("users").doc(user_id).get();

        if (!userRef.exists) {
            return res.status(400).json({ error: 'user id no existe.' });
        }

        const propertyRef = db.collection('properties').doc(property_id)
        const propertyDoc = await propertyRef.get();
        console.log('HOLAAAAAAAAAAAAAAAAAA',propertyDoc)
        console.log('USERRRRRID',userRef.data())
        console.log('PROPERTYYYID',propertyRef)

        if (!propertyDoc.exists) {
            console.log('HOLAAAAAAAAAAAAAAAAAA',propertyDoc.exists)
            return res.status(404).json({ error: 'La propiedad con el ID proporcionado no existe.' });
        }

        // Supongo que quieres verificar si la propiedad está asociada con el usuario, así que necesitarías acceder a una estructura que la vincule con el usuario
        const propertyDocSnapshot = await userRef.ref.collection("properties").doc(property_id).get();

        if (!propertyDocSnapshot.exists) {
            return res.status(404).json({ error: 'La propiedad no está asociada al usuario proporcionado.' });
        }

        const newReviewId = uuidv4();
        const reviewData = { author, rating, comment };

        // Agregar la nueva reseña en la subcolección "reviews" dentro del documento de la propiedad
        await propertyRef.collection('reviews').doc(newReviewId).set({
            property_id,
            ...reviewData
        });

        return res.status(200).json({ message: 'Reseña creada con éxito.' });
    } catch (error) {
        console.error("Error al crear la reseña:", error);
        return res.status(500).send(`Error al crear la reseña: ${error.message}`);
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

