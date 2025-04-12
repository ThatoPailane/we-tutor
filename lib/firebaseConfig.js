import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAEcRnw7taFfoErbdFscYqbzMH9Ik6_a7E",
    authDomain: "tick-it-5fbf4.firebaseapp.com",
    projectId: "tick-it-5fbf4",
    storageBucket: "tick-it-5fbf4.firebasestorage.app",
    messagingSenderId: "189060651634",
    appId: "1:189060651634:web:9f0606957f3889b4f800eb",
    measurementId: "G-X0PCCL9DC3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { app };
export { db };