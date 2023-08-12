import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";
import { auth } from "../../config/firebase";
// import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  isValidName,
  isCountrySelected,
  hasAtLeastOneLanguage,
  hasImageSelected,
  isValidEmail,
  isValidPassword,
} from "./validations";
import {
  signIn,
  signInGoogle,
  registerUserInFirestore,
  doesEmailExistInFirestore,
} from "../../config/handlers";


const SignIn = () => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    country: "",
    languages: [],
    imageFile: [],
  });

  const [errors, setErrors] = useState({});






  const languagesAvailable = [
    "English",
    "Spanish",
    "French",
    "Portuguese",
    "German",
    "Italian",
    "Russian",
  ];

  const navigate = useNavigate();

  const handleRegisterForm = (event) => {
    const { name, value } = event.target;
    if (name === "language") {
      setRegister({
        ...register,
        language: [value],
      });
    } else {
      setRegister({
        ...register,
        [name]: value,
      });
    }
  };
  const handleLanguages = (event) => {
    const lang = event.target.value;

    if (register.languages.includes(lang)) {
      setRegister({
        ...register,
        languages: register.languages.filter((langIn) => langIn !== lang),
      });
    } else {
      setRegister({ ...register, languages: [...register.languages, lang] });
    }
  };
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "imageFile") {
      setRegister({
        ...register,
        [name]: files[0], // Almacena el archivo de imagen en el estado
      });
    } else {
      setRegister({
        ...register,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    try {
      if (!isValidName(register.name)) 
        newErrors.name = "Only letters allowed and up to 20 characters.";
      if (!isValidName(register.lastName)) 
        newErrors.lastName = "Only letters allowed and up to 20 characters.";
      if (!isCountrySelected(register.country)) 
        newErrors.country = "Country selection is mandatory.";
      if (!hasAtLeastOneLanguage(register.languages)) 
        newErrors.languages = "Selecting at least one language.";
      if (!hasImageSelected(register.imageFile)) 
        newErrors.imageFile = "Selecting an image is mandatory.";
      if (!isValidEmail(register.email)) 
        newErrors.email = "Invalid email. No special characters allowed.";
      if (!isValidPassword(register.password)) 
        newErrors.password = "Minimum 8 characters and only letters and numbers.";

      const emailExists = await doesEmailExistInFirestore(register.email);
      if (emailExists) {
        newErrors.email = "This email is already in use.";
        console.log(errors.email);
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setTimeout(() => {
          setErrors({});
        }, 3000);
        return;
      }

      const userCredential = await signIn(auth, register.email, register.password);

      if (userCredential?.user?.uid) {
        const { uid, email } = userCredential.user;

        let imageURL = "";
        if (register.imageFile) {
          const imageRef = ref(storage, `users/${uid}`);
          await uploadBytes(imageRef, register.imageFile);
          imageURL = await getDownloadURL(imageRef);
        }

        const userToSave = {
          uid,
          email,
          name: register.name,
          lastName: register.lastName,
          country: register.country,
          image: imageURL,
          languages: register.languages,
          createdAt: new Date().toLocaleDateString(),
        };
        console.log(userToSave);

        await registerUserInFirestore(uid, userToSave);

        await sendPasswordResetEmail(auth, email, {
          url: "http://localhost:5173/",
          handleCodeInApp: true
      });
      
      try {
        await sendPasswordResetEmail(userCredential.user);
        localStorage.setItem("email", email);
        alert(`¡Correo verificado exitosamente!`);
        navigate(`/home`);
    } catch (error) {
        setLoginLoading(false);
        setLoginError(error.message);
    }

        navigate(`/home`);
      }

      setRegister({
        email: "",
        password: "",
        name: "",
        lastName: "",
        country: "",
        languages: [],
        imageFile: "", 
      });
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    const handleAuthSuccess = (event) => {
      if (event.data === "auth-success") {
        console.log("Autenticación exitosa en la ventana emergente.");
      }
    };

    window.addEventListener("message", handleAuthSuccess);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("message", handleAuthSuccess);
    };
  }, []);
 
  const isFormValid = Object.keys(errors).length === 0 && register.email && register.password; // Add other fields as needed





  


  return (
    <div className={styles.mainContainer}>
      <header>
        <h2>Create your account</h2>
      </header>
      <form onSubmit={handleSubmit} >
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            value={register.name}
            onChange={handleRegisterForm}
            placeholder="Your first name"
          />
          {errors.name && (
            <span className={styles.ErrorValid}>{errors.name} </span>
          )}
        </div>
   

        <div className={styles.formGroup}>
          <input
            type="text"
            name="lastName"
            value={register.lastName}
            onChange={handleRegisterForm}
            placeholder="Your last name"
          />
          {errors.lastName && (
            <span className={styles.ErrorValid}>{errors.lastName} </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <select
            name="country"
            value={register.country}
            onChange={handleRegisterForm}
            placeholder="Country"
            className={` ${
              register.country === "" ? styles.grayText : ""
            }`}
          >
            <option value="" disabled>
              Select Country
            </option>
            <option value="Argentina">Argentina</option>
            <option value="Canada">Canada</option>
            <option value="Chile">Chile</option>
            <option value="USA">USA</option>
            <option value="France">France</option>
            <option value="Spain">Spain</option>
            <option value="Uruguay">Uruguay</option>
          </select>
          {errors.country && (
            <span className={styles.ErrorValid}>{errors.country} </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.forcedLine}></div>
          <select
            name="languages"
            value={register.languages}
            onChange={handleLanguages}
            className={` ${register.languages.length === 0 ? styles.grayText : ""}`}
          >
            <option value="" disabled>
              Select Language
            </option>

            {languagesAvailable.map((lang) => {
              return (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            value={register.languages.join(", ")}
            placeholder="Languages"
          />
          {errors.language && (
            <span className={styles.ErrorValid}>{errors.language} </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input

            onChange={handleChange}
            type="file"
            name="imageFile"
            accept="image/*"
            placeholder="Profile Image"
            className={` ${styles.range}, ${register.imageFile.length === 0 ? styles.grayText : ""}`}


          />
          <span className={styles.imageSelect}>
            {register.imageFile?.name || ""}
          </span>
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={register.email}
            onChange={handleRegisterForm}
            placeholder="Email"
          />
          {errors.email && (
            <span className={styles.ErrorValid}>{errors.email} </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={register.password}
            onChange={handleRegisterForm}
          />
          {errors.password && (
            <span className={styles.ErrorValid}>{errors.password}</span>
          )}
        </div>

        <button className={styles.loginWG} onClick={signInGoogle}>
          Sign In With Google
        </button>
        <br />
        <button
  className={`${styles.btn} ${isFormValid ? "" : styles.disabledBtn}`}
  type="submit"
  disabled={!isFormValid}
>
  Create my account
</button>


        <p className={styles.foot}>
          Already have an account?{" "}
          <Link className={styles.linkfoot} to={"/login"}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

//  import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './SignIn.module.css';
// import { signIn, signInGoogle } from '../../config/handlers';
// import { auth } from '../../config/firebase';
// import  Homepage  from "../../views/Homepage/Homepage"; // No es necesario usar .jsx en la importación
// import { useNavigate } from 'react-router-dom';

// const SignIn = () => {
//   const [register, setRegister] = useState({
//     email: '',
//     password: '',
//   });

//   const navigate = useNavigate();

//   const handleRegisterForm = (event) => {
//     setRegister({
//       ...register,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       signIn(auth, register.email, register.password);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const handleAuthSuccess = (event) => {
//       if (event.data === 'auth-success') {
//         console.log('Autenticación exitosa en la ventana emergente.');
//         navigate(Homepage)

//       }
//     };

//     window.addEventListener('message', handleAuthSuccess);

//     // Limpia el listener cuando el componente se desmonta
//     return () => {
//       window.removeEventListener('message', handleAuthSuccess);

//     };
//   }, []);

//   return (
//     <div className={styles.mainContainer}>
//       <header>
//         <h2>Create your account</h2>
//       </header>
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={register.email}
//             onChange={handleRegisterForm}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={register.password}
//             onChange={handleRegisterForm}
//             required
//           />
//         </div>

//         <button className={styles.loginWG} onClick={signInGoogle}>
//           Sign In With Google
//         </button>
//         <br />
//         <button className={styles.btn} type="submit">
//           Create my account
//         </button>
//         <p className={styles.foot}>
//           Already have an account?{' '}
//           <Link className={styles.linkfoot} to={'/login'}>
//             Log in
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignIn;

// import React, { useState } from 'react';
// import styles from "./SignIn.module.css"
// import { Link } from "react-router-dom"
// import { signIn, signInGoogle } from '../../config/handlers';
// import { auth } from '../../config/firebase';

// const SignIn = () => {

//   const [ register, setRegister ] = useState({
//     // firstName: "",
//     // lastName: "",
//     // country: "",
//     // image: "",
//     // banner: "https://fastly.picsum.photos/id/350/900/312.jpg?hmac=2opChRRZ2uKiCmlNIWYbHe3rH2jfQbDIRcfzTwdFGtc",
//     // language: [],
//     // username: "",
//     email: "",
//     password: ""
//   })

//   const handleRegisterForm = (event) => {
//     setRegister({
//       ...register,
//       [event.target.name] : event.target.value
//     })
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     try {
//       signIn(auth, register.email, register.password)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // const supportedLenguajes = [ "Spanish", "English", "German", "Italian","Based", "French", "Chinesse","Facts"]

// //   const handleGender = (event) => {
// //     let gender = event.target.value

// //     if (gender === "other") {
// //       setRegister({
// //         ...register,
// //         image : "https://i.pinimg.com/564x/48/5d/34/485d3490861e058d4af3c69c7f41eb2d.jpg"
// //       })
// //       return
// //     }
// //     setRegister({
// //         ...register,
// //         image : `https://randomuser.me/api/portraits/${gender}/${Math.round((Math.random()*98))}.jpg`
// //     })
// // }

// // const handleLang = (event) => {
// //   const lang = event.target.value

// //   if (register.language.includes(lang)) {
// //     setRegister({
// //       ...register,
// //       language : register.language.filter((langIn) => langIn != lang)
// //     })
// //   } else {
// //     setRegister({ ...register, language: [...register.language, lang]})
// //   }

// // }

//   return (
//     <div className={styles.mainContainer}>
//       <header>
//         <h2>Create your account</h2>
//       </header>
//       <form onSubmit={handleSubmit}>
//         {/* <div className={styles.formGroup}>
//           <label htmlFor="firstName">First Name:</label>
//           <input
//             type="text"
//             name='firstName'
//             value={register.firstName}
//             onChange={handleRegisterForm}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="lastName">Last Name:</label>
//           <input
//             type="text"
//             name='lastName'
//             value={register.lastName}
//             onChange={handleRegisterForm}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="gender">Gender:</label>
//           <select onChange={handleGender} >
//             <option value="men">Male</option>
//             <option value="women">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div> */}
//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={register.email}
//             onChange={handleRegisterForm}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={register.password}
//             onChange={handleRegisterForm}
//             required
//           />
//         </div>
//         {/* <div className={styles.formGroup}>
//           <label htmlFor="phone">Country:</label>
//           <input
//             type="text"
//             name='country'
//             value={register.country}
//             onChange={handleRegisterForm}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="phone">Username:</label>
//           <input
//             type="text"
//             name='username'
//             value={register.username}
//             onChange={handleRegisterForm}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="language">Languages:</label>
//           <input type="text" value={register.language} readOnly/>
//           <div className={styles.forcedLine}></div>
//           <select name="" onChange={handleLang}>
//              {
//                 supportedLenguajes.map((lang) => {
//                   return(
//                     <option key={lang} value={lang}>{lang}</option>
//                   )})
//              }
//           </select>
//         </div> */}
//         <button className={styles.loginWG} onClick={signInGoogle}>Sign In With Google</button>
//         <br />
//         <button className={styles.btn} type="submit">Create my account</button>
//         <p className={styles.foot}>Already have an account? <Link className={styles.linkfoot} to={"/login"}>Log in</Link></p>
//       </form>
//     </div>
//   );
// };

// export default SignIn;
