const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');



const db = admin.firestore();

////////////////////////////////// OBTENER USUARIOS

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
            data.country = doc.data().country;
            data.image = doc.data().image;
            data.languague = doc.data().languague;
            data.banner = doc.data().banner
            users.push(data);
            data.id = id; // Agregar la propiedad ID al objeto que se va a devolver
            // Incluir los campos adicionales en el objeto de datos
        });

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error);
    }
});







////////////////////////////////// CREAR  USUARIO

router.post('/users', async (req, res) => {
    try {
        // Validar los datos del usuario (puedes expandir esto según tus necesidades)
        const {
            firstName,
            lastName,
            country,
            image,
            banner,
            languague,
            username,
            email,
            password
          } = req.body;
          console.log(req.body)

          if (!firstName || !lastName || !country || !username || !email || !password) {
            return res.status(404).json({ error: "missing some info" });
        }
        


        const UserID = uuidv4();
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            country: country,
            image: image ?? '', 
            banner: banner ?? '', 
            languague: [languague] ?? [], 
            username: username,
            email: email,
            password: password,
            createdAt: new Date().toLocaleDateString(),
            id: UserID
        };
            console.log(newUser)

        // Agregar un ID único para el documento
        await db.collection('users').doc(UserID).set(newUser);

        return res.status(201).json({ userId: UserID }); // responder con el ID del usuario
    } catch (error) {
        return res.status(500).send(error);
    }
});






////////////////////////////////// OBTENER USUARIO BY ID


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



////////////////////////////////// DELETE USUARIO


router.delete('/users/:users_id', async(req, res)=>{
    try {
        const document = db.collection('users').doc(req.params.users_id);
        await document.delete();
        return res.status(200).json("el usuario se ha eliminado correctamente")
    } catch (error) {
        return res.status(500).send(error)
    }
});

////////////////////////////////// MODIFICAR USUARIO

router.put('/users/:users_id', async (req, res) => {
    try {
        const document = db.collection('users').doc(req.params.users_id);

        const updates = {};
        if (req.body.firstName) updates.firstName = req.body.firstName;
        if (req.body.lastName) updates.lastName = req.body.lastName;
        if (req.body.country) updates.country = req.body.country;
        if (req.body.image) updates.image = req.body.image ?? '';
        if (req.body.banner) updates.banner = req.body.banner ?? '';
        if (req.body.languague) updates.languague = [req.body.languague] ?? [];
        if (req.body.username) updates.username = req.body.username;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.password) updates.password = req.body.password;
        updates.lastUpdated = new Date().toLocaleDateString();

        await document.update(updates);

        // Obtener los datos actualizados del usuario después de la actualización
        const snapshot = await document.get();
        if (!snapshot.exists) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const updatedUser = snapshot.data();

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).send(error);
    }
});



module.exports= router; 


