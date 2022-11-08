// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbZJLaS0gdLbNkDwYx2W28tSYcEIZh0-8",
  authDomain: "securisation-2ae53.firebaseapp.com",
  projectId: "securisation-2ae53",
  storageBucket: "securisation-2ae53.appspot.com",
  messagingSenderId: "835763710871",
  appId: "1:835763710871:web:23f1a193ce7516791d72d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);