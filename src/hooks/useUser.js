import axiosClient from '@/api/axios.js';
import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
    const response = await axiosClient.get('users');
    return response.data.data;
};

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUser,
        staleTime: 1000 * 60 * 5,
    });
};
