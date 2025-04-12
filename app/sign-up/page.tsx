'use client'
import { login, signUp } from "@/backend/auth";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { useState } from "react";

export default function Home() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const res = await signUp(email, password, username, fullname);
        if (res.success) {
          // ✅ Do the redirect on the client
          router.push('/dashboard');
        } else {
          // Show error message
          console.error(res.error);
        }
      };
    return (
        <div className="body">
        <div className="auth-container">
            <h2>Create an Account</h2>
            <form onSubmit={onSubmit}>
                <label>Fullname</label>
                <input type="fullname" id="fullname" placeholder="John Doe" required value={fullname}
                onChange={(e) => setFullname(e.target.value)}/>

                <label>Username</label>
                <input type="username" id="username" placeholder="thbueajgb024" required value={username}
                onChange={(e) => setUsername(e.target.value)}/>

                <label>Email</label>
                <input type="email" id="email" placeholder="student@school.edu" required value={email}
                onChange={(e) => setEmail(e.target.value)}/>

                <label>Password</label>
                <input type="password" id="password" placeholder="Enter your password" required value={password}
                onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit" onClick={() => login(email, password)}>{loading ? 'Loading...' : 'Sign Up'}</button>
                <p>Already have an account? <Link href="/">Login</Link></p>
            </form>
        </div>
        </div>
    );
}
