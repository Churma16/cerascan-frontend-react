import { useUserQuota } from './useUserQuota.js';

/**
 * Hook backward-compatible untuk live quota SSE.
 * Dialihkan ke useUserQuota sebagai Single Source of Truth.
 *
 * @hook useLiveUserQuotaSSE
 * @param {string|number|undefined} userId - ID pengguna.
 * @returns {{ userQuota: number|null }} Sisa kuota pengguna terkini.
 */
export const useLiveUserQuotaSSE = (userId) => {
    const { remainingQuota } = useUserQuota(userId);
    return { userQuota: remainingQuota };
};
