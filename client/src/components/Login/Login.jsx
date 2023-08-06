import { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from "./Login.module.css"
import React from 'react';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <Link>
                    <p>Forgot password?</p>
                </Link>
                <button className={styles.btn} type="submit">Login</button>
                <p>Don't have an account?</p>
                <Link to={"/signin"}>
                    <p >Sign up now</p>
                </Link>
            </form>
        </div>
    );
};

export default Login;