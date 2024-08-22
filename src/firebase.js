// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Optionally, initialize Firebase Analytics if you need it
export const analytics = getAnalytics(app);
