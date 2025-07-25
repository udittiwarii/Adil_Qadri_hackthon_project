// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.loginTime) {
      const expireTime = 60 * 60 * 1000; // 1 hour
      if (Date.now() - storedUser.loginTime < expireTime) {
        setUser(storedUser);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {
    const userObj = {
      ...userData,
      loginTime: Date.now(),
    };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
