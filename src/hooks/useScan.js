import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import axiosClient from '@/api/axios.js';

/**
 * Hook mutasi untuk mengunggah dan memproses pemindaian gambar (AI Scanning).
 * Mengirim berkas menggunakan format multipart/form-data dan secara otomatis
 * melakukan sinkronisasi ulang (invalidate) pada cache riwayat pemindaian.
 *
 * @hook useScanImage
 * @returns {import('@tanstack/react-query').UseMutationResult} Objek mutasi untuk eksekusi scan.
 */
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
            // Melakukan refresh data history segera setelah scan berhasil
            await queryClient.invalidateQueries({ queryKey: ['scans'] });
            return response.data.data;
        },
        onError: (error) => {
            console.error('Gagal melakukan scan:', error);
        },
    });
};

/**
 * Fungsi internal untuk mengambil daftar riwayat pemindaian dari server.
 *
 * @async
 * @function fetchScans
 * @returns {Promise<Array>} Array berisi objek riwayat pemindaian.
 * @throws {Error} Jika pengambilan data gagal.
 */
const fetchScans = async () => {
    const response = await axiosClient.get('/scans/history');
    return response.data.data;
};



/**
 * Hook untuk mendapatkan daftar riwayat pemindaian pengguna.
 * Memiliki durasi data segar (staleTime) selama 5 menit.
 *
 * @hook useScans
 * @returns {import('@tanstack/react-query').UseQueryResult} Objek query berisi data riwayat dan status fetching.
 */
export const useScans = (page, limit) => {
    return useQuery({
        queryKey: page !== undefined ? ['scans', { page, limit }] : ['scans'],
        queryFn: async () => {
            const params = {};
            if (page !== undefined) params.page = page;
            if (limit !== undefined) params.limit = limit;
            const response = await axiosClient.get('/scans/history', { params });
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    });
};

export const usePublicScans = (page, limit) => {
    return useQuery({
        queryKey: page !== undefined ? ['scans', 'public', { page, limit }] : ['scans', 'public'],
        queryFn: async () => {
            const params = {};
            if (page !== undefined) params.page = page;
            if (limit !== undefined) params.limit = limit;
            const response = await axiosClient.get('/scans/history/public', { params });
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    });
};

/**
 * Hook mutasi untuk menghapus item pemindaian tertentu berdasarkan ID.
 * Melakukan pembersihan cache 'scans' setelah penghapusan berhasil untuk memastikan UI tetap sinkron.
 *
 * @hook useDeleteScan
 * @returns {import('@tanstack/react-query').UseMutationResult} Objek mutasi untuk eksekusi penghapusan.
 */
export const useDeleteScan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            await axiosClient.delete(`/scans/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scans'] });
        },
        onError: (error) => {
            console.error('Gagal menghapus scan:', error);
        },
    });
};

/**
 * Hook mutasi untuk mengunggah batch gambar untuk pemindaian (Batch Scanning).
 * Mengirim multiple file menggunakan format multipart/form-data.
 *
 * @hook useBatchScanImages
 * @returns {import('@tanstack/react-query').UseMutationResult} Objek mutasi untuk eksekusi batch scan.
 */
export const useBatchScanImages = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (files) => {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('images', file);
            });

            const response = await axiosClient.post('/scans/batch', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scans'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
};
