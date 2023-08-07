import { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from "./Login.module.css"
import React from 'react';
import { useDispatch } from "react-redux"



const Login = () => {

    const dispatch = useDispatch()


    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange  = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name] : event.target.value
    })};

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(userLogin(loginData))
    };

    return (
        <div className={styles.mainContainer}>
            <header>
                <h2>Login</h2>
            </header>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name='email'
                        value={loginData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Link>
                    <p className={styles.small}>Forgot password?</p>
                </Link>
                    <button className={styles.btnLogin} type="submit">Login</button>
                <Link to={"/signin"}>
                    <button className={styles.btnCreateAcc}>Sign up now</button>
                </Link>
            </form>
        </div>
    );
};

export default Login;