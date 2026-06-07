import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./login.module.css";

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const targetRedirect = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (isAuthenticated) {
            navigate(targetRedirect, { replace: true });
        }
    }, [isAuthenticated, navigate, targetRedirect]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Validasi sederhana
        if (!username || !password) {
            setError("Username dan Password wajib diisi!");
            return;
        }

        const success = login(username, password);
        if (success) {
            // Jika sukses, navigasi ke url asal dengan opsi { replace: true } 
            navigate(targetRedirect, { replace: true });
        } else {
            setError("Username atau password salah! Silakan coba lagi.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <div className={styles.logo}>G</div>
                    <h2 className={styles.title}>E-Gudang</h2>
                    <p className={styles.subtitle}>Sistem Informasi Inventaris</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.errorAlert}>
                            {error}
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.inputLabel}>Username</label>
                        <input
                            type="text"
                            id="username"
                            className={styles.input}
                            placeholder="Masukkan username Anda"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.inputLabel}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="Masukkan password Anda"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    );
}
