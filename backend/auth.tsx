import { auth } from '../lib/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const signUp = (email: any, password: any) => {
    const user = createUserWithEmailAndPassword(auth, email, password);
    return user;
}

export const login = (email: any, password: any) => {
    const user = signInWithEmailAndPassword(auth, email, password);
    return user;
}

export const logout = () => signOut(auth);
