import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useCurrentUser } from '@/hooks/useAuth.js';
import DotLoading from '@/components/DotLoading.jsx';

export default function LiveUserQuotaColumn() {
    const { data: me } = useCurrentUser();
    const [userQuota, setUserQuota] = useState(null);

    useEffect(() => {
        // 1. Jangan buka koneksi jika data 'me' belum selesai di-fetch
        if (!me?.id) return;

        // 2. Buka koneksi dan kirimkan userId melalui properti 'auth'
        const socket = io(import.meta.env.VITE_WEB_SOCKET_URL, {
            auth: {
                userId: me.id,
            },
        });

        socket.on('connect', () => console.log('Live Quota terhubung ke WebSocket'));

        // Listen Room
        socket.on('quota_update', (data) => {
            console.log('Update kuota masuk:', data);
            // Jika backend (Redis) langsung mengembalikan angka, langsung set ke state
            setUserQuota(data);
        });

        // Cleanup if component unmounts or user changes
        return () => {
            socket.off('quota_update');
            socket.disconnect();
        };
    }, [me?.id]); // Effect ini hanya berjalan ulang jika ID berubah

    return (
        <div className="text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sisa Kuota</p>
            {userQuota !== null ? (
                <p className="text-xl font-black text-[#042B1F] mt-1">{userQuota}</p>
            ) : (
                <div className="mt-3 flex justify-center">
                    <DotLoading className="text-[#042B1F]" />
                </div>
            )}
        </div>
    );
}
