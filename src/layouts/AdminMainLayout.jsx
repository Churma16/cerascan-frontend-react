import React from 'react';
import {Bell, ChevronRight, History, Key, LayoutGrid, LogOut, Search, Settings, Shield, Users} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';


export default function AdminMainLayout({children, activeMenu, setActiveMenu}) {
    const navigate = useNavigate();
    const location = useLocation();

    // Gunakan prop jika diberikan, atau gunakan local state jika tidak
    const [internalActiveMenu, setInternalActiveMenu] = React.useState('overview');

    const sidebarMenus = [
        {
            title: "Pusat Kontrol",
            items: [
                {id: 'overview', label: 'Ringkasan', icon: LayoutGrid, path: '/dashboard'},
                {id: 'history', label: 'Semua Riwayat', icon: History, path: '/dashboard/scans'},
            ]
        },
        {
            title: "Administrasi",
            items: [
                {id: 'users', label: 'Manajemen Tim', icon: Users, path: '/dashboard/users'},
                {id: 'api_keys', label: 'Akses API', icon: Key, path: '/dashboard/api-keys'},
                {id: 'security', label: 'Keamanan', icon: Shield, path: '/dashboard/security'},
                {id: 'settings', label: 'Pengaturan Sistem', icon: Settings, path: '/dashboard/settings'},
            ]
        }
    ];

    // Menentukan aktif menu yang tepat
    let currentMenu = internalActiveMenu;
    // 1. Coba deteksi berdasarkan path URL
    for (const group of sidebarMenus) {
        for (const item of group.items) {
            if (location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))) {
                currentMenu = item.id;
            }
        }
    }
    // 2. Jika prop diberikan, gunakan prop (untuk backward compatibility)
    if (activeMenu !== undefined) {
        currentMenu = activeMenu;
    }

    const handleNavigation = (item) => {
        if (setActiveMenu) setActiveMenu(item.id);
        else setInternalActiveMenu(item.id);

        // Lakukan navigasi aktual menggunakan react-router
        if (item.path) navigate(item.path);
    };

    return (
        <div
            className="flex h-screen w-full bg-[#090A0F] font-sans text-zinc-100 selection:bg-indigo-500/30 overflow-hidden">

            {/* 1. SIDEBAR KIRI */}
            <aside className="w-64 flex flex-col border-r border-[#1E1F2E] bg-[#0E0F15] shrink-0 relative z-20">

                {/* Header Sidebar (Logo) */}
                <div className="h-16 flex items-center px-6 border-b border-[#1E1F2E]">
                    <div className="flex items-center gap-2 text-indigo-400">
                        <LayoutGrid className="w-6 h-6"/>
                        <span className="font-bold text-xl tracking-tight text-white">CeraScan<span
                            className="text-indigo-500">.ai</span></span>
                    </div>
                </div>

                {/* Profil Pengguna Singkat */}
                <div className="p-4 border-b border-[#1E1F2E]">
                    <div
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#1A1C26] cursor-pointer transition-colors border border-transparent hover:border-[#262833]">
                        <div
                            className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-inner">
                            A
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">Admin Utama</p>
                            <p className="text-xs text-zinc-500 truncate">Super Administrator</p>
                        </div>
                    </div>
                </div>

                {/* Menu Navigasi */}
                <div className="flex-1 py-4 overflow-y-auto">
                    {sidebarMenus.map((group, idx) => (
                        <div key={idx} className="mb-6">
                            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2 px-6">
                                {group.title}
                            </div>
                            <nav className="space-y-1 px-3">
                                {group.items.map(item => {
                                    const Icon = item.icon;
                                    const isActive = currentMenu === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavigation(item)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                        ${isActive
                                                ? 'bg-[#2E2459] text-white border border-[#483A8C] shadow-sm'
                                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#1A1C26] border border-transparent'}`}
                                        >
                                            <Icon
                                                className={`w-[18px] h-[18px] ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`}/>
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    ))}
                </div>

                {/* Footer Sidebar (Logout) */}
                <div className="p-4 border-t border-[#1E1F2E]">
                    <button
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border border-transparent hover:border-red-500/20">
                        <LogOut className="w-[18px] h-[18px]"/>
                        Keluar Sistem
                    </button>
                </div>
            </aside>

            {/* 2. AREA UTAMA (KANAN) */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#090A0F] relative">

                {/* Efek Latar Belakang Halus */}
                <div
                    className="absolute top-0 right-0 w-[600px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

                {/* Top Navbar */}
                <header
                    className="h-16 flex items-center justify-between px-8 border-b border-[#1E1F2E] bg-[#0E0F15]/80 backdrop-blur-md shrink-0 z-10">

                    {/* Breadcrumb / Judul */}
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span className="text-zinc-500">Dashboard</span>
                        <ChevronRight className="w-4 h-4 text-zinc-700"/>
                        <span className="text-zinc-200 capitalize">{currentMenu.replace('_', ' ')}</span>
                    </div>

                    {/* Aksi Kanan (Pencarian & Notifikasi) */}
                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"/>
                            <input
                                type="text"
                                placeholder="Cari ID Scan, Nama..."
                                className="w-64 bg-[#13141C] border border-[#262833] rounded-full py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>

                        <button className="relative text-zinc-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5"/>
                            <span
                                className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border border-[#0E0F15]"></span>
                        </button>
                    </div>
                </header>

                {/* Konten Halaman (Scrollable) */}
                {children}
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #090A0F; color: #f4f4f5; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #262833; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #3A3C4A; }
      `
            }}/>
        </div>
    );
}