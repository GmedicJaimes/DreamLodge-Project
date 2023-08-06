const admin = require('firebase-admin');

const getImageURLFromStorage = async (imagePath) => {
    try {
        const bucket = admin.storage().bucket();
        const [url] = await bucket.file(imagePath).getSignedUrl({
            action: 'read',
            expires: '01-01-2500', // Puedes ajustar la fecha de expiración si lo deseas
        });
        return url;
    } catch (error) {
        console.error('Error al obtener la URL de la imagen desde el Storage:', error);
        return null;
    }
};

module.exports = { getImageURLFromStorage }