import { Navigate, Outlet } from 'react-router-dom';

/**
 * Guard komponen untuk melindungi rute yang memerlukan autentikasi.
 *
 * @component
 * @returns {React.ReactElement} Outlet jika terautentikasi, atau Navigate ke /login.
 */
export default function ProtectedRoute() {
    const token = localStorage.getItem('token');

    const isAuthenticated = token && token !== 'undefined' && token !== 'null';

    if (!isAuthenticated) {
        if (token) localStorage.removeItem('token');

        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
