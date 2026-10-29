import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/api/axios.js';
import { connectSSE } from '@/api/sseClient.js';

/**
 * Fetcher function untuk mengambil data kuota pengguna dari API backend.
 *
 * @async
 * @param {string|number} userId - ID pengguna.
 * @returns {Promise<Object>} Data lengkap kuota pengguna.
 */
export const fetchUserQuota = async (userId) => {
    if (!userId) return null;
    const response = await axiosClient.get(`user-quotas/${userId}`);
    return response.data.data;
};

/**
 * Hook Single Source of Truth (SSOT) untuk mengelola data kuota pengguna.
 * Menggabungkan fetching & caching TanStack Query dengan update real-time via SSE.
 *
 * @hook useUserQuota
 * @param {string|number|undefined} userId - ID pengguna aktif.
 * @returns {Object} State kuota pengguna, status loading, dan helper values.
 */
export const useUserQuota = (userId) => {
    const queryClient = useQueryClient();

    const queryResult = useQuery({
        queryKey: ['userQuota', userId],
        queryFn: () => fetchUserQuota(userId),
        enabled: Boolean(userId),
        staleTime: 1000 * 60 * 5, // 5 menit
    });

    useEffect(() => {
        if (!userId) return;

        const eventSource = connectSSE(userId);

        const handleQuotaUpdate = (event) => {
            try {
                const eventPayload = JSON.parse(event.data);
                const rawRemaining = typeof eventPayload === 'object' && eventPayload?.remaining_quota !== undefined
                    ? eventPayload.remaining_quota
                    : eventPayload;

                const newRemainingQuota = Number(rawRemaining);

                queryClient.setQueryData(['userQuota', userId], (previousQuotaData) => {
                    if (!previousQuotaData) {
                        return {
                            total_quota: newRemainingQuota,
                            used_quota: 0,
                            remaining_quota: newRemainingQuota,
                            is_quota_low: false,
                            next_reset_date: null,
                        };
                    }

                    const totalQuota = previousQuotaData.total_quota || 0;
                    const calculatedUsedQuota = Math.max(totalQuota - newRemainingQuota, 0);
                    const isQuotaLow = totalQuota > 0 && (newRemainingQuota / totalQuota <= 0.2 || newRemainingQuota <= 200);

                    return {
                        ...previousQuotaData,
                        remaining_quota: newRemainingQuota,
                        used_quota: calculatedUsedQuota,
                        is_quota_low: isQuotaLow,
                    };
                });

                // Sinkronkan cache dashboard KPI jika ada komponen dashboard yang mendengarkan
                queryClient.invalidateQueries({ queryKey: ['dashboard', 'dashboardKPI'] });
            } catch (error) {
                console.error('[SSE Quota Update Error]:', error);
            }
        };

        eventSource.addEventListener('quota_update', handleQuotaUpdate);

        return () => {
            eventSource.removeEventListener('quota_update', handleQuotaUpdate);
        };
    }, [userId, queryClient]);

    const quotaData = queryResult.data;

    return {
        ...queryResult,
        userQuota: quotaData,
        remainingQuota: quotaData?.remaining_quota ?? null,
        totalQuota: quotaData?.total_quota ?? 0,
        usedQuota: quotaData?.used_quota ?? 0,
        isQuotaLow: quotaData?.is_quota_low ?? false,
        nextResetDate: quotaData?.next_reset_date ?? null,
    };
};
