const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');



const db = admin.firestore();

router.get('/users', async(req, res)=>{
    try {
        const query = db.collection('users');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
        
        const response = docs.map(doc=>({
            firstName:doc.data().firstName, 
            lastName:doc.data().lastName,
            username:doc.data().username,
            email:doc.data().email,
            password:doc.data().password,
            createdAt: doc.data().createdAt
         
        }));
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).send(error)
    }
});


router.post('/users', async (req, res) => {
    try {
    
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date().toLocaleDateString()

          };
          

        // Agregar un ID único para el documento
        const newUserID = uuidv4();
        await db.collection('users').doc(newUserID).set(newUser);

        return res.status(204).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/users/:user_id/', async (req, res) => {
    try {
        const { user_id} = req.params;
        const userRef = db.collection('users').doc(user_id);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        const response = userDoc.data();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/users/:user_id/properties/:property_id', async (req, res) => {
    try {
        const { user_id, property_id } = req.params;
        const userRef = db.collection('users').doc(user_id);
        const propertyRef = userRef.collection('properties').doc(property_id);
        const propertyDoc = await propertyRef.get();

        if (!propertyDoc.exists) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        const response = propertyDoc.data();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
});


router.delete('/users/:users_id', async(req, res)=>{
    try {
        const document = db.collection('users').doc(req.params.users_id);
        await document.delete();
        return res.status(200).json("el usuario se ha eliminado correctamente")
    } catch (error) {
        return res.status(500).send(error)
    }
});

router.put('/users/:users_id', async (req, res) => {
    try {
      const document = db.collection('users').doc(req.params.users_id);
  
      const updates = {};
      if (req.body.firstName) updates.firstName = req.body.firstName;
      if (req.body.lastName) updates.lastName = req.body.lastName;
      if (req.body.username) updates.username = req.body.username;
      if (req.body.email) updates.email = req.body.email;
      if (req.body.password) updates.password = req.body.password;
      updates.lastUpdated = new Date().toLocaleDateString();
  
      await document.update(updates);
  
      return res.status(200).json("Se ha actualizado correctamente el usuario");
    } catch (error) {
      return res.status(500).send(error);
    }
  });
  


module.exports= router; 


