/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem("token");
    });

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (username, password) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (username === "admin" && password === "admin123") {
            // Simpan dummy token di localStorage
            const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluaXN0cmF0b3IifQ.signature";
            localStorage.setItem("token", dummyToken);
            
            const userData = { username: "Admin Gudang", role: "Administrator" };
            localStorage.setItem("user", JSON.stringify(userData));
            
            // Update state
            setIsAuthenticated(true);
            setUser(userData);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("token");
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