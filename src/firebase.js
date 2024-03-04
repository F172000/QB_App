//import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB_MizhzKm0KNf1fvpNPXRC6b0XRGEQHM",
  authDomain: "qb-app-67264.firebaseapp.com",
  projectId: "qb-app-67264",
  storageBucket: "qb-app-67264.appspot.com",
  messagingSenderId: "769626605225",
  appId: "1:769626605225:web:f5714aafe5ed881a5e4bb8",
  //databaseURL: "https://qb-app-67264-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);

export const storage = getStorage(firebase);
