import axiosClient from '@/api/axios.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

/**
 * Fungsi internal untuk mengambil profil pengguna yang sedang login.
 *
 * @async
 * @function fetchCurrentUser
 * @returns {Promise<Object>} Data profil pengguna dari server.
 * @throws {Error} Jika request gagal.
 */
const fetchCurrentUser = async () => {
    const response = await axiosClient.get('/users/profile');
    console.log(response.data);
    return response.data.data;
};

/**
 * Hook untuk mendapatkan data profil pengguna saat ini menggunakan React Query.
 * Memiliki cache selama 1 jam (staleTime) dan tidak melakukan retry jika gagal.
 *
 * @hook useCurrentUser
 * @returns {import('@tanstack/react-query').UseQueryResult} Objek query yang berisi data user, status loading, dan error.
 */
export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 60,
    });
};

/**
 * Hook utilitas sinkron untuk mengecek status autentikasi secara lokal.
 * Memeriksa keberadaan token di localStorage serta validitas stringnya.
 *
 * @hook useIsAuthenticated
 * @returns {boolean} True jika token ada dan valid, False jika tidak.
 */
export const useIsAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && token !== 'undefined' && token !== 'null';
};

/**
 * Hook untuk menangani proses logout pengguna.
 * Menghapus token dari localStorage, membersihkan semua cache React Query,
 * dan mengarahkan pengguna kembali ke halaman login.
 *
 * @hook useLogout
 * @returns {Function} Fungsi logout yang bersifat asinkron.
 */
export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            // TODO: Tambahkan request ke endpoint logout jika diperlukan
        } catch (error) {
            console.error('Gagal melakukan logout di sisi server', error);
        } finally {
            localStorage.removeItem('token');
            queryClient.clear();
            navigate('/login', { replace: true });
        }
    };

    return logout;
};

/**
 * Hook mutasi untuk melakukan perubahan password pengguna.
 * Mengonversi payload dari camelCase ke snake_case sesuai kebutuhan API backend.
 *
 * @hook useChangePassword
 * @returns {import('@tanstack/react-query').UseMutationResult} Objek mutasi untuk mengeksekusi ganti password.
 */
export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (payload) => {
            const response = await axiosClient.post('/auth/change-password', {
                old_password: payload.oldPassword,
                new_password: payload.newPassword,
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Berhasil:', data.message);
        },
        onError: (error) => {
            const errMsg = error.response?.data?.meta?.message || 'Gagal ganti password';
            console.error(errMsg);
        },
    });
};

/**
 * Hook mutasi untuk menangani proses login pengguna.
 * Jika login berhasil, token akan disimpan secara otomatis ke dalam localStorage.
 *
 * @hook useLogin
 * @returns {import('@tanstack/react-query').UseMutationResult} Objek mutasi untuk mengeksekusi login.
 */
export const useLogin = () => {
    return useMutation({
        mutationFn: async ({ email, password }) => {
            const response = await axiosClient.post('/auth/login', {
                email,
                password,
            });

            const data = response.data;
            const token = data.token || (data.data && data.data.token);

            if (token) {
                localStorage.setItem('token', token);
            }

            return data;
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });
};
