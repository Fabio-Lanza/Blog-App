// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// need function to connect to firestore
import {getFirestore} from 'firebase/firestore'

//need to setup auth
import {getAuth} from 'firebase/auth'

// need stuff for storage
import {getStorage} from 'firebase/storage'



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

//set dataBase and export
export const db = getFirestore(app)

//activate Auth
export const auth = getAuth(app)

//activate storage
export const storage = getStorage(app)