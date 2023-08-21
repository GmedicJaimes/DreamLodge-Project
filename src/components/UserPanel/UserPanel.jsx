import React from 'react';
import styles from './UsersPanel.module.css';

const UsersPanel = ({ users, handleDeleteUsers }) => {
  return (
    <div className={styles.panelContainer}>
      <h2>Users:</h2>
      <div className={styles.userListItemName}>
        <p>Name </p>
        <p>Lastname </p>
        <p>Country </p>
        <p>Create </p>
        <span>Email </span>
        {/* <p>Tipo: {property.type}</p> */}
      </div>
      {users.length > 0 && (
        <div className={styles.userListContainer}>
          <ul className={styles.userList} >
            {users.map((user) => (
              <li key={user.id} className={styles.userListItem}>
                <div>
                  <img src={user.image} alt="perfil" />
                  <p>{user.name}</p>
                  <p>{user.lastName}</p>
                  <p>{user.country}</p>
                  <p>{user.createdAt}</p>
                  {/* <p>{user.id}</p> */}
                  <span>{user.email}</span>
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

