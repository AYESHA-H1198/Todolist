// src/Config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCl905_XoFAV0_61LrbzQs7S8_swwMWmDQ',
  authDomain: 'todolist-octanet.firebaseapp.com',
  projectId: 'todolist-octanet',
  storageBucket: 'todolist-octanet.appspot.com',
  messagingSenderId: '736416596753',
  appId: '1:736416596753:web:89200d8898be6edeb042b0',
  measurementId: 'G-2NGL86R8MT'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
