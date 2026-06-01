/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PROD: string;
    readonly VITE_BACKEND_URL_PROD: string;
    readonly VITE_BACKEND_URL_DEV: string;
    readonly VITE_BACKEND_STORAGE_URL_DEV: string;
    readonly VITE_BACKEND_STORAGE_URL_PROD: string;
    readonly VITE_MIDTRANS_CLIENT_KEY: string;
    readonly VITE_MIDTRANS_SNAP_URL: string;
    readonly VITE_WEB_SOCKET_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
