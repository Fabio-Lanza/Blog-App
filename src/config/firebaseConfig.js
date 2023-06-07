// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNLcYPQSr7rkt4acJM2p-amnszOsw3ZcA",
  authDomain: "blog-app-bfac7.firebaseapp.com",
  projectId: "blog-app-bfac7",
  storageBucket: "blog-app-bfac7.appspot.com",
  messagingSenderId: "1045181060288",
  appId: "1:1045181060288:web:760425fe5ab6daaadc8925"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//setdataBase and export
export const db = getFirestore(app)