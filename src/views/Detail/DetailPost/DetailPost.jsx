import styles from "./DetailPost.module.css"
import React, { useContext,useState, useEffect } from 'react';
import { query, collection, where, getDocs } from "firebase/firestore";
import About from "../../../components/About/About";
import guest from "../../../assets/gente-junta.png"
import door from "../../../assets/puerta.png"
import bed from "../../../assets/cama.png"
import bathroomicon from "../../../assets/bano-publico.png"
import SubTotal from "../../../components/subTotal/SubTotal"
import { DateContext } from "../../../Contex/DateContex";
import {fetchAvailablePropertiesInRange, getBookedDatesForProperty,isPropertyAvailable} from "../../../config/handlers"
import { db } from '../../../config/firebase'

import dayjs from "dayjs";


import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'

import {useParams, Link } from "react-router-dom";
import { detailId } from "../../../config/handlers";

import {getPaymentStatus, updateAvaible} from '../../../config/handlers'
import { auth } from "../../../config/firebase";

const DetailPost = () => {
  const { id } = useParams();
  const [property, setPropertyDetail] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

 


  //CALENDAR DATES ============================================

  
  const { startDate, endDate,setDateRange  } = useContext(DateContext); // Use the imported useContext
  const [occupiedDates, setOccupiedDates] = useState([]);




  const handleStartDateChange = async (date) => {
    setDateRange(date, endDate);

    
    if (startDate) {
      const isAvailable = await isPropertyAvailable(id, startDate, date);
      if(!isAvailable) {
        alert("La propiedad no está disponible para estas fechas.");
      }

    }
  };

  const handleEndDateChange = async (date) => {
    setDateRange(startDate, date);



    if (endDate) {
      const isAvailable = await isPropertyAvailable(id, date, endDate);
      if(!isAvailable) {
        alert("La propiedad no está disponible para estas fechas.");
        // Aquí puedes manejar cualquier otra lógica que necesites, 
        // por ejemplo, desactivar un botón de reservar o mostrar un mensaje específico.
      }
    }    
    
  };
  



  useEffect(() => {
    async function fetchBookedDates() {
        try {
            const bookedDates = await getBookedDatesForProperty(id);
            if (Array.isArray(bookedDates)) {
                const formattedDates = bookedDates.map(date => dayjs(date, "D MMMM YYYY").format("YYYY-MM-DD"));
                setOccupiedDates(formattedDates); 
            } else {
                console.error('Las fechas recuperadas no son un arreglo:', bookedDates);
            }
        } catch (error) {
            console.error('Error obteniendo las fechas:', error);
        }
    }
    
    fetchBookedDates();
}, [id]); 

 




    //CALENDAR DATES ============================================




  //REVIEWS============================================

  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [hasPurchased, setHasPurchased] = useState(null);
  
  const submitReview = async (propertyId) => {
    try {
      await addDoc(collection(db, "reviews"), {
        propertyId: propertyId,
        author: reviewAuthor,
        content: reviewContent,
        rating: reviewRating,
      });
  
      // Limpia los campos del formulario después de enviar la reseña
      setReviewAuthor("");
      setReviewContent("");
      setReviewRating(0);
  
      alert("Reseña enviada con éxito");
    } catch (error) {
      console.log(error);
    }
  };
  // PREV IMAGE =======================================
  const prevImage = () => {
    if (activeImage > 0) {
      setActiveImage(activeImage - 1);
    }
  };

    // NEXT IMAGE =======================================

  const nextImage = () => {
    if (activeImage < property?.imageUrl?.length - 1) {
      setActiveImage(activeImage + 1);
    }
  };



  // CONFIGURACION DEL PAGO=======================================
  const[preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-b1609369-11aa-4417-ac56-d07ef28cfcff")
    const createPreference = async()=>{
        try {
            const response = await axios.post(`http://localhost:3001/createorder`, {
                description: `${property.name}`,
                price: `${totalPrice}`,
                quantity: `${selectedDays}`,
                currency_id: "ARS",
            });

            const { id } = response.data;

            return id
        } catch (error) {
            console.log(error)
        }
    }

    const [infoTicket, setInfoTicket] = React.useState({
      idTicket: "",
      propertyTicket: {},
      daysTicket: "",
      priceTicket: "",
      propertyId: "",
      buyerIdTicket: ""
    })

    const handleBuy = async()=>{
        const id = await createPreference();
        //si la preferencia nos devuelve un id, seteamos el estado local para renderizar el boton
        if (id){
            setPreferenceId(id);

            // setInfoTicket({ 
            //   idTicket: id,
            //   propertyTicket: property,
            //   daysTicket: selectedDays,
            //   priceTicket: totalPrice,
            //   propertyId: property.id,
            //   buyerIdTicket: auth?.currentUser?.uid
            // });
            //ademas, comienza el intervalo loopeado y la locomotora del sabor del dinero, esperando que MP nos de una respuesta del pago;
            try {
                await new Promise((resolve)=>{
                    const intervalPay = setInterval(async()=>{
                    const paymentStatus = await getPaymentStatus(id);
                    if(paymentStatus === 'approved'){
                        //si el pago fue aprovado se actualiza el avaible de "true" a "false"
                        updateAvaible(property.id, preferenceId);
                        //cortamos el problema y resolvemos la promesa
                        clearInterval(intervalPay)
                        resolve()
                    }else if(paymentStatus === 'rejected'){
                        //si el pago es rechazado, se corda el intervalo sin actualizar
                        clearInterval(intervalPay);
                        resolve()
                    }
                    })
                }, 10000)
            } catch (error) {
                console.error("Error en la obtencion del status de pago", error);
            }
        };
    };

      React.useEffect(() => {
        localStorage.setItem('propertyData', JSON.stringify({ 
            property: property,
            selectedDays: selectedDays,
            totalPrice: totalPrice,
            propertyId: id,
            buyerId: auth?.currentUser?.uid
        }));
      }, [property]);
  

  //CALCULAR EL PRECIO p/dias========================================
  const [selectedDays, setSelectedDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleCalculatePrice = () => {
    const pricePerDay = property.price;
    const calculatedPrice = selectedDays * pricePerDay;
    setTotalPrice(calculatedPrice);
  }; //CALCULAR EL PRECIO
  //=============================================================
  //

  useEffect(() => {
    async function fetchData() {
      // Obtener detalles de la propiedad
      try {
        const detailPost = await detailId(id);
        setPropertyDetail(detailPost);
  
        // Obtener reseñas de la propiedad
        const reviewsSnapshot = await getDocs(
          query(collection(db, "reviews"), where("propertyId", "==", id))
        );
        const reviewsData = reviewsSnapshot.docs.map((reviewDoc) => reviewDoc.data());
        // Aquí puedes hacer algo con reviewsData si es necesario, como actualizar el estado.
  
        // Si el usuario loggeado compró la propiedad
        if (auth.currentUser) {
          const userId = auth.currentUser.uid;
          const purchasesQuery = query(collection(db, "purchases"), 
            where("userId", "==", userId),
            where("propertyId", "==", id)
          );
          const purchasesSnapshot = await getDocs(purchasesQuery);
          const hasPurchased = !purchasesSnapshot.empty;
  
          // Modificar el estado hasPurchased
          setHasPurchased(hasPurchased);
        }
      } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
      }
    }
  
    fetchData();
  }, []); 
  
console.log(`soyyyyyy property detaillllll` , property)

 
 const formattedOccupiedDates = occupiedDates.map(date => {
  if (date instanceof Date && !isNaN(date)) {
    return date.toISOString();
  } else {
    console.warn("Found a non-Date object:", date);
    return null;
  }
}).filter(date => date);  // Filter out any null values

  return (
    <div>
      <div className={styles.bigContainerDetail}>
        
        <header>
          <section>
            <h1 className={styles.tittleD}>{property?.name}</h1>
            <h5 className={styles.location}>{property?.location?.city}, {property?.location?.state}, {property?.location?.adress}</h5>
          </section>
          <section>
            <div className={styles.priceDiv}>{property?.price} USD/night</div>
            <p><a href="#pie">Reserve here</a></p>
            <div>

            </div>
          </section>
        </header>
        <section className={styles.imageRelative}>
        <button onClick={prevImage} className={styles.prevButton}><img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" alt="" /></button>
        <img
              src={property?.imageUrl && property.imageUrl[activeImage]}
              alt={property?.imageUrl}
              className={styles.imageCarrousel}
            />
            <button onClick={nextImage} className={styles.nextButton}><img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="" /></button>
        </section>
        <div className={styles.falseLine}></div>
        <SubTotal 
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        property={property}
        formattedOccupiedDates={formattedOccupiedDates}
        id ={id }
        />
        
        <section className={styles.overviewRating}>
            <section className={styles.overviewBox}>
                <h3>Overview</h3>
                <p>{property?.description}</p>
            </section>
            <section>
              <h3>Rating</h3>
              <div className={styles.ratingBox}><p>4,2</p></div>
            </section>
        </section>
        <div className={styles.falseLine}></div>
        <section className={styles.roomsService}>
          <section className={styles.roomsD}>
              <h3>Rooms</h3>
              <ul>
                <li><img src={guest}/> Capacity: {property?.stances?.guest}</li>
                <li><img src={door}/> Room(s): {property?.stances?.rooms}</li>
                <li><img src={bed}/> Bed(s): {property?.stances?.beds}</li>
                <li><img src={bathroomicon}/> Bathroom(s): {property?.stances?.bathrooms}</li>
              </ul>
          </section>
          <section className={styles.servicesD}>
              <h3>Services</h3>
              <div>
                <ul>
                  {
                    property?.services?.map((serviceItem) => {
                      return <li key={serviceItem}>{serviceItem}</li>
                    })
                  }
                </ul>
              </div>
          </section>
        </section>
        <div className={styles.falseLine}></div>
        <section id="pie" className={styles.paymentBox}></section>
          <section>
            <div className={styles.priceDiv}>{property?.price} USD/night</div>
            {totalPrice > 0 && <div className={styles.priceDiv}>Total to pay: $ {totalPrice}</div>}
            <div className={styles.reservebtn} onClick={handleBuy}>Reserve</div>
          </section>
          <div>
            <h3>Select the number of reservation days:</h3>
            <input
              className={styles.reservationDays}
              type="number"
              min="1"
              value={selectedDays}
              onChange={(e) => setSelectedDays(Number(e.target.value))}
            />
            <button className={styles.otroBoton} onClick={handleCalculatePrice}>Calculate Price</button>
            {preferenceId && (
              <Wallet initialization={{ preferenceId: preferenceId }} />
            )}
          </div>
      </div>
      {hasPurchased &&
      <div>
        <h3>Deja una reseña:</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={reviewAuthor}
              onChange={(e) => setReviewAuthor(e.target.value)}
            />
            <textarea
              placeholder="Contenido de la reseña"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
            >
              <option value={1}>1 estrella</option>
              <option value={2}>2 estrellas</option>
              <option value={3}>3 estrellas</option>
              <option value={4}>4 estrellas</option>
              <option value={5}>5 estrellas</option>
            </select>
            <button onClick={() => submitReview(id)}>Enviar Reseña</button></div>}
            

            <About></About>
            </div>
  
  );
};




export default DetailPost;



// import styles from "./DetailPost.module.css"
// import React, { useContext,useState, useEffect } from 'react';
// import About from "../../../components/About/About";
// import guest from "../../../assets/gente-junta.png"
// import door from "../../../assets/puerta.png"
// import bed from "../../../assets/cama.png"
// import bathroomicon from "../../../assets/bano-publico.png"
// import SubTotal from "../../../components/subTotal/SubTotal"
// import { DateContext } from "../../../Contex/DateContex";
// import {fetchAvailablePropertiesInRange, isPropertyAvailable} from "../../../config/handlers"


// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
// import axios from 'axios'

// import {useParams, Link } from "react-router-dom";
// import { detailId } from "../../../config/handlers";

// import {getPaymentStatus, updateAvaible} from '../../../config/handlers'
// import { auth } from "../../../config/firebase";

// const DetailPost = () => {
//   const { id } = useParams();
//   const [property, setPropertyDetail] = useState([]);
//   const [activeImage, setActiveImage] = useState(0);



//   //CALENDAR DATES ============================================

  
//   const [propertyDates, setPropertyDates] = useState({});
//   const { startDate, endDate,setDateRange  } = useContext(DateContext); // Use the imported useContext


//   const handleStartDateChange = async (date) => {
//     setDateRange(startDate, date);
    
//     if (startDate) {
//       const isAvailable = await isPropertyAvailable(id, startDate, date);
//       if(!isAvailable) {
//         alert("La propiedad no está disponible para estas fechas.");
//         // Igual que antes, maneja la lógica que necesites aquí.
//       }

//       console.log(isAvailable)
//     }
//     console.log(`ID`,id,"START",startDate,"DATE",date)
//   };

//   const handleEndDateChange = async (date) => {
//     setDateRange(date, endDate);
    
//     if (endDate) {
//       const isAvailable = await isPropertyAvailable(id, date, endDate);
//       if(!isAvailable) {
//         alert("La propiedad no está disponible para estas fechas.");
//         // Aquí puedes manejar cualquier otra lógica que necesites, 
//         // por ejemplo, desactivar un botón de reservar o mostrar un mensaje específico.
//       }
//       console.log(isAvailable)  
//     }    
//     console.log(`ID`,id,"END",endDate,"DATE",date)
//   };
  




// //   const handleReserveClick = async () => {
// //   // Aquí obtén startDate y endDate de alguna manera, por ejemplo, desde tus campos de entrada
  
// //   const propertyAvailable = await isPropertyAvailable(propertyId, startDate, endDate);

// //   if (!propertyAvailable) {
// //     alert("Lo sentimos, pero la propiedad está ocupada entre las fechas seleccionadas.");
// //   } else {
// //     // Aquí puedes realizar la reserva ya que la propiedad está disponible
// //     // Realiza las acciones necesarias para la reserva
// //   }
// // };





//     //CALENDAR DATES ============================================




//   //REVIEWS============================================

//   const [reviewAuthor, setReviewAuthor] = useState("");
//   const [reviewContent, setReviewContent] = useState("");
//   const [reviewRating, setReviewRating] = useState(0);
//   const [hasPurchased, setHasPurchased] = useState(null);
//   const submitReview = async (propertyId) => {
//     try {
//       await addDoc(collection(db, "reviews"), {
//         propertyId: propertyId,
//         author: reviewAuthor,
//         content: reviewContent,
//         rating: reviewRating,
//       });
  
//       // Limpia los campos del formulario después de enviar la reseña
//       setReviewAuthor("");
//       setReviewContent("");
//       setReviewRating(0);
  
//       alert("Reseña enviada con éxito");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // PREV IMAGE =======================================
//   const prevImage = () => {
//     if (activeImage > 0) {
//       setActiveImage(activeImage - 1);
//     }
//   };

//     // NEXT IMAGE =======================================

//   const nextImage = () => {
//     if (activeImage < property?.imageUrl?.length - 1) {
//       setActiveImage(activeImage + 1);
//     }
//   };



//   // CONFIGURACION DEL PAGO=======================================
//   const[preferenceId, setPreferenceId] = useState(null);
//   initMercadoPago("TEST-b1609369-11aa-4417-ac56-d07ef28cfcff")
//     const createPreference = async()=>{
//         try {
//             const response = await axios.post(`http://localhost:3001/createorder`, {
//                 description: `${property.name}`,
//                 price: `${totalPrice}`,
//                 quantity: `${selectedDays}`,
//                 currency_id: "ARS",
//             });

//             const { id } = response.data;

//             return id
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const [idTicket, setIdTicket] = React.useState(0)
//   const [infoTicket, setInfoTicket] = React.useState({
//     idTicket: "",
//     daysTicket: "",
//     priceTicket: "",
//     propertyTicket: {}
//   });

//   // const handleTicket = ( ) => {
//   //   setInfoTicket({
//   //     idTicket: id,
//   //     daysTicket: selectedDays,
//   //     priceTicket: totalPrice,
//   //     propertyTicket: property
//   //   });
//   // }

//     const handleBuy = async()=>{
//         // const id = await createPreference();
//         // //si la preferencia nos devuelve un id, seteamos el estado local para renderizar el boton
//         // if (id){
//         //     setPreferenceId(id);
//         //     setIdTicket(id);
//         //     //ademas, comienza el intervalo loopeado y la locomotora del sabor del dinero, esperando que MP nos de una respuesta del pago;
//         //     try {
//         //         await new Promise((resolve)=>{
//         //             const intervalPay = setInterval(async()=>{
//         //             const paymentStatus = await getPaymentStatus(id);
//         //             if(paymentStatus === 'approved'){
//         //                 //si el pago fue aprovado se actualiza el avaible de "true" a "false"
//         //                 updateAvaible(property.id, preferenceId);
//         //                 //cortamos el problema y resolvemos la promesa
//         //                 clearInterval(intervalPay)
//         //                 resolve()
//         //             }else if(paymentStatus === 'rejected'){
//         //                 //si el pago es rechazado, se corda el intervalo sin actualizar
//         //                 clearInterval(intervalPay);
//         //                 resolve()
//         //             }
//         //             })
//         //         }, 10000)
//         //     } catch (error) {
//         //         console.error("Error en la obtencion del status de pago", error);
//         //     }
//         // };
//         const id = await createPreference();
//         //si la preferencia nos devuelve un id, seteamos el estado local para renderizar el boton
//         if (id){
//             setPreferenceId(id);
//             setInfoTicket({
//               idTicket: id,
//               daysTicket: selectedDays,
//               priceTicket: totalPrice,
//               propertyTicket: property
//             });
//             //ademas, comienza el intervalo loopeado y la locomotora del sabor del dinero, esperando que MP nos de una respuesta del pago;
//             try {
//                 await new Promise((resolve)=>{
//                     const intervalPay = setInterval(async()=>{
//                     const paymentStatus = await getPaymentStatus(id);
//                     if(paymentStatus === 'approved'){
//                         //si el pago fue aprovado se actualiza el avaible de "true" a "false"
//                         updateAvaible(property.id, preferenceId);
//                         //cortamos el problema y resolvemos la promesa
//                         clearInterval(intervalPay)
//                         resolve()
//                     }else if(paymentStatus === 'rejected'){
//                         //si el pago es rechazado, se corda el intervalo sin actualizar
//                         clearInterval(intervalPay);
//                         resolve()
//                     }
//                     })
//                 }, 10000)
//             } catch (error) {
//                 console.error("Error en la obtencion del status de pago", error);
//             }
//         };
//     };

//       React.useEffect(() => {
//         localStorage.setItem('propertyData', JSON.stringify(infoTicket));
//       }, [property]);
  

//   //CALCULAR EL PRECIO p/dias========================================
//   const [selectedDays, setSelectedDays] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const handleCalculatePrice = () => {
//     const pricePerDay = property.price;
//     const calculatedPrice = selectedDays * pricePerDay;
//     setTotalPrice(calculatedPrice);
//   }; //CALCULAR EL PRECIO
//   //=============================================================
//   //

//   useEffect( () => {
//     console.log("aca llego");
//     const propertiesDetail = async () => {
//       const detailPost = await detailId(id);
//       setPropertyDetail(detailPost);
//       // setInfoTicket({...infoTicket, propertyTicket: detailPost})
//       console.log(property);
//       console.log("aca no");
//     };
//       // setPropertyDetail(detailPost)

//     // propertiesDetail();
  
//     // obtener reseñas de la propiedad
//     // const reviewsSnapshot = await getDocs(
//     //   query(collection(db, "reviews"), where("propertyId", "==", id))
//     // );
//     // const reviewsData = reviewsSnapshot.docs.map((reviewDoc) => reviewDoc.data());
  
//     // // si el usuario loggeado, compro la propiedad
//     // if (auth.currentUser) {
//     //   const userId = auth.currentUser.uid;
//     //   const purchasesQuery = query(collection(db, "purchases"), 
//     //     where("userId", "==", userId),
//     //     where("propertyId", "==", id)
//     //   );
//     //   const purchasesSnapshot = await getDocs(purchasesQuery);
//     //   const hasPurchased = !purchasesSnapshot.empty;
  
//     //   // modificamos el estado haspurchased

//     //   setHasPurchased(hasPurchased);
//     // };
//   }, [property]);
  

//   return (
//     <div>
//       <div className={styles.bigContainerDetail}>
        
//         <header>
//           <section>
//             <h1 className={styles.tittleD}>{property?.name}</h1>
//             <h5 className={styles.location}>{property?.location?.city}, {property?.location?.state}, {property?.location?.adress}</h5>
//           </section>
//           <section>
//             <div className={styles.priceDiv}>{property?.price} USD/night</div>
//             <p><a href="#pie">Reserve here</a></p>
//             <div>

//             </div>
//           </section>
//         </header>
//         <section className={styles.imageRelative}>
//         <button onClick={prevImage} className={styles.prevButton}><img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" alt="" /></button>
//         <img
//               src={property?.imageUrl && property.imageUrl[activeImage]}
//               alt={property?.imageUrl}
//               className={styles.imageCarrousel}
//             />
//             <button onClick={nextImage} className={styles.nextButton}><img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="" /></button>
//         </section>
//         <div className={styles.falseLine}></div>
//         <SubTotal 
//         handleStartDateChange={handleStartDateChange}
//         handleEndDateChange={handleEndDateChange}
//         />
//         <section className={styles.overviewRating}>
//             <section className={styles.overviewBox}>
//                 <h3>Overview</h3>
//                 <p>{property?.description}</p>
//             </section>
//             <section>
//               <h3>Rating</h3>
//               <div className={styles.ratingBox}><p>4,2</p></div>
//             </section>
//         </section>
//         <div className={styles.falseLine}></div>
//         <section className={styles.roomsService}>
//           <section className={styles.roomsD}>
//               <h3>Rooms</h3>
//               <ul>
//                 <li><img src={guest}/> Capacity: {property?.stances?.guest}</li>
//                 <li><img src={door}/> Room(s): {property?.stances?.rooms}</li>
//                 <li><img src={bed}/> Bed(s): {property?.stances?.beds}</li>
//                 <li><img src={bathroomicon}/> Bathroom(s): {property?.stances?.bathrooms}</li>
//               </ul>
//           </section>
//           <section className={styles.servicesD}>
//               <h3>Services</h3>
//               <div>
//                 <ul>
//                   {
//                     property?.services?.map((serviceItem) => {
//                       return <li key={serviceItem}>{serviceItem}</li>
//                     })
//                   }
//                 </ul>
//               </div>
//           </section>
//         </section>
//         <div className={styles.falseLine}></div>
//         <section id="pie" className={styles.paymentBox}></section>
//           <section>
//             <div className={styles.priceDiv}>{property?.price} USD/night</div>
//             {totalPrice > 0 && <div className={styles.priceDiv}>Total to pay: $ {totalPrice}</div>}
//             {totalPrice && <div className={styles.reservebtn} onClick={handleBuy}>Reserve</div>}
//           </section>
//           <div>
//             <h3>Select the number of reservation days:</h3>
//             <input
//               className={styles.reservationDays}
//               type="number"
//               min="1"
//               value={selectedDays}
//               onChange={(e) => setSelectedDays(Number(e.target.value))}
//             />
//             <button className={styles.otroBoton} onClick={handleCalculatePrice}>Calculate Price</button>
//             {preferenceId && (
//               <Wallet initialization={{ preferenceId: preferenceId }} />
//             )}
//           </div>
//       </div>
//       {/* {/* {hasPurchased &&
//       <div>
//         <h3>Deja una reseña:</h3>
//             <input
//               type="text"
//               placeholder="Nombre"
//               value={reviewAuthor}
//               onChange={(e) => setReviewAuthor(e.target.value)}
//             />
//             <textarea
//               placeholder="Contenido de la reseña"
//               value={reviewContent}
//               onChange={(e) => setReviewContent(e.target.value)}
//             />
//             <select
//               value={reviewRating}
//               onChange={(e) => setReviewRating(Number(e.target.value))}
//             >
//               <option value={1}>1 estrella</option>
//               <option value={2}>2 estrellas</option>
//               <option value={3}>3 estrellas</option>
//               <option value={4}>4 estrellas</option>
//               <option value={5}>5 estrellas</option>
//             </select>
//             <button onClick={() => submitReview(p.id)}>Enviar Reseña</button></div>} */}
            

//             <About></About>
//             </div>
  
//   );
// };




// export default DetailPost;
