// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLt1KZ6vn57J2t5t0DwV4I8BvVR950TFc",
  authDomain: "twitter-clone-creator-saurabh.firebaseapp.com",
  projectId: "twitter-clone-creator-saurabh",
  storageBucket: "twitter-clone-creator-saurabh.appspot.com",
  messagingSenderId: "91371797724",
  appId: "1:91371797724:web:54c6ffb7ed84071c9b8819",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
