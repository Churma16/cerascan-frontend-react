import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { History, LayoutGrid, Users } from 'lucide-react';
import { useCurrentUser, useLogout } from '@/hooks/useAuth.js';
import AdminNavbar from '@/layouts/Admin/components/AdminNavbar.jsx';
import AdminSidebar from '@/layouts/Admin/components/AdminSidebar.jsx';

export default function AdminMainLayout({ children, activeMenu, setActiveMenu }) {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    const [internalActiveMenu, setInternalActiveMenu] = useState('overview');

    const { data: myData = {} } = useCurrentUser();

    const sidebarMenus = [
        {
            title: 'Pusat Kontrol',
            items: [
                { id: 'overview', label: 'Ringkasan', icon: LayoutGrid, path: '/dashboard' },
                { id: 'history', label: 'Semua Riwayat', icon: History, path: '/dashboard/scans' },
            ],
        },
        {
            title: 'Administrasi',
            items: [{ id: 'users', label: 'Manajemen Tim', icon: Users, path: '/dashboard/users' }],
        },
        {
            title: 'Account',
            items: [
                {
                    id: 'change password',
                    label: 'Ganti Password',
                    icon: Users,
                    path: '/dashboard/change-password',
                },
            ],
        },
    ];

    // Penentuan current menu berdasarkan URL
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

    // Override jika activeMenu diset dari parent
    if (activeMenu !== undefined) {
        currentMenu = activeMenu;
    }

    const handleNavigation = (item) => {
        if (setActiveMenu) setActiveMenu(item.id);
        else setInternalActiveMenu(item.id);

        if (item.path) navigate(item.path);
    };

    return (
        <div className="flex h-screen w-full bg-[#faf8f5] font-sans text-[#042B1F] selection:bg-[#FF645A]/30 overflow-hidden">
            <AdminSidebar
                user={myData}
                menus={sidebarMenus}
                currentMenu={currentMenu}
                onNavigate={handleNavigation}
                onLogout={logout}
            />

            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#faf8f5] relative">
                <AdminNavbar currentMenu={currentMenu} />

                {children}
            </main>
        </div>
    );
}
