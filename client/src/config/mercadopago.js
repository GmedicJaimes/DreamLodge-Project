// Agrega esta importación al principio del archivo
import mercadopago from './mercadopago'; 
import {v4} from 'uuid'
export const createMercadoPagoPayment = async (amount) => {
  try {
    const preference = {
      items: [
        {
          title: 'Producto 1',
          unit_price: amount, 
          quantity: 1,
        },
      ],
      external_reference: v4(), 
    };

    const response = await mercadopago.preferences.create(preference);
    return response.body.init_point;
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el pago en Mercado Pago');
  }
};
