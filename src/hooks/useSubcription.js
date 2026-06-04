import axiosClient from '@/api/axios.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const fetchSubscriptions = async () => {
    const response = await axiosClient.get(`/subscriptions`);
    return response.data.data;
};

export const useSubscriptions = () => {
    return useQuery({
        queryKey: ['subscriptions'],
        queryFn: fetchSubscriptions,
        staleTime: 1000 * 60 * 5,
    });
};

const fetchCurrentUserSubscriptionHistories = async () => {
    const response = await axiosClient.get(`/subscriptions/user/me`);
    return response.data.data;
};

export const useCurrentUserSubsHistories = () => {
    return useQuery({
        queryKey: ['subscription-history', 'active'],
        queryFn: fetchCurrentUserSubscriptionHistories,
        staleTime: 1000 * 60 * 5,
    });
};

const fetchActiveSubscription = async () => {
    const response = await axiosClient.get('/subscriptions/me/active');
    return response.data.data;
};

export const useActiveSubscription = () => {
    return useQuery({
        queryKey: ['subscriptions', 'active'],
        queryFn: fetchActiveSubscription,
        staleTime: 1000 * 60 * 5,
    });
};

export const useGiftSubscription = () => {
    return useMutation({
        mutationFn: async ({ user_id, plan_id, note }) => {
            const response = await axiosClient.post('/subscriptions/gift', {
                user_id,
                plan_id,
                acquisition_method: 'manual_admin',
                note,
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Gift successful', data);
            toast.success('Paket langganan berhasil diberikan!');
        },
        onError: (error) => {
            console.error('Gift failed', error);
            toast.error('Gagal memberikan paket langganan. Silakan coba lagi.');
        },
    });
};
