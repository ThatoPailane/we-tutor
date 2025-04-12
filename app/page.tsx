'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/backend/auth";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push("/dashboard"); // Change this to the actual page you want to redirect to
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="auth-container">
        <h2>Login to Tick-it</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="student@school.edu"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>
            Don't have an account? <Link href="/sign-up">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
