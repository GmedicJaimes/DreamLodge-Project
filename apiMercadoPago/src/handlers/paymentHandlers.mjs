import {collection, addDoc, serverTimestamp} from 'firebase/firestore'
import mercadopago from 'mercadopago';
import { db } from '../../../src/config/firebase.js'
 
mercadopago.configure({
    access_token:"TEST-1217239966605378-080822-11c74257002c2927c70422faaaaf3e94-1446217996"
})


//   let preference = {
//       items: [
//         {
//           title: req.body.description,
//           unit_price: Number(req.body.price),
//           quantity: Number(req.body.quantity),
//         },
//       ],
//       back_urls: {
//           success:"http://localhost:5173/nice",
//           failure: "http://localhost:3001/failure",
//       },
//       auto_return: "approved"
//     };
  
//     mercadopago.preferences
// .create(preference)
// .then(function (response) {
//   res.json({id : response.body.id})
// })
// .catch(function (error) {
//   console.log(error);
// });
export const createPayment = async(req, res)=>{
    try {
      const result = await mercadopago.preferences.create({
          items:[
              {
                  title: "banana",
                  unit_price: 100,
                  currency_id: "ARS",
                  quantity: 1,
              },
          ],
          metadata:{
            propertyId: "audbaeidbaioudnaduan",
            userId: "useriduseriduserid"
          },
          back_urls: {
              success:"http://localhost:5173/nice",
              failure:"http://localhost:5173/failure"
          },
          notification_url: "https://5bc1-2800-810-5ab-2d5-3028-580-4e9f-c517.ngrok.io/webhook"
      })
  
      // console.log(result)
      res.send(result.body)
        
    } catch (error) {
        console.log(error)
        return res.status(404).send(error)
    }
};
export const listenWebHook = async(req, res)=>{
    const payment = req.query;
    try {
        if(payment.type === "payment"){
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data)
            const registerPurchase = async()=>{
                const netAmount =  data.transaction_details.net_received_amount;
                const userId =  data.metadata.user_id;
                const propertyId =  data.metadata.property_id;
              try {
                const purchasesCollectionRef = collection(db, 'purchases');
                

                await addDoc(purchasesCollectionRef, {
                    userId: userId,
                    propertyId:propertyId ,
                    totalAmount: netAmount,
                    timestamp: serverTimestamp()
                })
              } catch (error) {
                console.error(error)
              }
            }
            await registerPurchase()
        };
        res.status(204)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
    
};

// const registerPurchases = async (userId, propertyId) => {
//   try {
//     // Referencia a la colección "purchases"
//     const purchasesCollectionRef = collection(db, 'purchases');

//     // Agregar un nuevo documento con la información de la compra
//     await addDoc(purchasesCollectionRef, {
//       userId: userId,
//       propertyId: propertyId,
//       purchaseDate: serverTimestamp(), // Marca de tiempo del servidor
//     });

//     // console.log('Compra registrada exitosamente');
//   } catch (error) {
//     //console.error('Error al registrar la compra:', error);
//   }}

