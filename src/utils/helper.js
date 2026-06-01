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

/**
 * Mengonversi huruf pertama dari setiap kata menjadi huruf kapital (Title Case).
 * Huruf setelah awalan kata akan otomatis diubah menjadi huruf kecil.
 *
 * @function capitalizeEachWord
 * @param {string} str - String teks yang akan diproses.
 * @returns {string} Teks dengan format awalan kapital pada setiap kata, atau string kosong jika input tidak valid.
 * @example
 * capitalizeEachWord("hello world") => "Hello World"
 * capitalizeEachWord("jOhn dOe") => "John Doe"
 */
export const capitalizeEachWord = (str) => {
    if (typeof str !== 'string' || !str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Mengonversi string tanggal menjadi format tanggal Indonesia (contoh: "29 Mei 2026").
 *
 * @function formatDateId
 * @param {string} dateStr - String tanggal yang valid (contoh: "2026-05-29T16:32:27.000Z").
 * @returns {string} Tanggal dalam format "DD MMMM YYYY" berbahasa Indonesia, atau string kosong jika tidak valid.
 * @example
 * formatDateId("2026-05-29T16:32:27.000Z") => "29 Mei 2026"
 */
export const formatDateId = (dateStr) => {
    if (!dateStr) return '';

    const date = new Date(dateStr);

    // Validasi apakah nilai dateStr bisa diurai menjadi tanggal yang valid
    if (isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long', // Gunakan 'short' jika ingin singkatan (contoh: "Mei", "Jun")
        year: 'numeric',
    }).format(date);
};

export const convertTwoNumberBeforeDecimal = (ratio) => {
    // 1. Convert to number and fix decimal places (e.g., 2 decimal places)
    const num = Number(ratio || 0);
    const fixedNum = num.toFixed(2); // Outputs "5.23" or "12.34"

    // 2. Split into integer and decimal parts
    const [integerPart, decimalPart] = fixedNum.split('.');

    // 3. Pad the integer part so it always has at least 2 digits
    const paddedInteger = integerPart.padStart(2, '0');

    // 4. Join them back together using a comma
    return `${paddedInteger},${decimalPart}`;
};
