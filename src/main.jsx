import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Nonaktifkan console.log di environment Production
if (import.meta.env.PROD) {
    console.log = () => {};
    console.info = () => {};
    console.debug = () => {};
}
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
// LOAD MIDTRANS
const loadMidtransSnap = () => {
    const snapUrl = import.meta.env.VITE_MIDTRANS_SNAP_URL;
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    if (!snapUrl || !clientKey || document.querySelector('script[data-midtrans-snap="true"]')) {
        return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = snapUrl;
    script.setAttribute('data-client-key', clientKey);
    script.setAttribute('data-midtrans-snap', 'true');
    document.body.appendChild(script);
};

loadMidtransSnap();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Theme accentColor="teal" grayColor="sand" appearance="light" radius="large">
                <App />
            </Theme>
            <ToastContainer />
        </QueryClientProvider>
    </React.StrictMode>
);
