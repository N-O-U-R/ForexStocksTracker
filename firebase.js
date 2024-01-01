// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1z3isFfPiqgWzYVqJN6V2At9vQd8oD9U",
  authDomain: "pricetracker-60698.firebaseapp.com",
  projectId: "pricetracker-60698",
  storageBucket: "pricetracker-60698.appspot.com",
  messagingSenderId: "668965882015",
  appId: "1:668965882015:web:bdd2e6fa2ad80ef3f1baaa",
  measurementId: "G-H3G3DM8XSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore();

export {
  auth,
  db
}