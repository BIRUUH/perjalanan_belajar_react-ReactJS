// import { useState } from 'react'
import "./App.css";
import AppLayout from "./components/layouts/AppLayout";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/admin/home";
import Barang from "./pages/admin/barang";
import Kategori from "./pages/admin/kategori";
import NotFound from "./pages/not_found";

const topbarAksi = {
  barang: null,
  kategori: null,
  laporan: null,
  dashboard: null
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  let halamanAktif = 'dashboard';
  if (location.pathname === '/kategori') {
    halamanAktif = 'kategori';
  } else if (location.pathname === '/barang') {
    halamanAktif = 'barang';
  } else if (location.pathname === '/laporan') {
    halamanAktif = 'laporan';
  }

  const handleNavigasi = (key) => {
    navigate(key === 'dashboard' ? '/' : `/${key}`);
  };

  return (
    <AppLayout
      halamanAktif={halamanAktif}
      topbarAksi={topbarAksi[halamanAktif]}
      onNavigasi={handleNavigasi}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/barang" element={<Barang />} />
        <Route path="/kategori" element={<Kategori />} />
        {/* <Route path="/laporan" element={<Laporan />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}