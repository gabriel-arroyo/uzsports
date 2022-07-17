import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoSt5MX460l1HpklUaXh4Ax6r8nw0hLdk",
  authDomain: "uzsports.firebaseapp.com",
  databaseURL: "https://uzsports-default-rtdb.firebaseio.com",
  projectId: "uzsports",
  storageBucket: "uzsports.appspot.com",
  messagingSenderId: "972184072963",
  appId: "1:972184072963:web:4a59b0415316fe29862f36",
  measurementId: "G-9L8YVZ1VEE",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
