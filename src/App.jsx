import { useState, useEffect } from 'react';
import Button from './components/button';
import './App.css';

export default function App() {
  // State
  const [count, setCount] = useState(0);
  const [riwayat, setRiwayat] = useState([]);
  const maxCount = 10;

  // Effect
  useEffect(() => {
    document.title = `Angka sekarang: ${count}`;
  }, [count]);

  // EVENT HANDLING
  function handlePenambahan() {
    if (count < maxCount) {
      setCount(count + 1);
      setRiwayat([`Ditambah 1 menjadi ${count + 1}`, ...riwayat]);
    }
  };

  function handlePengurangan() {
    if (count > 0) {
      setCount(count - 1);
      setRiwayat([`Dikurangi 1 menjadi ${count - 1}`, ...riwayat]);
    }
  };

  function handleReset () {
    setCount(0);
    setRiwayat([`Direset menjadi 0`, ...riwayat]);
  };

  // Render
  return (
    <div style={{ padding: '20px'}}>
      <h1>Aplikasi Penghitung</h1>
      <h2>Angka: {count}</h2>

      {/* Menggunakan komponen anak dan mengirim Props */}
      <div>
        {count < maxCount && <Button action={handlePenambahan} label="+1" />}
        
        {count > 0 && <Button action={handlePengurangan} label="-1" />}
        
        <Button action={handleReset} label="Reset" />
      </div>

      <hr className='hr' />

      <h3>Riwayat Log:</h3>
      
      {/* Conditional Rendering untuk List */}
      {riwayat.length === 0 ? (
        <p>Belum ada aktivitas, silakan klik tombol di atas.</p>
      ) : (
        <ul>
          {/* Melakukan mapping array untuk menampilkan list HTML */}
          {riwayat.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      )}
    </div>
  );
}