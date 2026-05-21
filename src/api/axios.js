import axios from 'axios';

/**
 * @constant {boolean} isProd - Menentukan apakah aplikasi berjalan di lingkungan produksi.
 */
const isProd = import.meta.env.VITE_PROD === 'true';

/**
 * @constant {string} BASE_URL - URL dasar API yang dipilih berdasarkan environment.
 */
const BASE_URL = isProd ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV;

/**
 * Axios instance kustom untuk komunikasi API.
 * Memiliki konfigurasi dasar dan sistem interceptor untuk manajemen autentikasi.
 *
 * @type {import("axios").AxiosInstance}
 */
const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor untuk Request.
 * Mengambil token dari localStorage dan menambahkannya ke header Authorization.
 */
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Interceptor untuk Response.
 * Menangani respon sukses secara langsung dan melakukan penanganan error global.
 * @error 401 - Menghapus token lokal dan melakukan redirect ke halaman login.
 */
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Kalau server bilang 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
            const isLoginRequest = error.config?.url?.includes('/login');

            if (!isLoginRequest) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
