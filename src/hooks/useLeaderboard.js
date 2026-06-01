import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/axios.js';

const fetchLeaderboard = async (limit) => {
    const response = await axiosClient.get('leaderboards', { params: { limit } });
    return response.data.data;
};

export const useLeaderboard = (limit = 10) => {
    return useQuery({
        queryKey: ['leaderboard', limit],
        queryFn: () => fetchLeaderboard(limit),
        staleTime: 1000 * 60 * 5,
    });
};
