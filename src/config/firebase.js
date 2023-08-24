import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
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

// const firebaseConfig = {
//   apiKey: "AIzaSyDCEXGxA5qGuDPp53bJDgHnr-ARv7s4A7s",
//   authDomain: "dreamlodgeprueba.firebaseapp.com",
//   projectId: "dreamlodgeprueba",
//   storageBucket: "dreamlodgeprueba.appspot.com",
//   messagingSenderId: "937226421893",
//   appId: "1:937226421893:web:13d4f51541cebda5bb8bec",
//   measurementId: "G-6TB25EM3W8"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC-Bb1urfKlXTTVkPTgO-gCcsHKaHWtloM",
  authDomain: "foodiesitelab-99c62.firebaseapp.com",
  projectId: "foodiesitelab-99c62",
  storageBucket: "foodiesitelab-99c62.appspot.com",
  messagingSenderId: "195800164351",
  appId: "1:195800164351:web:74dbc6e62e9282c9cca9ca",
  measurementId: "G-XG83CW4362"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDv9lt0RdAH8dPiniuSKSj5mpDinXynzwg",
//   authDomain: "playground-b5cbd.firebaseapp.com",
//   databaseURL: "https://playground-b5cbd-default-rtdb.firebaseio.com",
//   projectId: "playground-b5cbd",
//   storageBucket: "playground-b5cbd.appspot.com",
//   messagingSenderId: "850493221990",
//   appId: "1:850493221990:web:3d3e6ce4ac0416311c11a7"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCEK5pyVCxEC9S4NUlmKGwD0qWEsBreEDU",
//   authDomain: "salvadora-90d6f.firebaseapp.com",
//   projectId: "salvadora-90d6f",
//   storageBucket: "salvadora-90d6f.appspot.com",
//   messagingSenderId: "105994431952",
//   appId: "1:105994431952:web:f13fdd0d6ac739d6ce5dd5",
//   measurementId: "G-K3ETDZDBC6"
// };

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const facebookProvider = new FacebookAuthProvider();