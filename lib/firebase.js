// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLsuOaW0SqgDO525E0KeipKkOkTMHqEqw",
  authDomain: "nextjs-firebase-login.firebaseapp.com",
  projectId: "nextjs-firebase-login",
  storageBucket: "nextjs-firebase-login.appspot.com",
  messagingSenderId: "283263543540",
  appId: "1:283263543540:web:8a03e5ac8b6e2dfd4256a1",
  measurementId: "G-3DBW947LD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);