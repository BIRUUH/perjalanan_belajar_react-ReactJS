import styles from "./AppLayout.module.css";
import Sidebar from "./sidebar";
import TopBar from "./topbar";

function AppLayout({ halamanAktif, topbarAksi, children, onNavigasi }) {
    return (
        <div className={styles.layout}>
            <Sidebar halamanAktif={halamanAktif} onNavigasi={onNavigasi} />
            <div className={styles.main}>
                <TopBar halamanAktif={halamanAktif}>{topbarAksi}</TopBar>
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;