// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUYQG-XNMTw2ymudDBQerboSaRyWfb6AY",
  authDomain: "farmers-goods-2024.firebaseapp.com",
  projectId: "farmers-goods-2024",
  storageBucket: "farmers-goods-2024.appspot.com",
  messagingSenderId: "22788546976",
  appId: "1:22788546976:web:4e256460c8916088c2c4c5",
  measurementId: "G-ZVV9PE0BK0"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);