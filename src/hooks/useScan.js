import {useMutation, useQuery} from '@tanstack/react-query';
import axiosClient from "@/api/axios.js";
export const useScanImage = () => {
    return useMutation({
        mutationFn: async (file) => {
            const formData = new FormData();
            formData.append('image', file);

            // Memanggil endpoint API Anda melalui axiosClient
            const response = await axiosClient.post('/api/scan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data; // Mengembalikan data JSON dari server
        },
        onError: (error) => {
            console.error("Gagal melakukan scan:", error);
        }
    });
};

const fetchScans = async () => {
    const response = await axiosClient.get('/scans/history');
    return response.data.data;
}

export const useScans = () => {
    return useQuery({
        queryKey: ["scans"],
        queryFn: fetchScans,
        staleTime: 1000 * 60 * 5,
    })
}