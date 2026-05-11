import axiosClient from '@/api/axios.js';
import { useQuery } from '@tanstack/react-query';

const fetchCurrentUser = async () => {
    const response = await axiosClient.get('/users/profile');
    console.log(response.data);
    return response.data.data;
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 60,
    });
};

export const useIsAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && token !== 'undefined' && token !== 'null';
};
