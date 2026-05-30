/**
 * Memotong string jika melebihi panjang maksimum yang ditentukan dan menambahkan elipsis (...).
 *
 * @function truncate
 * @param {string} str - Teks sumber yang akan dipotong.
 * @param {number} maxLength - Batas karakter maksimal yang diperbolehkan.
 * @returns {string} Teks yang sudah dipotong atau teks asli jika belum mencapai batas.
 */
export const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

/**
 * Menghasilkan URL lengkap untuk aset gambar berdasarkan nama file yang tersimpan.
 * URL dasar ditentukan secara dinamis berdasarkan lingkungan (Production vs Development).
 *
 * @function getImageUrl
 * @param {string} savedFileName - Nama file gambar yang tersimpan di server.
 * @returns {string} URL lengkap gambar atau string kosong jika nama file tidak tersedia.
 */
export const getImageUrl = (savedFileName) => {
    if (!savedFileName) return '';
    const isProd = import.meta.env.VITE_PROD === 'true';
    const baseUrl = isProd
        ? import.meta.env.VITE_BACKEND_STORAGE_URL_PROD || 'http://localhost:3000/uploads'
        : import.meta.env.VITE_BACKEND_STORAGE_URL_DEV || 'http://localhost:3000/uploads';
    return `${baseUrl}/${savedFileName}`;
};

/**
 * Mengonversi string tanggal menjadi format waktu relatif (contoh: "5 menit lalu").
 * Menghitung selisih waktu antara waktu saat ini dengan tanggal yang diberikan.
 *
 * @function timeAgo
 * @param {string} dateStr - String tanggal yang valid untuk diproses oleh objek Date.
 * @returns {string} Representasi waktu relatif dalam bahasa Indonesia atau string kosong.
 */
export const timeAgo = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays === 1) return 'Kemarin';

    return `${diffDays} hari lalu`;
};

/**
 * Mengonversi angka menjadi format mata uang Rupiah (Rp) dengan separator ribuan.
 *
 * @function toRupiah
 * @param {number|string} price - Nilai harga yang akan dikonversi ke format Rupiah.
 * @returns {string} String format Rupiah (contoh: "Rp 100.000") atau "Rp 0" jika nilai tidak valid.
 * @example
 * toRupiah(5000) => "Rp 5.000"
 * toRupiah("100000") => "Rp 100.000"
 * toRupiah(0) => "Rp 0"
 */
export const toRupiah = (price) => {
    if (price === null || price === undefined || price === '') {
        return 'Rp 0';
    }
    return `Rp ${Number(price).toLocaleString('id-ID')}`;
};
