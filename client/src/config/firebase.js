// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

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
