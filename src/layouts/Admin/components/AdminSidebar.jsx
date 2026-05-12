import React from 'react';
import { LayoutGrid, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminSidebar({ user, menus, currentMenu, onNavigate, onLogout }) {
    return (
        <aside className="w-64 flex flex-col border-r border-gray-200 bg-white shrink-0 relative z-20">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-[#FF645A] hover:opacity-80 transition-opacity"
                >
                    <LayoutGrid className="w-6 h-6" />
                    <span className="font-bold text-xl tracking-tight text-[#042B1F]">
                        CeraScan<span className="text-[#FF645A]">.ai</span>
                    </span>
                </Link>
            </div>

            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-[#042B1F] flex items-center justify-center text-white font-bold shadow-inner">
                        {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#042B1F] truncate">
                            {user.full_name || 'Admin'}
                        </p>
                        <p className="text-xs text-gray-500 truncate normal-case">
                            {user.role || 'Role'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 py-4 overflow-y-auto">
                {menus.map((group, idx) => (
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
                                        onClick={() => onNavigate(item)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                                        ${
                                            isActive
                                                ? 'bg-[#042B1F] text-white shadow-sm'
                                                : 'text-gray-500 hover:text-[#042B1F] hover:bg-gray-50 border border-transparent'
                                        }`}
                                    >
                                        <Icon
                                            className={`w-[18px] h-[18px] ${isActive ? 'text-white' : 'text-gray-400'}`}
                                        />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200">
                <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#FF645A] hover:bg-[#FF645A]/10 transition-colors border border-transparent"
                    onClick={onLogout}
                >
                    <LogOut className="w-[18px] h-[18px]" />
                    Keluar Sistem
                </button>
            </div>
        </aside>
    );
}
