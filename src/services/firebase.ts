// Firebase Cloud Firestore Config & Integration Helper
// Replace with your actual Firebase project config from Firebase Console

export const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyDEMO_KEY_SMARTEVAC",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "smartevac-ai.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "smartevac-ai",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "smartevac-ai.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "849201948201",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:849201948201:web:a1b2c3d4e5f6"
};

/*
To connect live Firebase Firestore in production:
1. Install firebase SDK: npm install firebase
2. Uncomment the following code:

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const fetchFirestoreShipments = async () => {
  const querySnapshot = await getDocs(collection(db, "shipments"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
*/
