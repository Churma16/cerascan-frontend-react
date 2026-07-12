import { useEffect } from 'react';
import { getSSE } from '../api/sseClient';

export const useScannerSSE = (currentScanIdRef, setScanResult, setIsProcessingAi) => {
    useEffect(() => {
        const eventSource = getSSE();
        if (!eventSource) return;

        const handleScanCompleted = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Hasil AI diterima via SSE:', data);

                if (data.scan_id === currentScanIdRef.current) {
                    setScanResult({
                        id: data.scan_id,
                        status: data.prediction,
                        confidence: data.confidence,
                        time: data.inference_time,
                    });
                    setIsProcessingAi(false);
                }
            } catch (error) {
                console.error("Gagal parse data SSE", error);
            }
        };

        eventSource.addEventListener('scan_completed', handleScanCompleted);

        return () => {
            eventSource.removeEventListener('scan_completed', handleScanCompleted);
        };
    }, [currentScanIdRef, setScanResult, setIsProcessingAi]);
};
