import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STOREAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
};

// Initialize Firebase
const yelpCampFirebaseApp = initializeApp(firebaseConfig);

export default yelpCampFirebaseApp;