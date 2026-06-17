import { useEffect } from 'react';
import { io } from 'socket.io-client';

/**
 * Hook kustom untuk mengelola koneksi WebSocket pada halaman Batch Scan.
 * Mendengarkan event `scan_completed` dan memperbarui state item scan
 * yang sesuai berdasarkan `scan_id` yang dikembalikan server.
 *
 * @hook useBatchScanSocket
 * @param {Function} setScanItems - State setter dari useState untuk daftar item scan.
 * @returns {void}
 */
export const useBatchScanSocket = (setScanItems) => {
    useEffect(() => {
        const socket = io(import.meta.env.VITE_WEB_SOCKET_URL);
        socket.on('connect', () => console.log('Admin terhubung ke WebSocket'));

        socket.on('scan_completed', (data) => {
            setScanItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === data.scan_id
                        ? {
                              ...item,
                              status: data.prediction,
                              confidence: data.confidence,
                              time: data.inference_time,
                              isProcessing: false,
                          }
                        : item
                )
            );
        });

        return () => socket.disconnect();
    }, [setScanItems]);
};
