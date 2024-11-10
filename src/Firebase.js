// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyADs4UzryLrrNuoDI3MnTHJuq_IVf4VO9o",
  authDomain: "jewelry-af3b9.firebaseapp.com",
  projectId: "jewelry-af3b9",
  storageBucket: "jewelry-af3b9.firebasestorage.app",
  messagingSenderId: "1040093468025",
  appId: "1:1040093468025:web:4322a0fe81451f3239cba8",
  measurementId: "G-HCFMRP67HY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Realtime Database