import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const token = localStorage.getItem('token');

    // Cek apakah token tidak ada ATAU token bernilai string "undefined"
    if (!token || token === 'undefined' || token === 'null') {
        // Hapus token yang rusak jika ada
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
    }

    // Jika auth, render halaman
    return <Outlet />;
}
