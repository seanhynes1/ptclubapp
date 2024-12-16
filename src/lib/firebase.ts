import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFTMn5Yp_MaX2KYh-jk4z5_v4-RfFh2AM",
  authDomain: "pt-club-app-fad57.firebaseapp.com",
  projectId: "pt-club-app-fad57",
  storageBucket: "pt-club-app-fad57.firebasestorage.app",
  messagingSenderId: "1000630438498",
  appId: "1:1000630438498:web:c98e4381025dc6b7de9f3b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);