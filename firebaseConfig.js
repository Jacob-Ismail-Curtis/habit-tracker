import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmKkd8K_JlHRRdK0ZNpVRJvsPZ80UzQHQ",
  authDomain: "habittracker-c2061.firebaseapp.com",
  projectId: "habittracker-c2061",
  storageBucket: "habittracker-c2061.appspot.com",
  messagingSenderId: "1092188225757",
  appId: "1:1092188225757:web:c21cef782d33db4822db34",
  measurementId: "G-B1M11TEZF7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };