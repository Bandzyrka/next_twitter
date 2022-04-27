import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhO1vsVxhT3aUXrREFAHFN1sKjQUfSfGE",
  authDomain: "nexttwitter-63534.firebaseapp.com",
  projectId: "nexttwitter-63534",
  storageBucket: "nexttwitter-63534.appspot.com",
  messagingSenderId: "974174772814",
  appId: "1:974174772814:web:9a4125cd96c3b264672d1f",
  measurementId: "G-09VFJERJ6X"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore();
  const storage = getStorage();

  export default app
  export { db, storage}

