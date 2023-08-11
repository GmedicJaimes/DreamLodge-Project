import { db } from './firebase';

//agregar fechas disponibles
export const addReservedDate = async (propertyId, reservedDate) => {
  try {
    const propertyRef = db.collection('properties').doc(propertyId);
    await propertyRef.update({
      reservedDates: firebase.firestore.FieldValue.arrayUnion(reservedDate),
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al agregar la fecha reservada');
  }
};
// obtener las fechas disponibles
export const getReservedDatesForProperty = async (propertyId) => {
  try {
    const propertyRef = db.collection('properties').doc(propertyId);
    const propertySnapshot = await propertyRef.get();
    if (propertySnapshot.exists()) {
      const propertyData = propertySnapshot.data();
      return propertyData.reservedDates || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener las fechas reservadas');
  }
};
