import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyCOWQ0Tk85MwglAsgd9avK24O89pUyQisk",
  // authDomain: "chatty-dfeff.firebaseapp.com",
  // projectId: "chatty-dfeff",
  // storageBucket: "chatty-dfeff.appspot.com",
  // messagingSenderId: "53153122013",
  // appId: "1:53153122013:web:55eedbc87d40c2c9f4fd34"

  apiKey: "AIzaSyCivmHHTVT7FpFT0xAJpI89Rvji64l5s1c",
  authDomain: "gillu3-o.firebaseapp.com",
  projectId: "gillu3-o",
  storageBucket: "gillu3-o.appspot.com",
  messagingSenderId: "527830563448",
  appId: "1:527830563448:web:ad0a080c1393ea6a0acb8d",
  measurementId: "G-EZNGW8QX6Y",
  databaseURL: "https://gillu3-o-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
