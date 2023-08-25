import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "project-728bb.firebaseapp.com",
  projectId: "project-728bb",
  storageBucket: "project-728bb.appspot.com",
  messagingSenderId: "946069755767",
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: "G-76HF9KWZHY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
