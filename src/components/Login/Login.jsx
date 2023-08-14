import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import React from "react";
import { logIn, signInGoogle } from "../../config/handlers";
import { auth } from "../../config/firebase";

const Login = () => {
const regex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/



  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); 

  const isValidEmail = (email) => {
    // Esta es una validación simple, puedes ampliarla si es necesario
    return regex.test(email);
  };
  

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  // Validación del formato del email
  if (!isValidEmail(loginData.email)) {
    setError("Invalid email format!");
    setTimeout(() => {
      setError(null);
    }, 2000);
    return;
  }
  
  try {
    await logIn(auth, loginData.email, loginData.password);
    setError(null); 
  } catch (error) {
    setError(error.message); 
  }
  setTimeout(() => {
    setError(null);
  }, 2000);
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
      {currentUser === null ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <header>
              <h2>Login</h2>
            </header>
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
          {error && <p className={styles.errorMessage}>{error}</p>}

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
        <div className={styles.containerMessage}>
          <h2>You are logged in yet, <br />go to post or rent</h2>
          <div>
            <Link to="/home">
              <button className={styles.btnRentHouse}>Go to rent a house</button>
            </Link>
            <Link to="/tutorial">
              <button className={styles.btnCreatePost}>Create a post now</button>
            </Link>
          </div>
      </div>
      )}
    </div>
  );
};

export default Login;








/* import { useState } from "react";
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
 */