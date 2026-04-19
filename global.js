// global.js

// 1. TARUH CONFIG DI SINI (Ganti dengan data asli dari Firebase Console-mu)
const firebaseConfig = {
  apiKey: "AIzaSyCbPRP947C2OwPMaLSqWfbFCOLEkBBrx8c",
  authDomain: "edulink-v2.firebaseapp.com",
  databaseURL: "https://edulink-v2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "edulink-v2",
  storageBucket: "edulink-v2.firebasestorage.app",
  messagingSenderId: "450247433954",
  appId: "1:450247433954:web:c3875535c4d1edc9a388bb"
};

// 2. FUNGSI LOAD PROFILE (Tetap ada)
function loadProfile() {
    const nama = localStorage.getItem('user_nama');
    const id = localStorage.getItem('user_id');

    if (!nama || !id) {
        // Cek apakah kita tidak sedang di halaman login agar tidak looping redirect
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
        return;
    }

    const elNama = document.getElementById('profile-name');
    const elId = document.getElementById('profile-id');

    if (elNama) elNama.innerText = nama;
    if (elId) elId.innerText = (id.startsWith('D') || id.startsWith('d') ? "NIDN: " : "NIM: ") + id;
}

// 3. FUNGSI LOGOUT
window.logout = function() {
    if (confirm("Yakin mau keluar?")) {
        localStorage.clear(); // Bersihkan semua biar aman
        window.location.href = 'index.html';
    }
}

// Otomatis jalan
document.addEventListener('DOMContentLoaded', loadProfile);

window.renderSidebarKelas = function() {
    const sidebarContainer = document.getElementById('daftar-kelas-sidebar');
    if (!sidebarContainer) return;

    // Ambil data dari localStorage
    const kelasSaya = JSON.parse(localStorage.getItem('kelas_mahasiswa')) || [];

    if (kelasSaya.length === 0) {
        sidebarContainer.innerHTML = `
            <p class="px-3 py-2 text-[10px] text-slate-500 italic font-medium">Belum join kelas...</p>
        `;
        return;
    }

    // Render list kelas
    sidebarContainer.innerHTML = kelasSaya.map(kls => `
        <a href="kelas.html?id=${kls.kode || kls.joinCode}" 
           class="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition group">
            <div class="w-2 h-2 rounded-full ${kls.tema || 'bg-blue-500'} shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <span class="text-[11px] font-bold truncate uppercase tracking-tighter">${kls.nama}</span>
        </a>
    `).join('');
};


// Jalankan fungsi setiap halaman di-load
document.addEventListener('DOMContentLoaded', renderSidebarKelas);
