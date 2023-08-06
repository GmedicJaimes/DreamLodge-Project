const { v4: uuidv4 } = require('uuid');
const os = require('os');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');

// Función para subir la imagen a Firebase Storage
const uploadImageToStorage = async (imageFile) => {
  if (!imageFile) {
    throw new Error('No se ha proporcionado ninguna imagen');
  }

  const bucket = admin.storage().bucket();
  const imageFileName = `${uuidv4()}_${imageFile.originalname}`;
  const tempFilePath = path.join(os.tmpdir(), imageFileName);

  await fs.promises.writeFile(tempFilePath, imageFile.buffer);

  const options = {
    destination: `gs://dreamlodge-8517c.appspot.com/${imageFileName}`,
    metadata: {
      contentType: imageFile.mimetype,
    },
  };

  await bucket.upload(tempFilePath, options);
  fs.unlinkSync(tempFilePath);

  return `https://storage.googleapis.com/${bucket.name}/${options.destination}`;
};

module.exports = {uploadImageToStorage};
