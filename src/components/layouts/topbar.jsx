import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./topbar.module.css";

const JudulHalaman = {
    dashboard: 'Dashboard',
    barang: 'Daftar Barang',
    kategori: 'Kategori Barang',
    laporan: 'Daftar Laporan'
};

function TopBar({ halamanAktif }) {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const sekarang = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Menutup dropdown jika user mengklik di luar area menu dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        setIsOpen(false);
        if (confirm("Apakah Anda yakin ingin keluar?")) {
            logout();
        }
    };

    return (
        <header className={styles.topbar}>
            <div className={styles.kiri}>
                <h1 className={styles.judulHalaman}>{JudulHalaman[halamanAktif] || 'e-Gudang'}</h1>
                <p className={styles.tanggal}>{sekarang}</p>
            </div>

            <div className={styles.kanan} ref={dropdownRef}>
                <div className={styles.profileToggle} onClick={() => setIsOpen(!isOpen)}>
                    <div className={styles.avatar}>
                        {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user?.username || 'Pengguna'}</span>
                        <span className={styles.userRole}>{user?.role || 'Staff'}</span>
                    </div>
                    <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>▼</span>
                </div>

                {/* Elemen Dropdown Menu */}
                {isOpen && (
                    <div className={styles.dropdown}>
                        <div className={styles.dropdownHeader}>
                            <p className={styles.dropdownName}>{user?.username || 'Pengguna'}</p>
                            <p className={styles.dropdownRole}>{user?.role || 'Staff'}</p>
                        </div>
                        <div className={styles.divider}></div>
                        
                        <button 
                            className={styles.dropdownItem} 
                            onClick={() => { setIsOpen(false); alert('Fitur Profil sedang dikembangkan!'); }}
                        >
                            👤 Info Profil
                        </button>
                        
                        <button className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={handleLogout}>
                            🚪 Keluar (Logout)
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default TopBar;