// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import getStorage

const firebaseConfig = {
  apiKey: "AIzaSyBET_9wx91mtSmNTwRKArEEenOq5k2VoMY",
  authDomain: "sggconnect-ab29d.firebaseapp.com",
  projectId: "sggconnect-ab29d",
  storageBucket: "sggconnect-ab29d.appspot.com",
  messagingSenderId: "412267552927",
  appId: "1:412267552927:web:2b66fa3a0505eca03502aa",
  measurementId: "G-ZY7DM605MV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize storage

export { auth, storage }; // Export auth and storage
