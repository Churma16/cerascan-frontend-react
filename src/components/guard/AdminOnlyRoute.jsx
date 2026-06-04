import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/useAuth.js';

/**
 * Guard komponen untuk melindungi rute yang memerlukan autentikasi.
 *
 * @component
 * @returns {React.ReactElement} Outlet jika terautentikasi, atau Navigate ke /login.
 */
export default function AdminOnlyRoute() {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
                <p className="text-sm font-medium text-gray-500">Memuat data akses...</p>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
