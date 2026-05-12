import axiosClient from '@/api/axios.js';
import { useQuery } from '@tanstack/react-query';

/**
 * Fungsi internal untuk mengambil data Key Performance Indicators (KPI) dashboard dari API.
 *
 * @async
 * @function fetchDashboardKpi
 * @returns {Promise<Object>} Data KPI dashboard hasil ekstraksi dari response server.
 * @throws {Error} Mengembalikan error jika request gagal atau server merespon dengan status non-2xx.
 */
const fetchDashboardKpi = async () => {
    const response = await axiosClient.get('dashboard/kpi');
    return response.data.data;
};

/**
 * Hook kustom untuk mengambil dan mengelola data KPI dashboard menggunakan React Query.
 * Menggunakan caching dengan staleTime selama 5 menit untuk efisiensi performa.
 *
 * @hook useDashboardKPI
 * @returns {import('@tanstack/react-query').UseQueryResult} Objek query yang berisi data dashboard, status fetching, dan fungsi refetch.
 */
export const useDashboardKPI = () => {
    return useQuery({
        queryKey: ['dashboard', 'dashboardKPI'],
        queryFn: fetchDashboardKpi,
        staleTime: 1000 * 60 * 5,
    });
};

const fetchScanTrend = async () => {
    const response = await axiosClient.get('dashboard/scan-trends');
    return response.data.data;
};

export const useScanTrends = () => {
    return useQuery({
        queryKey: ['dashboard', 'scanTrends'],
        queryFn: fetchScanTrend,
        staleTime: 1000 * 60 * 5,
    });
};

const fetchScanHistory = async () => {
    const response = await axiosClient.get('dashboard/scan-history');
    return response.data.data;
};

export const useScanHistory = () => {
    return useQuery({
        queryKey: ['dashboard', 'scanHistory'],
        queryFn: fetchScanHistory,
        staleTime: 1000 * 60 * 5,
    });
};
