import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.css';
import { signIn, signInGoogle } from '../../config/handlers';
import { auth } from '../../config/firebase';
import  Homepage  from "../../views/Homepage/Homepage"; // No es necesario usar .jsx en la importación
import { useNavigate } from 'react-router-dom';




const SignIn = () => {
  const [register, setRegister] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    country: '', // Por defecto, pero puede cambiarse
    languages: [], // Por defecto, pero puede añadirse más idiomas
    image: '', // Puede ser una URL o un archivo subido
    banner: '',
  });
  const languagesAvailable = ["English", "Spanish", "French", "Portuguese", "German", "Italian", "Russian"];

  const navigate = useNavigate();


  const handleRegisterForm = (event) => {
    const { name, value } = event.target;
    if (name === 'language') {
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
            languages: register.languages.filter((langIn) => langIn !== lang)
        });
    } else {
        setRegister({ ...register, languages: [...register.languages, lang] });
    }
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      signIn(auth, register.email, register.password);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleAuthSuccess = (event) => {
      if (event.data === 'auth-success') {
        console.log('Autenticación exitosa en la ventana emergente.');
        navigate(Homepage)

      }
    };

    window.addEventListener('message', handleAuthSuccess);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('message', handleAuthSuccess);

    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <header>
        <h2>Create your account</h2>
      </header>
      <form onSubmit={handleSubmit}>

      <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            value={register.name}
            onChange={handleRegisterForm}
            required
            placeholder='Your first name'
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="lastName"
            value={register.lastName}
            onChange={handleRegisterForm}
            required
            placeholder='Your last name'

          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="country"
            value={register.country}
            onChange={handleRegisterForm}
            required
            placeholder='Country'
          />
        </div>

        <div className={styles.formGroup}>
    
</div>

<div className={styles.formGroup}>

    <div className={styles.forcedLine}></div>
    <select name="languages" value={register.languages} onChange={handleLanguages}>
    <option value="" disabled>
      Select Language
    </option>

        {
          
            languagesAvailable.map((lang) => {
                return (
                    <option key={lang} value={lang}>{lang}</option>
                );
            })
        }
    </select>

</div>
<div className={styles.formGroup}>

<input type="text" value={register.languages.join(', ')}placeholder='Languages'/>

</div>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={register.email}
            onChange={handleRegisterForm}
            placeholder='Email'
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={register.password}
            onChange={handleRegisterForm}
            required
          />
        </div>

        <button className={styles.loginWG} onClick={signInGoogle}>
          Sign In With Google
        </button>
        <br />
        <button className={styles.btn} type="submit">
          Create my account
        </button>
        <p className={styles.foot}>
          Already have an account?{' '}
          <Link className={styles.linkfoot} to={'/login'}>
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