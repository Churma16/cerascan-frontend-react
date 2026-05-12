import axiosClient from '@/api/axios.js';
import { useQuery } from '@tanstack/react-query';

const fetchDashboardKpi = async () => {
    const response = await axiosClient.get('dashboard/kpi');
    return response.data.data;
};

export const useDashboardKPI = () => {
    return useQuery({
        queryKey: ['dashboard', 'dashboardKPI'],
        queryFn: fetchDashboardKpi,
        staleTime: 1000 * 60 * 5,
    });
};
