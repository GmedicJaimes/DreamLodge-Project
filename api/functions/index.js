/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require('express');
const admin = require('firebase-admin');
const multer = require('multer');
const upload = multer()
admin.initializeApp({
    credential: admin.credential.cert('./permisos.json'),
    storageBucket: 'your-storage-bucket-url.appspot.com',
});


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(upload.single('image'));

app.use(require('./routes/propertiesRouter'));
app.use(require('./routes/reviewsRouter'));
app.use(require('./routes/userRoutes'));

exports.app = onRequest(app)
// app.get('/', (req, res)=>{
//     res.status(200).json({message: "hello world!"})
// })
// exports.app = logger.https.onRequest(app);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((req, res) => {
//   logger.info("Hello logs!", {structuredData: true});
//   res.send("Hello from Firebase!");
// });

