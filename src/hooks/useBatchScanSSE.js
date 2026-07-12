import { useEffect } from 'react';
import { getSSE } from '../api/sseClient';

export const useBatchScanSSE = (setScanItems) => {
    useEffect(() => {
        const eventSource = getSSE();
        if (!eventSource) return;

        const handleScanCompleted = (event) => {
            try {
                const data = JSON.parse(event.data);
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
            } catch (e) {
                console.error(e);
            }
        };

        const handleScanFailed = (event) => {
            try {
                const data = JSON.parse(event.data);
                setScanItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === data.scan_id
                            ? {
                                  ...item,
                                  status: 'Gagal (Masuk DLQ)',
                                  confidence: 0,
                                  time: '-',
                                  isProcessing: false,
                              }
                            : item
                    )
                );
            } catch (e) {
                console.error(e);
            }
        };

        eventSource.addEventListener('scan_completed', handleScanCompleted);
        eventSource.addEventListener('scan_failed', handleScanFailed);

        return () => {
            eventSource.removeEventListener('scan_completed', handleScanCompleted);
            eventSource.removeEventListener('scan_failed', handleScanFailed);
        };
    }, [setScanItems]);
};
