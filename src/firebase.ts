import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
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
export const db = getDatabase(app);
