import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ScannerPage from '@/features/scanner/ScannerPage.jsx';
import HistoryPage from '@/features/history/HistoryPage.jsx';
import InsightsPage from '@/features/insight/InsightsPage.jsx';
import ArchitecturePage from '@/features/architecture/ArchitecturePage.jsx';
import LoginPage from '@/features/auth/LoginPage.jsx';
import ScanAdminPage from '@/features/user/ScanAdminPage.jsx';
import UserPage from '@/features/user/UserPage.jsx';
import DashboardPage from '@/features/dashboard/DashboardPage.jsx';
import ChangePasswordPage from '@/features/auth/ChangePasswordPage.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/scanner" replace />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/dashboard/scans" element={<ScanAdminPage />} />
                    <Route path="/dashboard/users" element={<UserPage />} />
                    <Route path="/dashboard/change-password" element={<ChangePasswordPage />} />
                </Route>
                <Route path="/scanner" element={<ScannerPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/architecture" element={<ArchitecturePage />} />

                <Route
                    path="*"
                    element={
                        <div className="p-8 text-center text-2xl font-bold">
                            404 Halaman Tidak Ditemukan
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
