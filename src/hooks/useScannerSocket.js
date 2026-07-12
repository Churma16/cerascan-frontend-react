import { useEffect } from 'react';
import { io } from 'socket.io-client';

/**
 * Hook kustom untuk mengelola koneksi WebSocket pada Scanner Page.
 * Mendengarkan event `scan_completed` dan memperbarui hasil scan hanya
 * jika `scan_id` yang diterima cocok dengan ID scan yang sedang aktif (via ref).
 *
 * @deprecated Silakan gunakan `useScannerSSE` yang berbasis Server-Sent Events (SSE).
 * @hook useScannerSocket
 * @param {React.MutableRefObject<string|null>} currentScanIdRef - Ref yang menyimpan scan_id aktif.
 * @param {Function} setScanResult - State setter untuk hasil scan.
 * @param {Function} setIsProcessingAi - State setter untuk status loading AI.
 * @returns {void}
 */
export const useScannerSocket = (currentScanIdRef, setScanResult, setIsProcessingAi) => {
    useEffect(() => {
        const socket = io(import.meta.env.VITE_WEB_SOCKET_URL || 'http://localhost:3000');

        socket.on('connect', () => {
            console.log('Frontend terhubung ke WebSocket');
        });

        socket.on('scan_completed', (data) => {
            console.log('Hasil AI diterima:', data);

            if (data.scan_id === currentScanIdRef.current) {
                setScanResult({
                    id: data.scan_id,
                    status: data.prediction,
                    confidence: data.confidence,
                    time: data.inference_time,
                });
                setIsProcessingAi(false);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [currentScanIdRef, setScanResult, setIsProcessingAi]);
};
