// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_5VDMNqFl9_f0iXx1sn0r1XYzxDBhxw8",
  authDomain: "erpnext-186e3.firebaseapp.com",
  projectId: "erpnext-186e3",
  storageBucket: "erpnext-186e3.firebasestorage.app",
  messagingSenderId: "500831137452",
  appId: "1:500831137452:web:aa247ef4a9449eb82bf909",
  measurementId: "G-6P3DK6W6Z5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);