import axiosClient from '@/api/axios.js';
import { useQuery } from '@tanstack/react-query';

const fetchPlans = async () => {
    const response = await axiosClient.get('plans');
    return response.data.data;
};
export const usePlans = () => {
    return useQuery({
        queryKey: ['plans'],
        queryFn: fetchPlans,
        staleTime: 1000 * 60 * 10,
    });
};
const fetchAdjustedPrice = async (planId) => {
    const response = await axiosClient.get(`plans/adjusted-price/${planId}`);
    return response.data.data;
};

export const useAdjustedPrice = (planId) => {
    return useQuery({
        queryKey: ['adjustedPrice', planId],
        queryFn: () => fetchAdjustedPrice(planId),
        enabled: !!planId,
        staleTime: 1000 * 60 * 10,
    });
};
