import { useEffect, useState } from 'react';
import { connectSSE, getSSE } from '../api/sseClient';

export const useLiveUserQuotaSSE = (userId) => {
    const [userQuota, setUserQuota] = useState(null);

    useEffect(() => {
        if (!userId) return;

        // Pastikan terkoneksi (bisa dipanggil berulang kali karena singleton)
        const eventSource = connectSSE(userId);

        const handleQuotaUpdate = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Update kuota masuk (SSE):', data);
                setUserQuota(data);
            } catch (e) {
                console.error(e);
            }
        };

        eventSource.addEventListener('quota_update', handleQuotaUpdate);

        return () => {
            eventSource.removeEventListener('quota_update', handleQuotaUpdate);
        };
    }, [userId]);

    return { userQuota };
};
