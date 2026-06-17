import axiosClient from '@/api/axios.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bounce, toast } from 'react-toastify';

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

export const useCreatePlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            const response = await axiosClient.post('/plans', payload);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Berhasil:', data);
            queryClient.invalidateQueries({ queryKey: ['plans'] });
            toast.success('Paket berhasil dibuat!');
        },
        onError: (error) => {
            const errMsg = error.response?.data?.meta?.message || 'Gagal menambah paket';
            console.error(errMsg);
            toast.error(`Gagal membuat paket: ${errMsg}`);
        },
    });
};

export const useEditPlan = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const response = await axiosClient.put(`/plans/${id}`, payload);
            return response.data.data;
        },
        onSuccess: (data) => {
            console.log('Berhasil:', data);
            queryClient.invalidateQueries({ queryKey: ['plans'] });
            toast.success(`Paket berhasil diperbarui`);
        },
        onError: (error) => {
            const errMsg = error.response?.data?.meta?.message || 'Gagal mengedit paket';
            console.error(errMsg);
            toast.error(`Gagal mengedit paket: ${errMsg}`);
        },
    });
};

export const useDeletePlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const response = await axiosClient.delete(`/plans/${id}`);
            return response.data;
        },
        onSuccess: async (data) => {
            console.log('Berhasil:', data);
            queryClient.invalidateQueries({ queryKey: ['plans'] });
            toast.success('Paket Berhasil Dihapus', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
        },
        onError: (error) => {
            const errMsg = error.response?.data?.meta?.message || 'Gagal menghapus paket';
            console.error('Gagal menghapus paket:', errMsg);
            toast.error(`Gagal menghapus paket: ${errMsg}`);
        },
    });
};
