import axiosClient from '@/api/axios.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
 * Hook query untuk memverifikasi email pengguna berdasarkan token dari tautan URL.
 * Menangani logika penanganan pesan error spesifik jika email sudah diverifikasi sebelumnya.
 *
 * @hook useVerifyEmail
 * @param {string|null} token - Token verifikasi yang diambil dari query parameter URL.
 * @returns {import('@tanstack/react-query').UseQueryResult} Objek query berisi status verifikasi dan pesan respon.
 */
export const useVerifyEmail = (token) => {
    return useQuery({
        queryKey: ['verifyEmail', token],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/auth/verify-email?token=${token}`);
                return response.data?.meta?.message || response.data?.message || 'Email berhasil diverifikasi!';
            } catch (error) {
                const errorMsg =
                    error.response?.data?.meta?.message ||
                    error.response?.data?.message ||
                    error.meta?.message ||
                    error.message ||
                    '';

                if (errorMsg.toLowerCase().includes('sudah diverifikasi')) {
                    return 'Email sudah terverifikasi sebelumnya! Mengalihkan ke halaman masuk.';
                }

                throw new Error(errorMsg || 'Tautan verifikasi telah kedaluwarsa atau tidak valid.', { cause: error });
            }
        },
        enabled: !!token, // Query HANYA akan jalan kalau tokennya ada (tidak null)
        retry: false, // Jangan diulang-ulang otomatis jika gagal
        refetchOnWindowFocus: false, // Jangan panggil API lagi kalau user bolak-balik pindah tab browser
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
        onSuccess: (data) => {
            console.log('Berhasil:', data);
            toast.success(`Selamat datang kembali, ${data.data.user.full_name}!`, {
                className: 'w-120',
            });
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Email atau password yang dimasukan tidak cocok';
            toast.error(errorMessage, { className: 'w-100' });
        },
    });
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
 * Hook mutasi untuk menangani proses registrasi pengguna baru (V2 API).
 * Menampilkan toast notifikasi sukses/gagal secara otomatis saat eksekusi selesai.
 *
 * @hook useRegister
 * @returns {import('@tanstack/react-query').UseMutationResult} Objek mutasi untuk mengeksekusi registrasi.
 */
export const useRegister = () => {
    return useMutation({
        mutationFn: async ({ full_name, email, password }) => {
            const { data: apiResponse } = await axiosClient.post('/auth/v2/register', {
                full_name,
                email,
                password,
            });
            return apiResponse;
        },
        onSuccess: () => {
            toast.success('Registrasi berhasil! Silakan cek kotak masuk email Anda untuk verifikasi.', {
                className: 'w-120',
            });
        },
        onError: (error) => {
            console.log(error);
            const errorMessage = error.response?.data?.meta?.message || 'Gagal melakukan registrasi';
            toast.error(errorMessage, { className: 'w-100' });
        },
    });
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
 * Hook mutasi untuk meminta pengiriman kode OTP pemulihan akun ke email pengguna.
 *
 * @hook useForgotPassword
 * @returns {import('@tanstack/react-query').UseMutationResult} Objek mutasi untuk mengeksekusi permintaan OTP.
 */
export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async ({ email }) => {
            const response = await axiosClient.post('/auth/forgot-password', { email });
            console.log(response);
            return response.data;
        },
    });
};

/**
 * Hook mutasi untuk memverifikasi kode OTP yang dimasukkan pengguna.
 * Diharapkan mengembalikan objek respon yang berisi data user ID untuk tahap reset berikutnya.
 *
 * @hook useVerifyOtp
 * @returns {import('@tanstack/react-query').UseMutationResult} Objek mutasi untuk mengeksekusi verifikasi OTP.
 */
export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: async ({ email, otp }) => {
            const response = await axiosClient.post('/auth/verify-otp', { email, otp });
            return response.data;
        },
    });
};

/**
 * Hook mutasi untuk menyimpan sandi baru (reset password) menggunakan ID pengguna
 * yang didapatkan dari hasil validasi verifikasi OTP.
 *
 * @hook useResetPassword
 * @returns {import('@tanstack/react-query').UseMutationResult} Objek mutasi untuk memperbarui password lama.
 */
export const useResetPassword = () => {
    return useMutation({
        mutationFn: async ({ id, new_password }) => {
            const response = await axiosClient.post('/auth/reset-password', { id, new_password });
            return response.data;
        },
    });
};
