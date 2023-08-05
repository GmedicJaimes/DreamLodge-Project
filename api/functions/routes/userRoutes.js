const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');



const db = admin.firestore();

router.get('/users', async (req, res) => {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();

        if (snapshot.empty) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }  

        let users = [];
        snapshot.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            data.id = id; // Agregar la propiedad ID al objeto que se va a devolver
            users.push(data);
        });

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error);
    }
});




// ------------------------------------- PRUEBA CHRIS


router.post('/users', async (req, res) => {
    try {
        // Validar los datos del usuario (puedes expandir esto según tus necesidades)
        const UserID = uuidv4();
        const newUser = {
                         firstName: req.body.firstName,
                         lastName: req.body.lastName,
                         username: req.body.username,
                         email: req.body.email,
                         password: req.body.password,
                         createdAt: new Date().toLocaleDateString(),
                         id:UserID
            
            };

        // Agregar un ID único para el documento
        await db.collection('users').doc(UserID).set(newUser);

        return res.status(201).json({ userId: UserID }); // responder con el ID del usuario
    } catch (error) {
        return res.status(500).send(error);
    }
});






// ------------------------------------- PRUEBA CHRIS
router.get('/users/:user_id', async (req, res) => {
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


/* router.get('/users/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const userRef = db.collection('users').doc(user_id);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const userData = userDoc.data();
        if (!userData.properties || userData.properties.length === 0) {
            return res.status(404).json({ message: 'No se encontraron propiedades para este usuario' });
        }

        let properties = [];
        for (const propertyId of userData.properties) {
            const propertyDoc = await db.collection('properties').doc(propertyId).get();
            if (propertyDoc.exists) {
                properties.push(propertyDoc.data());
            }
        }

        return res.status(200).json(properties);
    } catch (error) {
        return res.status(500).send(error);
    }
}); */



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


