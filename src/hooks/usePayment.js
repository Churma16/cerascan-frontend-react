import axiosClient from '@/api/axios.js';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * Fungsi internal untuk mengirim request pembuatan transaksi ke API.
 *
 * @async
 * @function postCreateTransaction
 * @param {string|number} userId ID dari user yang sedang login.
 * @returns {Promise<Object>} Data transaksi (token dan redirect_url) dari response server.
 */
const postCreateTransaction = async ({ userId, planId }) => {
    const response = await axiosClient.post('payment/checkout', { userId, plan_id: planId });
    return response.data.data;
};

/**
 * Hook kustom untuk memproses pembayaran menggunakan React Query.
 * Menggunakan useMutation karena ini adalah operasi POST yang mengubah state server.
 *
 * @hook usePaymentTransaction
 */
export const usePaymentTransaction = () => {
    return useMutation({
        mutationFn: postCreateTransaction,
    });
};

const fetchCurrentUserSubsHistories = async () => {
    const response = await axiosClient.get('payment/me');
    return response.data.data;
};

export const useCurrentUserPaymentHistories = () => {
    return useQuery({
        queryKey: ['payments', 'me'],
        queryFn: fetchCurrentUserSubsHistories,
        staleTime: 1000 * 60 * 5,
    });
};
