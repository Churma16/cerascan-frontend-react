import React from 'react';
import AdminNavbar from '@/layouts/Admin/components/AdminNavbar.jsx';
import AdminSidebar from '@/layouts/Admin/components/AdminSidebar.jsx';

export default function AdminMainLayout({ children, activeMenu, setActiveMenu }) {
    return (
        <div className="flex h-screen w-full bg-[#faf8f5] font-sans text-[#042B1F] selection:bg-[#FF645A]/30 overflow-hidden">
            <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#faf8f5] relative">
                <AdminNavbar activeMenu={activeMenu} />

                {children}
            </main>
        </div>
    );
}
