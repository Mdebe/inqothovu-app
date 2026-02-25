import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkdr3vFnvWzvh9XSuVz9ZximPJHlWYxZA",
  authDomain: "mfundo-dev.firebaseapp.com",
  projectId: "mfundo-dev",
  storageBucket: "mfundo-dev.firebasestorage.app",
  messagingSenderId: "544681716105",
  appId: "1:544681716105:web:8e0de9171ce661bb57d958",
  measurementId: "G-HH9L6H5PR7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);