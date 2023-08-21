import styles from "./DetailPost.module.css";
import React, { useContext, useState, useEffect } from "react";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import About from "../../../components/About/About";
import guest from "../../../assets/gente_junta.png";
import door from "../../../assets/puerta.png";
import bed from "../../../assets/cama.png";
import usuario from "../../../assets/usuario.png"
import bathroomicon from "../../../assets/bano-publico.png";
import SubTotal from "../../../components/subTotal/SubTotal";
import { DateContext } from "../../../Contex/DateContex";
import {
  getBookedDatesForProperty,
  isPropertyAvailable,
} from "../../../config/handlers";
import { db } from "../../../config/firebase";


import dayjs from "dayjs";


import { useParams, Link } from "react-router-dom";
import { detailId } from "../../../config/handlers";


import { auth } from "../../../config/firebase";

const DetailPost = () => {
  const { id } = useParams();
  const [property, setPropertyDetail] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  


  // console.log(id)

  const propertyId = id


  //CALENDAR DATES ============================================

  const { startDate, endDate, setDateRange } = useContext(DateContext); // Use the imported useContext
  const [occupiedDates, setOccupiedDates] = useState([]);

  const handleStartDateChange = async (date) => {
    setDateRange(date, endDate);

    if (startDate) {
      const isAvailable = await isPropertyAvailable(id, startDate, date);
      if (!isAvailable) {
        swal( 'Error',"The property is not available for these dates.", 'error');
      }
    }
  };

  const handleEndDateChange = async (date) => {
    setDateRange(startDate, date);

    if (endDate) {
      const isAvailable = await isPropertyAvailable(id, date, endDate);
      if (!isAvailable) {
        swal( 'Error',"The property is not available for these dates.", 'error');
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
          const formattedDates = bookedDates.map((date) =>
            dayjs(date, "D MMMM YYYY").format("YYYY-MM-DD")
          );
          setOccupiedDates(formattedDates);
        } else {
          console.error(
            "Las fechas recuperadas no son un arreglo:",
            bookedDates
          );
        }
      } catch (error) {
        console.error("Error obteniendo las fechas:", error);
      }
    }
    window.scrollTo(0, 0);
    fetchBookedDates();
    return 
  }, [id]);

  //REVIEWS============================================

  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState([]);
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

      swal("Review sent successfully");
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

  React.useEffect(() => {
    localStorage.setItem(
      "propertyData",
      JSON.stringify({property, propertyId})
    );
  }, [property]);

  //CALCULAR EL PRECIO p/dias========================================
  const [selectedDays, setSelectedDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleCalculatePrice = () => {
    const pricePerDay = property?.price;
    const calculatedPrice = selectedDays * pricePerDay;
    setTotalPrice(calculatedPrice);
  }; //CALCULAR EL PRECIO
  //=============================================================
  //

  useEffect(() => {
    async function fetchData() {
      try {
        const detailPost = await detailId(id);
        setPropertyDetail(detailPost);

        const reviewsSnapshot = await getDocs(
          query(collection(db, "reviews"), where("propertyId", "==", id))
        );
        const reviewsData = reviewsSnapshot.docs.map((reviewDoc) =>
          reviewDoc.data()
        );
        setReviews(reviewsData);

        if (auth.currentUser) {
          const userId = auth.currentUser.uid;
          const purchasesQuery = query(
            collection(db, "purchases"),
            where("userId", "==", userId),
            where("propertyId", "==", id)
          );
          const purchasesSnapshot = await getDocs(purchasesQuery);
          const hasPurchased = !purchasesSnapshot?.empty;

          setHasPurchased(hasPurchased);
        }
      } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
      }
    }

    fetchData();
  }, []);


  const isTwoColumns = property?.services?.length > 5;


  return (
    <div>
      <div className={styles.bigContainerDetail}>
        <header>
          <section>
            <h1 className={styles.tittleD}>{property?.name}</h1>{" "}
            <span className={styles.tittleSpan}>★4.2</span>
            <h5 className={styles.location}>
              {property?.location?.city}, {property?.location?.state}
            </h5>
            <h3 className={styles.locationTwo}>
              {" "}
              {property?.location?.adress}
            </h3>
          </section>
          <section>
            <p className={styles.pPrice}>
              {" "}
              <span className={styles.spanPrice}>${property?.price}</span> PER
              NIGHT
            </p>
            <p className={styles.priceDiv}>
              {" "}
              <a href="#payment">Reserve here </a>
            </p>
            <div></div>
          </section>
        </header>
        <div className={styles.falseLine}></div>
        <section className={styles.imageRelative}>
          <button onClick={prevImage} className={styles.prevButton}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/271/271220.png"
              alt=""
              className={styles.imageDetail}
            />
          </button>
          <img
            src={property?.imageUrl && property.imageUrl[activeImage]}
            alt={property?.imageUrl}
            className={styles.imageCarrousel}
          />
          <button onClick={nextImage} className={styles.nextButton}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/271/271228.png"
              alt=""
            />
          </button>
        </section>
        <div className={styles.falseLineOne}></div>

        <div className={styles.containerSection}>
          <div className={styles.containerSectionOne}>
            <section className={styles.overviewBox}>
              <h3>Description</h3>
              <p>{property?.description}</p>
            </section>
            <section >
              <h3>Facilities</h3>
              <div className={styles.servicesD}>
                <ul className={isTwoColumns ? styles.twoColumns : ''}>
                  {property?.services?.map((serviceItem) => {
                    return (
                      <li key={serviceItem} className={styles.listServices}>
                        {serviceItem}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>

            <section className={styles.roomsD}>
              <h3>The Room</h3>
              <div>
                <div className={styles.roomsDOne}>
                  <img src={guest} /> Capacity:{" "}
                  <span className={styles.spanServices}>
                    {property?.stances?.guest}
                  </span>
                  <img src={door} className={styles.roomsDTwoBed} /> Room(s):{" "}
                  <span className={styles.spanServices}>
                    {property?.stances?.rooms}
                  </span>
                </div>
                <div className={styles.roomsDTwo}>
                  <img src={bed} /> Bed(s):{" "}
                  <span
                    className={`${styles.spanServices} ${styles.spanproperty}`}
                  >
                    {property?.stances?.beds}
                  </span>
                  <img src={bathroomicon} className={styles.roomsDTwoBed} />{" "}
                  Bathroom(s):{" "}
                  <span className={styles.spanServices}>
                    {property?.stances?.bathrooms}
                  </span>
                </div>
              </div>
            </section>
          </div>
          <div className={styles.containerSectionTwo} id="payment">
            <SubTotal
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              property={property}
              propertyId={propertyId}
            />
          </div>
        </div>
        <div className={styles.falseLine}></div>
        <section id="" className={styles.reviewBigBox}>
          <h3>Reviews <span className={styles.tittleSpan}>4.5</span></h3>
          <div className={styles.reviewsBox}>
            {reviews &&
              reviews.map((r) => (
                <div className={styles.singleReview} key={r.id}>
                  <div>
                    <img className={styles.iconUserReview} src={usuario} alt="" />
                  </div>
                  <div>
                    <div className={styles.headRev}>
                      <p className={styles.reviewAut}>{r.author}</p>
                      <p className={styles.reviewRat}><span className={styles.tittleSpan}>★{r.rating}</span></p>
                    </div>
                    <p className={styles.reviewCont}> {r.content}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
      {hasPurchased && (
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
          <button onClick={() => submitReview(id)}>Enviar Reseña</button>
        </div>
      )}


      <About />
    </div>
  );
};

export default DetailPost;
