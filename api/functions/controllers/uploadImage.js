const { v4: uuidv4 } = require('uuid');
const os = require('os');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');

// Función para subir la imagen a Firebase Storage
const uploadImageToStorage = async (imageFile) => {
  // Validar si se proporcionó una imagen
  if (!imageFile) {
    throw new Error('No se ha proporcionado ninguna imagen');
  }

  // Obtener el bucket de Firebase Storage
  const bucket = admin.storage().bucket();

  // Generar un nombre único para la imagen utilizando uuidv4() y el nombre original del archivo
  const imageFileName = `${uuidv4()}_${imageFile.originalname}`;

  // Crear una ruta temporal donde se guardará la imagen antes de subirla al Storage
  const tempFilePath = path.join(os.tmpdir(), imageFileName);

  // Escribir los datos de la imagen en el archivo temporal
  await fs.promises.writeFile(tempFilePath, imageFile.buffer);

  // Opciones para la subida de la imagen al Storage
  const options = {
    destination: `gs://dreamlodge-8517c.appspot.com/${imageFileName}`, // Ruta donde se guardará la imagen en el Storage
    metadata: {
      contentType: imageFile.mimetype, // Tipo de contenido de la imagen (por ejemplo, image/jpeg)
    },
  };

  // Subir la imagen al Firebase Storage con las opciones especificadas
  await bucket.upload(tempFilePath, options);

  // Eliminar el archivo temporal después de subir la imagen al Storage
  fs.unlinkSync(tempFilePath);

  // Retornar la URL de la imagen en el Firebase Storage
  return `https://storage.googleapis.com/${bucket.name}/${options.destination}`;
};

module.exports = { uploadImageToStorage };
