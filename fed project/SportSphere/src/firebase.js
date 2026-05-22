import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, getDoc, updateDoc, query, where, setDoc, onSnapshot} from "firebase/firestore";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXh_c2QkKVOnn3nYQGBsThLC0AGyXAO_M",
  authDomain: "fir-basics-2d44a.firebaseapp.com",
  projectId: "fir-basics-2d44a",
  storageBucket: "fir-basics-2d44a.appspot.com",
  messagingSenderId: "839685211872",
  appId: "1:839685211872:web:99b6c95a0cc22fd4deb285"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app);

// Export the initialized services
export { app, auth, firestore, collection, getDocs, addDoc, doc, deleteDoc, getDoc, updateDoc, query, where, signOut, setDoc, onSnapshot};
