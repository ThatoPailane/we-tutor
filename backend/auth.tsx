// lib/auth.js
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const signUp = (email: any, password: any) => createUserWithEmailAndPassword(auth, email, password);
export const login = (email: any, password: any) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
