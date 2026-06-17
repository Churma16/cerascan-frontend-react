import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

/**
 * Hook kustom untuk mengelola koneksi WebSocket kuota pengguna secara live.
 * Membuka koneksi socket dengan autentikasi `userId` dan mendengarkan event
 * `quota_update` untuk memperbarui tampilan sisa kuota secara real-time.
 *
 * @hook useLiveUserQuota
 * @param {string|number|undefined} userId - ID pengguna yang sedang login. Koneksi tidak akan dibuka jika nilai ini falsy.
 * @returns {{ userQuota: number|null }} Objek berisi sisa kuota pengguna terkini.
 */
export const useLiveUserQuota = (userId) => {
    const [userQuota, setUserQuota] = useState(null);

    useEffect(() => {
        // Jangan buka koneksi jika data 'me' belum selesai di-fetch
        if (!userId) return;

        // Buka koneksi dan kirimkan userId melalui properti 'auth'
        const socket = io(import.meta.env.VITE_WEB_SOCKET_URL, {
            auth: { userId },
        });

        socket.on('connect', () => console.log('Live Quota terhubung ke WebSocket'));

        // Listen Room
        socket.on('quota_update', (data) => {
            console.log('Update kuota masuk:', data);
            setUserQuota(data);
        });

        // Cleanup if component unmounts or user changes
        return () => {
            socket.off('quota_update');
            socket.disconnect();
        };
    }, [userId]); // Effect ini hanya berjalan ulang jika ID berubah

    return { userQuota };
};
