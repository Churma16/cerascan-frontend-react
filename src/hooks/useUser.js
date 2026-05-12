import axiosClient from '@/api/axios.js';
import { useQuery } from '@tanstack/react-query';

/**
 * Fungsi internal untuk mengambil daftar seluruh pengguna dari API.
 *
 * @async
 * @function fetchUser
 * @returns {Promise<Array>} Promise yang menghasilkan array data pengguna.
 * @throws {Error} Jika terjadi kesalahan pada saat request ke server.
 */
const fetchUser = async () => {
    const response = await axiosClient.get('users');
    return response.data.data;
};

/**
 * Hook kustom untuk mengambil dan mengelola daftar pengguna menggunakan React Query.
 * Data dianggap segar (stale) setelah 5 menit untuk mengoptimalkan penggunaan bandwidth.
 *
 * @hook useUsers
 * @returns {import('@tanstack/react-query').UseQueryResult} Objek query yang berisi daftar pengguna, status loading, dan error.
 */
export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUser,
        staleTime: 1000 * 60 * 5,
    });
};
