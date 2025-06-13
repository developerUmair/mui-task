import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedProfile = sessionStorage.getItem("profile");

    if (storedToken) setToken(storedToken);
    if (storedProfile) setProfile(JSON.parse(storedProfile));
  }, []);

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("profile");
    setToken(null);
    setProfile(null);
  };

  const saveProfile = (user) => {
    sessionStorage.setItem("profile", JSON.stringify(user));
    setProfile(user);
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, profile, setProfile: saveProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
