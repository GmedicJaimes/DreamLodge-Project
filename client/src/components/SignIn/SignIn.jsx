import React, { useState } from 'react';
import styles from "./SignIn.module.css"
import { useDispatch } from 'react-redux';
import { userRegister } from '../../redux/actions';

const SignIn = () => {

  const dispatch = useDispatch()

  const [ register, setRegister ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    username: "",
    Language: ["español"]
  })

  const handleRegisterForm = (event) => {
    setRegister({
      ...register,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userRegister(register))
    //db
  };

  return (
    <div className={styles.mainContainer}>
      <header>
        <h2>Create your account</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name='firstName'
            value={register.firstName}
            onChange={handleRegisterForm}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name='lastName'
            value={register.lastName}
            onChange={handleRegisterForm}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name='email'
            value={register.email}
            onChange={handleRegisterForm}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name='password'
            value={register.password}
            onChange={handleRegisterForm}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Country:</label>
          <input
            type="text"
            id="country"
            name='country'
            value={register.country}
            onChange={handleRegisterForm}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Username:</label>
          <input
            type="text"
            id="username"
            name='username'
            value={register.username}
            onChange={handleRegisterForm}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Languajes:</label>
          <input
            type="text"
            id="Language"
            name='Language'
            value={register.Language}
            onChange={handleRegisterForm}
            required
          />
        </div>
        <button className={styles.btn} type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;