import React, { useState, useEffect } from 'react';
import { getAllFailure, deleteFailureById } from '../../../config/handlers';
import { doc } from 'firebase/firestore'; // Import doc from Firestore
import styles from "./FailureDash.module.css";


const FailureDash = () => {
  const [failures, setFailures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllFailure();
        setFailures(data);
      } catch (error) {
        console.error('Error al cargar los failures:', error);
      }
    };

    fetchData();
  }, []);;


  const handleDeleteFailure = async (failureAuthor) => {
    const confirmDelete = await swal({
      title: 'Delete Failure',
      text: 'Are you sure you want to delete this failure?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Delete'],
    });

    if (confirmDelete) {
      try {
        await deleteFailureById(failureAuthor);
        setFailures(prevFailures => prevFailures.filter(failure => failure.author !== failureAuthor));
      } catch (error) {
        console.error('Error deleting failure:', error);
      }
    }
  };
  
  

  return (
    <div className={styles.failureContainer}>
      <h2>Failures:</h2>
      <div className={styles.userListItemFailure}>
        <p className={styles.userListItemAuthor}>Author</p>
        <p>Message</p>
        <p>Subject</p>
        <p>Date</p>
      </div>
      {failures?.length > 0 && (
        <div className={styles.userListContainerFailure}>
          <ul className={styles.userListFailure}>
            {failures.map((user) => (
              <li key={user.id} className={styles.userListItemFailure}>
                <div className={styles.FailureDiv}>
                  <p>{user.author}</p>
                  <p className={styles.contentReviewsFailure}>{user.message}</p>
                  <p>{user.subject}</p>
                  <p>{new Date(user.timestamp * 1000).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => handleDeleteFailure(user.author)}
                  className={styles.deleteButtonFailure}>
                  <img src="https://cdn-icons-png.flaticon.com/128/657/657059.png" alt="" srcSet="" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FailureDash;
