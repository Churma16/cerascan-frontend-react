import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getSSE } from '../api/sseClient';

export const useDlqSSE = (onUpdate) => {
    const queryClient = useQueryClient();
    
    useEffect(() => {
        const eventSource = getSSE();
        if (!eventSource) return;

        const handleDlqUpdated = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Peringatan: Pesan masuk ke DLQ (SSE)', data);
                queryClient.invalidateQueries({ queryKey: ['dlqMessages'] });
                
                if (onUpdate) onUpdate(data);
            } catch (e) {
                console.error(e);
            }
        };

        eventSource.addEventListener('dlq_updated', handleDlqUpdated);

        return () => {
            eventSource.removeEventListener('dlq_updated', handleDlqUpdated);
        };
    }, [queryClient, onUpdate]);
};
