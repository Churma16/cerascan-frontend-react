import AdminNavbar from '@/layouts/Admin/components/AdminNavbar.jsx';
import AdminSidebar from '@/layouts/Admin/components/AdminSidebar.jsx';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function AdminMainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen w-full bg-[#faf8f5] font-sans text-[#042B1F] selection:bg-[#FF645A]/30 overflow-hidden">
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#faf8f5] relative">
                <AdminNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
                <Outlet />
            </main>
        </div>
    );
}
