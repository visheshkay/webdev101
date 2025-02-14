import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHkMPcbmLrLkDGcGfsKm4Zz4Pp8g8DO0k",
  authDomain: "eventplanner-2a17a.firebaseapp.com",
  projectId: "eventplanner-2a17a",
  storageBucket: "eventplanner-2a17a.firebasestorage.app",
  messagingSenderId: "240614341561",
  appId: "1:240614341561:web:0c21b2d8ff588a161b1468",
  measurementId: "G-TCLR65VPZC"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };