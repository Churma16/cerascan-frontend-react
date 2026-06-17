import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/guard/ProtectedRoute.jsx';
import ScannerPage from '@/features/scanner/ScannerPage.jsx';
import HistoryPage from '@/features/history/HistoryPage.jsx';
import InsightsPage from '@/features/insight/InsightsPage.jsx';
import ArchitecturePage from '@/features/architecture/ArchitecturePage.jsx';
import LoginPage from '@/features/auth/LoginPage.jsx';
import ScanHistoryPage from '@/features/scanner/ScanHistoryPage.jsx';
import AdminUserPage from '@/features/user/AdminUserPage.jsx';
import DashboardPage from '@/features/dashboard/DashboardPage.jsx';
import DLQDashboardPage from '@/features/dashboard/DLQDashboardPage.jsx';
import ChangePasswordPage from '@/features/auth/ChangePasswordPage.jsx';
import MainLayout from '@/layouts/public/MainLayout.jsx';
import AdminMainLayout from '@/layouts/Admin/AdminMainLayout.jsx';
import ResetPasswordPage from '@/features/auth/ResetPasswordPage.jsx';
import RegisterPage from '@/features/auth/RegisterPage.jsx';
import VerifyEmailPage from '@/features/auth/VerifyEmailPage.jsx';
import BillingPage from '@/features/billing/BillingPage.jsx';
import BatchScanPage from '@/features/batch_scan/BatchScanPage.jsx';
import LeaderboardPage from '@/features/leaderboard/LeaderboardPage.jsx';
import PaymentPage from '@/features/payment/PaymentPage.jsx';
import PlanPage from '@/features/plan/PlanPage.jsx';
import SubscriptionPage from '@/features/subscription/SubscriptionPage.jsx';
import AdminOnlyRoute from '@/components/guard/AdminOnlyRoute.jsx';
import AuthCallback from '@/features/auth/AuthCallback.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
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
                        <Route path="/dashboard/batch-scan" element={<BatchScanPage />} />
                        <Route path="/dashboard/leaderboard" element={<LeaderboardPage />} />
                        <Route path="/dashboard/change-password" element={<ChangePasswordPage />} />
                        <Route element={<AdminOnlyRoute />}>
                            <Route path="/dashboard/plans" element={<PlanPage />} />
                            <Route path="/dashboard/users" element={<AdminUserPage />} />
                            <Route path="/dashboard/payment" element={<PaymentPage />} />
                            <Route path="/dashboard/subscriptions" element={<SubscriptionPage />} />
                            <Route path="/dashboard/dlq" element={<DLQDashboardPage />} />
                        </Route>
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
