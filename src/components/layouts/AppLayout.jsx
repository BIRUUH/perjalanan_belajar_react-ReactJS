import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./AppLayout.module.css";
import Sidebar from "./sidebar";
import TopBar from "./topbar";

export default function AppLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    let halamanAktif = 'dashboard';
    if (location.pathname.startsWith('/kategori')) halamanAktif = 'kategori';
    else if (location.pathname.startsWith('/barang')) halamanAktif = 'barang';
    else if (location.pathname.startsWith('/laporan')) halamanAktif = 'laporan';

    const handleNavigasi = (key) => {
        navigate(key === 'dashboard' ? '/' : `/${key}`);
    };

    return (
        <div className={styles.layout}>
            <Sidebar halamanAktif={halamanAktif} onNavigasi={handleNavigasi} />
            <div className={styles.main}>
                <TopBar halamanAktif={halamanAktif} />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
