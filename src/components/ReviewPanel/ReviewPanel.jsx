import React from 'react';
import styles from './ReviewPanel.module.css';

const ReviewPanel = ({ reviews, handleDeleteReviews }) => {
  return (
    <div className={styles.panelContainer}>
      <h2>Reviews:</h2>
      <div className={styles.userListItemName}>
        <p>Author</p>
        <span>Content </span>
        <p>Delete </p>
        <p className={styles.rating}>Rating </p>
        <p >ID Property</p>
        {/* <p>Tipo: {property.type}</p> */}
      </div>
      {reviews.length > 0 && (
        <div className={styles.userListContainer}>
          <ul className={styles.userList} >
            {reviews.map((user) => (
              <li key={user.id} className={styles.userListItem}>
                <div>
                  <p>{user.author}</p>
                  <span className={styles.contentReviews}>{user.content}</span>
                  <p>{user.delete === true ? 'True' : 'False'}</p>
                  <p>{user.rating}  ★</p>
                  <p>{user.propertyId}</p>
                </div>
                <button
                  onClick={() => handleDeleteReviews(user.id)}
                  className={styles.deleteButton}>
                  <img src="https://cdn-icons-png.flaticon.com/128/657/657059.png" alt="" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewPanel;