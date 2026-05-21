import axiosClient from '@/api/axios.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            const response = await axiosClient.post('/auth/register', {
                full_name: payload.full_name,
                email: payload.email,
                password: payload.password,
                role: payload.role,
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Berhasil:', data);
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            const errMsg = error.response?.data?.meta?.message || 'Gagal menambah pengguna';
            console.error(errMsg);
        },
    });
};

export const useEditUser = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const response = await axiosClient.put(`/users/${id}`, payload);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Berhasil:', data);
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            const errMsg = error.response?.data?.meta?.message || 'Gagal mengedit pengguna';
            console.error(errMsg);
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const response = await axiosClient.delete(`/users/${id}`);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Berhasil:', data);
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error('Gagal menghapus user:', error);
        },
    });
};
