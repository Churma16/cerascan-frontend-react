import 'react';
import { ChevronRight, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { sidebarMenus } from './AdminSidebar';

// Tambahkan prop onOpenSidebar untuk menerima fungsi pembuka sidebar dari Layout
export default function AdminNavbar({ activeMenu, onOpenSidebar }) {
    const location = useLocation();

    let currentMenuId = 'overview';
    for (const group of sidebarMenus) {
        for (const item of group.items) {
            if (
                location.pathname === item.path ||
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
            ) {
                currentMenuId = item.id;
            }
        }
    }

    if (activeMenu !== undefined) {
        currentMenuId = activeMenu;
    }

    return (
        // Sedikit penyesuaian px-4 di mobile dan px-8 di desktop agar tidak terlalu mepet
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-gray-200 bg-white/80 backdrop-blur-md shrink-0 z-10">
            <div className="flex items-center gap-3 text-sm font-medium">
                {/* Tombol Hamburger: Hanya muncul di mobile (md:hidden) */}
                <button
                    onClick={onOpenSidebar}
                    className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg md:hidden transition-colors"
                    aria-label="Buka Menu"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 hidden sm:inline">Dashboard</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 hidden sm:block" />
                    <span className="text-[#042B1F] capitalize">{currentMenuId.replace('_', ' ')}</span>
                </div>
            </div>

            {/* Bagian Kanan Navbar (Search & Notifikasi - saat ini di-comment) */}
            {/*<div className="flex items-center gap-6">*/}
            {/* <div className="relative hidden md:block">*/}
            {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />*/}
            {/* <input*/}
            {/* type="text"*/}
            {/* placeholder="Cari ID Scan, Nama..."*/}
            {/* className="w-64 bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-9 pr-4 text-sm text-[#042B1F] focus:outline-none focus:border-[#FF645A] focus:ring-1 focus:ring-[#FF645A] transition-all"*/}
            {/* />*/}
            {/* </div>*/}

            {/* <button className="relative text-gray-400 hover:text-[#042B1F] transition-colors">*/}
            {/* <Bell className="w-5 h-5" />*/}
            {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF645A] rounded-full"></span>*/}
            {/* </button>*/}
            {/*</div>*/}
        </header>
    );
}
