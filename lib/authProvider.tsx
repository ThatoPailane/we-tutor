"use client";
import React, { FC, useState, useEffect, createContext, useContext } from "react";
import { User, onIdTokenChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { deleteCookie, setCookie } from "cookies-next";

interface AuthContextType {
  user: User | null;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
});

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        setToken(null);
        deleteCookie("token");
        router.push('/');
      } else {
        const token = await user.getIdToken();
        setUser(user);
        setToken(token);
        setCookie("token", token, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60, // 1 hour - matches Firebase token expiry
        });
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Refresh token every 55 minutes (before 1 hour expiry)
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        setToken(token);
        setCookie("token", token, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60,
        });
      }
    }, 55 * 60 * 1000); // 55 minutes

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);