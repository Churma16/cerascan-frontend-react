import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/api/axios.js';

export const useScanImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file) => {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axiosClient.post('/scans', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await queryClient.invalidateQueries({ queryKey: ['scans'] });
            return response.data.data;
        },
        onError: (error) => {
            console.error('Gagal melakukan scan:', error);
        },
    });
};

const fetchScans = async () => {
    const response = await axiosClient.get('/scans/history');
    return response.data.data;
};

export const useScans = () => {
    return useQuery({
        queryKey: ['scans'],
        queryFn: fetchScans,
        staleTime: 1000 * 60 * 5,
    });
};
