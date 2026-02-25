import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkdr3vFnvWzvh9XSuVz9ZximPJHlWYxZA",
  authDomain: "mfundo-dev.firebaseapp.com",
  projectId: "mfundo-dev",
  storageBucket: "mfundo-dev.firebasestorage.app",
  messagingSenderId: "544681716105",
  appId: "1:544681716105:web:8e0de9171ce661bb57d958",
  measurementId: "G-HH9L6H5PR7"
};

initializeApp(firebaseConfig);

const auth = getAuth();

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false); // **important!**
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);