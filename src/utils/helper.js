export const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

export const getImageUrl = (savedFileName) => {
    if (!savedFileName) return '';
    const isProd = import.meta.env.VITE_PROD === 'true';
    const baseUrl = isProd
        ? (import.meta.env.VITE_BACKEND_URL_STORAGE_PROD || 'http://localhost:3000/uploads')
        : (import.meta.env.VITE_BACKEND_URL_STORAGE_DEV || 'http://localhost:3000/uploads');
    return `${baseUrl}/${savedFileName}`;
};

export const timeAgo = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays === 1) return 'Kemarin';

    return `${diffDays} hari lalu`;
};
