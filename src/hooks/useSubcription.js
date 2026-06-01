import axiosClient from '@/api/axios.js';
import { useQuery } from '@tanstack/react-query';

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
