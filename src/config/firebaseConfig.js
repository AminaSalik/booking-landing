// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnnSiOM3gv1HpW1CuK8JcEOb3czOHGguM",
  authDomain: "my-booking-app-604a0.firebaseapp.com",
  projectId: "my-booking-app-604a0",
  storageBucket: "my-booking-app-604a0.firebasestorage.app",
  messagingSenderId: "352476222777",
  appId: "1:352476222777:web:bfe0c07fd1723964a884e8",
  measurementId: "G-PKTZEHF5GZ"
};






const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);