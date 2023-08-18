import React from 'react';
import styles from './UsersPanel.module.css';

const UsersPanel = ({ users, handleDeleteUsers }) => {
  return (
    <div className={styles.panelContainer}>
      <h2>Usuarios:</h2>
      {users.length > 0 && (
        <div className={styles.userListContainer}>
          <ul className={styles.userList} >
            {users.map((user) => (
              <li key={user.id} className={styles.userListItem}>
                <div>
                  <img src={user.image} alt="" />
                  <p>Nombre: {user.name}</p>
                  <p>Apellido: {user.lastName}</p>
                  <p>País:  {user.country}</p>
                  <p>Create: {user.createdAt}</p>
                  <span>Email: {user.email}</span>
                </div>
                <button
                  onClick={() => handleDeleteUsers(user.id)}
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

export default UsersPanel;

