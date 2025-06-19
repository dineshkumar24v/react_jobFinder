
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCHMJMsbo4mqQZ6OSFEEfiyESrrxTb5q2s",
  authDomain: "job-finder-d.firebaseapp.com",
  projectId: "job-finder-d",
  storageBucket: "job-finder-d.firebasestorage.app",
  messagingSenderId: "323365003060",
  appId: "1:323365003060:web:7a5c8e3b4cfb151bf24f61",
  measurementId: "G-6JNDK55DCD"
};

// Initialize Firebase
// initializeApp ---> is a firebase method that take your configuration details
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app)

export const db = getFirestore(app)