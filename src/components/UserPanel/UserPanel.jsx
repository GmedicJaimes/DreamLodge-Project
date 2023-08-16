import React from 'react';
import styles from './UsersPanel.module.css';

const UsersPanel = ({ users, handleDeleteUsers }) => {
  return (
    <div className={styles.panelContainer}>
      <h2>Usuarios:</h2>
      {users.length > 0 && (
        <div className={styles.userListContainer}>
          <ul className={styles.userList}>
            {users.map((user) => (
              <li key={user.id} className={styles.userListItem}>
                <div>
                  <p>Nombre:</p>
                  <p>Apellido:</p>
                  <p>País: </p>
                  <p>Email: </p>
                </div>
                <button
                  onClick={() => handleDeleteUsers(user.id)}
                  className={styles.deleteButton}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UsersPanel;

