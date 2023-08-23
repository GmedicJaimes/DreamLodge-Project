import React, { useState, useEffect } from 'react';
import { getAllFailure } from '../../../config/handlers';
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
  }, []);

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
                  <p>{user.timestamp.seconds}</p> {/* Adjust this based on your timestamp structure */}
                </div>
                <button
                  onClick={() => handleDeleteReviews(user.id)}
                  className={styles.deleteButtonFailure}>
                  Delete
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
