// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // <-- Importing storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAayY2DfnFZIXm3xrZr0GwK3NG0el128zA",
  authDomain: "resumemaker-63c6c.firebaseapp.com",
  projectId: "resumemaker-63c6c",
  storageBucket: "resumemaker-63c6c.appspot.com",
  messagingSenderId: "640858555782",
  appId: "1:640858555782:web:e998096d64bb0261dad807"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);  // <-- Initializing storage

export { app, auth, db, storage };  // <-- Exporting storage
