import React, { useState, createContext } from "react";

// Creating contexts
export const UserContext = createContext();
export const AuthContext = createContext();

// User provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Auth provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("authentication");

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
