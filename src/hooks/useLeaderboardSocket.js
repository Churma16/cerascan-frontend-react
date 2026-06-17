import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Hook kustom untuk mengelola koneksi WebSocket pada halaman Leaderboard.
 * Secara otomatis mendengarkan event `scan_completed` dan melakukan invalidasi
 * cache React Query agar data peringkat selalu diperbarui secara real-time.
 *
 * @hook useLeaderboardSocket
 * @returns {void}
 */
export const useLeaderboardSocket = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const socket = io(import.meta.env.VITE_WEB_SOCKET_URL || 'http://localhost:3000');

        socket.on('scan_completed', (data) => {
            console.log('🔥 [Socket] Seseorang baru saja selesai scan!', data);
            queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
        });

        return () => {
            socket.off('scan_completed');
            socket.disconnect();
        };
    }, [queryClient]);
};
