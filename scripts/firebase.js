import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBETTxIGPFcBZQG0UIvx-rAWEp3EPJEEpY',
  authDomain: 'project-728bb.firebaseapp.com',
  projectId: 'project-728bb',
  storageBucket: 'project-728bb.appspot.com',
  messagingSenderId: '946069755767',
  appId: '1:946069755767:web:6dd30afaf29be7e10eb372',
  measurementId: 'G-76HF9KWZHY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
