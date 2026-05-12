import React from 'react';
import { Bell, ChevronRight, Search } from 'lucide-react';

export default function AdminNavbar({ currentMenu }) {
    return (
        <header className="h-16 flex items-center justify-between px-8 border-b border-gray-200 bg-white/80 backdrop-blur-md shrink-0 z-10">
            <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-gray-500">Dashboard</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-[#042B1F] capitalize">
                    {currentMenu ? currentMenu.replace('_', ' ') : ''}
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari ID Scan, Nama..."
                        className="w-64 bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-9 pr-4 text-sm text-[#042B1F] focus:outline-none focus:border-[#FF645A] focus:ring-1 focus:ring-[#FF645A] transition-all"
                    />
                </div>

                <button className="relative text-gray-400 hover:text-[#042B1F] transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF645A] rounded-full"></span>
                </button>
            </div>
        </header>
    );
}
