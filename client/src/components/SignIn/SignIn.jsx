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
    image: "",
    banner: "https://fastly.picsum.photos/id/350/900/312.jpg?hmac=2opChRRZ2uKiCmlNIWYbHe3rH2jfQbDIRcfzTwdFGtc",
    language: [],
    username: "",
    email: "",
    password: ""
  })

  const supportedLenguajes = [ "Spanish", "English", "German", "Italian","Based", "French", "Chinesse","Facts"]

  const handleRegisterForm = (event) => {
    setRegister({
      ...register,
      [event.target.name] : event.target.value
    })
  }

  const handleGender = (event) => {
    let gender = event.target.value

    if (gender === "other") {
      setRegister({
        ...register,
        image : "https://i.pinimg.com/564x/48/5d/34/485d3490861e058d4af3c69c7f41eb2d.jpg"
      })
      return
    } 
    setRegister({
        ...register,
        image : `https://randomuser.me/api/portraits/${gender}/${Math.round((Math.random()*98))}.jpg`
    })
}

const handleLang = (event) => {
  const lang = event.target.value

  if (register.language.includes(lang)) {
    setRegister({
      ...register, 
      language : register.language.filter((langIn) => langIn != lang)
    })
  } else {
    setRegister({ ...register, language: [...register.language, lang]})
  }

}

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(register);
    try {
      dispatch(userRegister(register))
      setRegister({
        firstName: "",
        lastName: "",
        country: "",
        image: "",
        language: [],
        username: "",
        email: "",
        password: ""
      })
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
            name='lastName'
            value={register.lastName}
            onChange={handleRegisterForm}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Gender:</label>
          <select onChange={handleGender} >
            <option value="men">Male</option>
            <option value="women">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
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
            name='username'
            value={register.username}
            onChange={handleRegisterForm}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="language">Languages:</label>
          <input type="text" value={register.language} readOnly/>
          <div className={styles.forcedLine}></div>
          <select name="" onChange={handleLang}>
             {
                supportedLenguajes.map((lang) => {
                  return(
                    <option key={lang} value={lang}>{lang}</option>
                  )})
             }
          </select>
        </div>
        <button className={styles.btn} type="submit">Create my account</button>
        <p className={styles.foot}>Already have an account? <Link className={styles.linkfoot} to={"/login"}>Log in</Link></p>
      </form>
    </div>
  );
};

export default SignIn;