const isProd = import.meta.env.VITE_PROD === 'true';
const BASE_URL = isProd ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV;

let eventSource = null;

export const connectSSE = (userId) => {
    if (!eventSource) {
        let url = `${BASE_URL}/api/sse/events`;
        if (userId) {
            url += `?userId=${userId}`;
        }
        
        eventSource = new EventSource(url);
        
        eventSource.onopen = () => {
            console.log('Frontend terhubung ke SSE (Singleton)');
        };
        
        eventSource.onerror = (err) => {
            console.error('SSE Error:', err);
        };
    }
    return eventSource;
};

export const getSSE = () => {
    if (!eventSource) {
        console.warn('SSE belum dikoneksikan. Pastikan connectSSE sudah dipanggil.');
    }
    return eventSource;
};

export const disconnectSSE = () => {
    if (eventSource) {
        eventSource.close();
        eventSource = null;
        console.log('Frontend terputus dari SSE');
    }
};
