import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

/**
 * @deprecated Silakan gunakan `useDlqSSE` yang berbasis Server-Sent Events (SSE).
 */
export const useDlqSocket = (onUpdate) => {
    const queryClient = useQueryClient();
    
    useEffect(() => {
        const socket = io(import.meta.env.VITE_WEB_SOCKET_URL || 'http://localhost:3000');
        
        socket.on('connect', () => {
            console.log('Frontend terhubung ke WebSocket (DLQ)');
        });

        socket.on('dlq_updated', (data) => {
            console.log('Peringatan: Pesan masuk ke DLQ', data);
            queryClient.invalidateQueries({ queryKey: ['dlqMessages'] });
            
            if (onUpdate) onUpdate(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [queryClient, onUpdate]);
};
