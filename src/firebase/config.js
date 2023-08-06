// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS5XOm97xFGMpHarnkfv824ogxExkeSp8",
  authDomain: "proman-app-3c411.firebaseapp.com",
  projectId: "proman-app-3c411",
  storageBucket: "proman-app-3c411.appspot.com",
  messagingSenderId: "396883531248",
  appId: "1:396883531248:web:ae099564f1ed1855f33935"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }