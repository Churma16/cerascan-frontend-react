import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ScannerPage from '@/features/scanner/ScannerPage.jsx';
import HistoryPage from '@/features/history/HistoryPage.jsx';
import InsightsPage from '@/features/insight/InsightsPage.jsx';
import ArchitecturePage from '@/features/architecture/ArchitecturePage.jsx';
import LoginPage from '@/features/auth/LoginPage.jsx';
import ScanHistoryPage from '@/features/scanner/ScanHistoryPage.jsx';
import AdminUserPage from '@/features/user/AdminUserPage.jsx';
import DashboardPage from '@/features/dashboard/DashboardPage.jsx';
import ChangePasswordPage from '@/features/auth/ChangePasswordPage.jsx';
import MainLayout from '@/layouts/public/MainLayout.jsx';
import AdminMainLayout from '@/layouts/Admin/AdminMainLayout.jsx';
import ResetPasswordPage from '@/features/auth/ResetPasswordPage.jsx';
import RegisterPage from '@/features/auth/RegisterPage.jsx';
import VerifyEmailPage from '@/features/auth/VerifyEmailPage.jsx';
import BillingPage from '@/features/billing/BillingPage.jsx';
import BatchScanPage from '@/features/batch_scan/BatchScanPage.jsx';
import LeaderboardPage from '@/features/leaderboard/LeaderboardPage.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/scanner" replace />} />
                <Route path="/forgot-password" element={<ResetPasswordPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AdminMainLayout />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/dashboard/scans" element={<ScanHistoryPage />} />
                        <Route path="/dashboard/billing" element={<BillingPage />} />
                        <Route path="/dashboard/leaderboard" element={<LeaderboardPage />} />
                        <Route path="/dashboard/users" element={<AdminUserPage />} />
                        <Route path="/dashboard/change-password" element={<ChangePasswordPage />} />
                        <Route path="/dashboard/batch-scan" element={<BatchScanPage />} />
                    </Route>
                </Route>

                <Route element={<MainLayout />}>
                    <Route path="/scanner" element={<ScannerPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/insights" element={<InsightsPage />} />
                    <Route path="/architecture" element={<ArchitecturePage />} />
                </Route>

                <Route path="*" element={<Navigate to="/scanner" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
