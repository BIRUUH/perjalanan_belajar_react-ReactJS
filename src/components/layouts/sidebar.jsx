import styles from "./sidebar.module.css";

const navItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "barang", label: "Daftar Barang" },
  { key: "kategori", label: "Kategori Barang" },
  { key: "laporan", label: "Daftar Laporan" },
];

export default function Sidebar({ halamanAktif, onNavigasi }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.merk}>
        <div className={styles.logo}>W</div>
        <div>
          <span className={styles.namaMerk}>E-Gudang</span>
        </div>
      </div>

      {/* Navigasi */}
      <nav className={styles.nav}>
        <p className={styles.navLabel}>{"MENU"}</p>
        {navItems.map((item) => (
          <button
            key={item.key}
            className={[
              styles.navItem,
              halamanAktif === item.key ? styles.active : "",
            ].join(" ")}
            onClick={() => onNavigasi(item.key)}
            title={item.label}
          >
            <span className={styles.navLabel2}>{item.label}</span>
            {halamanAktif === item.key && (
              <span className={styles.navIndicator} />
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
