import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    AlertTriangle,
    Banknote,
    CreditCard,
    History,
    LayoutDashboard,
    LayoutGrid,
    LogOut,
    Package,
    Receipt,
    ScanLine,
    ShieldCheck,
    Trophy,
    Users,
} from 'lucide-react';
import { useCurrentUser, useLogout } from '@/hooks/useAuth.js';
import UpgradeButton from '@/components/UpgradeButton.jsx';
import RequireAccess from '@/security/RequireAccess.jsx';

export const sidebarMenus = [
    {
        title: 'Operasional',
        items: [
            { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard, path: '/dashboard' },
            { id: 'batch-scan', label: 'Mulai Scan', icon: ScanLine, path: '/dashboard/batch-scan' },
        ],
    },
    {
        title: 'Laporan & Data',
        items: [
            { id: 'history', label: 'Riwayat Scan', icon: History, path: '/dashboard/scans' },
            { id: 'leaderboard', label: 'Peringkat Tim', icon: Trophy, path: '/dashboard/leaderboard' },
        ],
    },
    {
        title: 'Administrasi Sistem',
        adminOnly: true,
        items: [
            { id: 'users', label: 'Data Pengguna', icon: Users, path: '/dashboard/users' },
            { id: 'plans', label: 'Data Paket', icon: Package, path: '/dashboard/plans' },
            { id: 'subscriptions', label: 'Kelola Langganan', icon: CreditCard, path: '/dashboard/subscriptions' },
            { id: 'payment', label: 'Semua Transaksi', icon: Banknote, path: '/dashboard/payment' },
            { id: 'dlq', label: 'Antrean Gagal (DLQ)', icon: AlertTriangle, path: '/dashboard/dlq' },
        ],
    },
    {
        title: 'Akun Saya',
        items: [
            { id: 'billing', label: 'Tagihan Saya', icon: Receipt, path: '/dashboard/billing' },
            { id: 'security', label: 'Keamanan', icon: ShieldCheck, path: '/dashboard/change-password' },
        ],
    },
];

export default function AdminSidebar({ activeMenu, setActiveMenu, isOpen, setIsOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    const { data: myData = {} } = useCurrentUser();
    const [internalActiveMenu, setInternalActiveMenu] = useState('overview');

    let currentMenu = internalActiveMenu;
    for (const group of sidebarMenus) {
        for (const item of group.items) {
            if (
                location.pathname === item.path ||
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
            ) {
                currentMenu = item.id;
            }
        }
    }

    if (activeMenu !== undefined) {
        currentMenu = activeMenu;
    }

    const handleNavigation = (item) => {
        if (setActiveMenu) setActiveMenu(item.id);
        else setInternalActiveMenu(item.id);

        if (item.path) navigate(item.path);

        if (setIsOpen) setIsOpen(false);
    };

    return (
        <>
            {/* Overlay background untuk mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
                fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-white border-r border-gray-200 shrink-0
                transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
            >
                <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
                    <Link to="/" className="flex items-center gap-2 text-[#FF645A] hover:opacity-80 transition-opacity">
                        <LayoutGrid className="w-6 h-6" />
                        <span className="font-bold text-xl tracking-tight text-[#042B1F]">
                            CeraScan<span className="text-[#FF645A]">.ai</span>
                        </span>
                    </Link>
                </div>

                <div className="p-4 border-b border-gray-200 shrink-0">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                        {myData?.avatar ? (
                            <img
                                src={myData.avatar}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full object-cover shadow-inner shrink-0"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-[#042B1F] flex items-center justify-center text-white font-bold shadow-inner shrink-0">
                                {myData?.full_name ? myData.full_name.charAt(0).toUpperCase() : 'A'}
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#042B1F] truncate">{myData?.full_name || 'Admin'}</p>
                            <p className="text-xs text-gray-500 truncate normal-case">
                                {myData?.active_plan?.name || 'Role'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 py-4 overflow-y-auto">
                    {sidebarMenus.map((group, idx) => {
                        if (group.adminOnly && myData.role !== 'admin') {
                            return null;
                        }

                        return (
                            <div key={idx} className="mb-6">
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-6">
                                    {group.title}
                                </div>
                                <nav className="space-y-1 px-3">
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = currentMenu === item.id;

                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => handleNavigation(item)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                                    ${isActive ? 'bg-[#042B1F] text-white shadow-sm' : 'text-gray-500 hover:text-[#042B1F] hover:bg-gray-50 border border-transparent'}`}
                                            >
                                                <Icon
                                                    className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-gray-400'}`}
                                                />
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        );
                    })}
                </div>

                <RequireAccess allowedPlans={[1]}>
                    <div className="p-4 shrink-0">
                        <UpgradeButton />
                    </div>
                </RequireAccess>

                <div className="p-4 border-t border-gray-200 shrink-0">
                    <button
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#FF645A] hover:bg-[#FF645A]/10 transition-colors border border-transparent"
                        onClick={logout}
                    >
                        <LogOut className="w-4.5 h-4.5" />
                        Keluar Sistem
                    </button>
                </div>
            </aside>
        </>
    );
}
