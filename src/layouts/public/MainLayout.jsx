import React from 'react';
import { Outlet } from 'react-router-dom';
import MainFooter from '@/layouts/public/components/MainFooter.jsx';
import MainNavbar from '@/layouts/public/components/MainNavbar.jsx';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#faf8f5] font-sans text-gray-800 selection:bg-[#FF645A]/30 flex flex-col relative overflow-hidden">
            <MainNavbar />

            <main className="flex-1 pt-28 pb-24 relative z-10 min-h-screen">
                {children || <Outlet />}
            </main>

            <MainFooter />
        </div>
    );
}
