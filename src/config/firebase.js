// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyC_YrDe0cR-pUS5vk_QvZ6Z28f_lylJCJ8",
//   authDomain: "pruebadeploy-8f459.firebaseapp.com",
//   projectId: "pruebadeploy-8f459",
//   storageBucket: "pruebadeploy-8f459.appspot.com",
//   messagingSenderId: "191809447425",
//   appId: "1:191809447425:web:30b9622277fc63f85b4200",
//   measurementId: "G-KK3JWKX9LE"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDCEXGxA5qGuDPp53bJDgHnr-ARv7s4A7s",
  authDomain: "dreamlodgeprueba.firebaseapp.com",
  projectId: "dreamlodgeprueba",
  storageBucket: "dreamlodgeprueba.appspot.com",
  messagingSenderId: "937226421893",
  appId: "1:937226421893:web:13d4f51541cebda5bb8bec",
  measurementId: "G-6TB25EM3W8"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app);
export const  facebookProvider = new FacebookAuthProvider()

