import { createContext, useContext, useMemo, useState } from "react";
import { api, clearSession, getStoredUser, setSession } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());

  async function login(email, password) {
    const session = await api("/auth/login", { method: "POST", body: { email, password } });
    setSession(session);
    setUser(session.user);
    return session.user;
  }

  async function register(payload) {
    const session = await api("/auth/register", { method: "POST", body: payload });
    setSession(session);
    setUser(session.user);
    return session.user;
  }

  function logout() {
    clearSession();
    setUser(null);
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
