import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
