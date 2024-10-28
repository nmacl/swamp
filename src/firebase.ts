// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmhtNMadMUTolMAD5g3doi6nEr4-Wapy8",
  authDomain: "swamp-45b5a.firebaseapp.com",
  projectId: "swamp-45b5a",
  storageBucket: "swamp-45b5a.appspot.com",
  messagingSenderId: "748265867524",
  appId: "1:748265867524:web:f6580e82c764cb313ae851",
  measurementId: "G-HJK8PF2462"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);