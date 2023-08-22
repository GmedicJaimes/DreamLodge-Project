import React, { useState } from "react";
import { Link } from "react-router-dom";
import About from "../../components/About/About";
import styles from "./FailedPay.module.css";
import {db} from '../../config/firebase'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const FailedPay = () => {

    const failureCollectionRef = collection(db, "failures");

const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleContactSupport = async () => {
    if (errorMessage.trim() === "" || author.trim() === "" || subject.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(failureCollectionRef, {
        author: author,
        subject: subject,
        message: errorMessage,
        timestamp: serverTimestamp(),

      })
      alert("Error message sent successfully!");
      alert("Error message sent successfully!");
      setAuthor(""); 
      setSubject(""); 
      setErrorMessage(""); 
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again later.");
    }
  };
  return (
    <div>
      <div className={styles.containerPrev}>
        <div className={styles.container}> 
          <header className={styles.failedPay}>PAYMENT FAILED!</header> 
          <p>
            Oops! Something went wrong with your payment. Please try again or
            contact customer support.
          </p>
          <div className={styles.failedPaymentInfo}> 
            <p>If you need assistance, please contact our support team.</p>
            <div>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Your Name (Author)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <input
                type="text"
                className={styles.inputField}
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                className={styles.textAreaField}
                placeholder="Enter your error message here"
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
              />
              <button className={styles.btnContact} onClick={handleContactSupport}>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
      <About />
    </div>
  );
};

export default FailedPay;
