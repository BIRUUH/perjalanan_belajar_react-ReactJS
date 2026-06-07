/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Simulasi login untuk mengetes route protected
    const login = (username, password) => {
        if (username === "admin" && password === "admin123") {
            // Set status di localStorage
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify({ username: "Admin Gudang", role: "Administrator" }));
            
            // Update state
            setIsAuthenticated(true);
            setUser({ username: "Master Admin", role: "Administrator" });
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth harus digunakan di dalam AuthProvider");
    }
    return context;
};