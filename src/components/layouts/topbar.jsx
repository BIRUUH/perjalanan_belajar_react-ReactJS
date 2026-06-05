import styles from './topbar.module.css';

const JudulHalaman = {
    dashboard: 'Dashboard',
    barang: 'Daftar Barang',
    kategori: 'Kategori Barang',
    laporan: 'Daftar Laporan'
};

function TopBar({ halamanAktif }) {
    const sekarang = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return (
        <header className={styles.topbar}>
            <div className={styles.kiri}>
                <h1 className={styles.judulHalaman}>{JudulHalaman[halamanAktif] || 'e-Gudang'}</h1>
                <p className={styles.tanggal}>{sekarang}</p>
            </div>
        </header>
    )
}

export default TopBar;