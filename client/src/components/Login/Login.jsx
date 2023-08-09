import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import React from "react";
import { logIn, signInGoogle } from "../../config/handlers";
import { auth } from "../../config/firebase";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn(auth, loginData.email, loginData.password);
  };

  const [currentUser, setCurrentUser] = React.useState(auth.currentUser);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className={styles.mainContainer}>
      <header>
        <h2>Login</h2>
      </header>
      {currentUser === null ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Link>
            <p className={styles.small}>Forgot password?</p>
          </Link>
          <button className={styles.btnLogin} type="submit">
            Login
          </button>
          <button
            className={styles.loginWG}
            type="button"
            onClick={() => signInGoogle()}
          >
            Login with Google
          </button>
          <Link>
          </Link>
          <p className={styles.small}>Dont have an account? </p>

          <Link to={"/signin"}>
            <button className={styles.btnCreateAcc}>Sign up now</button>
          </Link>

        </form>
      ) : (
        <h1>ya esta loggeado parse</h1>
      )}
    </div>
  );
};

export default Login;
