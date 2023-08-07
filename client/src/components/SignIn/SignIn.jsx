import React, { useState } from 'react';
import styles from "./SignIn.module.css"
import { useDispatch } from 'react-redux';
import { userRegister } from '../../redux/actions';
import { Link } from "react-router-dom"

const SignIn = () => {

  const dispatch = useDispatch()

  const [ register, setRegister ] = useState({
    firstName: "",
    lastName: "",
    country: "",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    banner: "https://fastly.picsum.photos/id/350/900/312.jpg?hmac=2opChRRZ2uKiCmlNIWYbHe3rH2jfQbDIRcfzTwdFGtc",
    language: ["español"],
    username: "",
    email: "",
    password: ""
  })

  const handleRegisterForm = (event) => {
    setRegister({
      ...register,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(register);
    try {
      dispatch(userRegister(register))
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    }
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
            // id="firstName"
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
            // id="lastName"
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
            // id="email"
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
            // id="password"
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
            // id="country"
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
            // id="username"
            name='username'
            value={register.username}
            onChange={handleRegisterForm}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="language">Languajes:</label>
          <input
            type="text"
            // id="language"
            name='language'
            value={register.language}
            onChange={handleRegisterForm}
            // required
          />
        </div>
        <button className={styles.btn} type="submit">Create my account</button>
        <p className={styles.foot}>Already have an account? <Link className={styles.linkfoot} to={"/login"}>Log in</Link></p>
      </form>
    </div>
  );
};

export default SignIn;