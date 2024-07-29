// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAdlSFuxIw0Ux8Wax8-l54nodkK4CrnM6Q",
    authDomain: "e-commerceproject-iti.firebaseapp.com",
    databaseURL: "https://e-commerceproject-iti-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "e-commerceproject-iti",
    storageBucket: "e-commerceproject-iti.appspot.com",
    messagingSenderId: "593295862110",
    appId: "1:593295862110:web:707f067982f5a7fd42c7cf"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const database = getDatabase();


// Export the initialized services
export { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, database, ref, set, get, child };