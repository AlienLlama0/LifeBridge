"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  AuthResult,
  RegisterInput,
  SessionUser,
  getSession,
  loginUser,
  logoutUser,
  registerUser,
} from "./auth";

interface AuthContextValue {
  user: SessionUser | null;
  loading: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (input: RegisterInput) => AuthResult;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getSession());
    setLoading(false);
  }, []);

  function login(email: string, password: string) {
    const result = loginUser(email, password);
    if (result.ok && result.user) setUser(result.user);
    return result;
  }

  function register(input: RegisterInput) {
    const result = registerUser(input);
    if (result.ok && result.user) setUser(result.user);
    return result;
  }

  function logout() {
    logoutUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth অবশ্যই AuthProvider এর ভেতরে ব্যবহার করতে হবে");
  return ctx;
}
